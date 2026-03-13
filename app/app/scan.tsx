import { Stack, router } from 'expo-router';
import { CameraView, useCameraPermissions } from 'expo-camera';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Pressable, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TED_COLORS } from '@/constants/Colors';
import { useCheckInStore } from '@/store/check-in-store';
import { Toast } from '@/components/ui/molecules/Toast';
import { CircleLoadingIndicator } from '@/components/ui/molecules/circle-loader';
import { Title } from '@/components/ui/base/title';
import { Subtitle } from '@/components/ui/base/subtitle/Subtitle';
import Animated, { FadeIn, FadeOut, ZoomIn } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Audio } from 'expo-av';

const { width } = Dimensions.get('window');
const SCAN_AREA_SIZE = width * 0.7;

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [processing, setProcessing] = useState(false);
  const checkIn = useCheckInStore((state) => state.checkIn);
  
  const lastScannedCode = useRef<string | null>(null);

  // Sound refs for zero-latency playback
  const successSound = useRef<Audio.Sound | null>(null);
  const warningSound = useRef<Audio.Sound | null>(null);
  const errorSound = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    // Pre-load sounds on mount
    const loadSounds = async () => {
      try {
        const { sound: sSuccess } = await Audio.Sound.createAsync(require('@/assets/sounds/success.wav'));
        const { sound: sWarning } = await Audio.Sound.createAsync(require('@/assets/sounds/warning.wav'));
        const { sound: sError } = await Audio.Sound.createAsync(require('@/assets/sounds/error.wav'));
        
        successSound.current = sSuccess;
        warningSound.current = sWarning;
        errorSound.current = sError;
      } catch (e) {
        console.log('Error pre-loading sounds:', e);
      }
    };

    loadSounds();

    return () => {
      successSound.current?.unloadAsync();
      warningSound.current?.unloadAsync();
      errorSound.current?.unloadAsync();
    };
  }, []);

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  const playFeedback = async (type: 'success' | 'warning' | 'error') => {
    try {
      if (type === 'success') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        await successSound.current?.replayAsync();
      } else if (type === 'warning') {
        // Satisfaction: Double medium impact for "already checked in"
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium), 100);
        await warningSound.current?.replayAsync();
      } else {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        await errorSound.current?.replayAsync();
      }
    } catch (e) {
      console.log('Error playing sound:', e);
    }
  };

  if (!permission) {
    return (
      <View className="flex-1 bg-ted-black justify-center items-center p-5">
        <CircleLoadingIndicator dotColor={TED_COLORS.red} />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 bg-ted-black justify-center items-center p-5">
        <MaterialCommunityIcons name="camera-off" size={64} color={TED_COLORS.red} />
        <Title size={24} color={TED_COLORS.white} weight="bold" style={{ marginTop: 20 }}>
          Camera Access Required
        </Title>
        <Subtitle size={16} style={{ textAlign: 'center', marginTop: 10, paddingHorizontal: 40, color: '#fff' }}>
          We need your permission to show the camera for scanning attendee QR codes.
        </Subtitle>
        <TouchableOpacity 
          className="mt-8 bg-ted-red px-8 py-4 rounded-full"
          onPress={requestPermission}
        >
          <Text className="text-white font-bold text-lg">Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    if (processing || scanned) return;
    
    if (data === lastScannedCode.current) return;
    lastScannedCode.current = data;

    setProcessing(true);
    
    // Quick haptic feedback for initial scan pickup
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    setTimeout(async () => {
      let attendeeId = data;
      try {
        const parsedData = JSON.parse(data);
        if (parsedData.id) {
          attendeeId = parsedData.id.toString();
        }
      } catch (e) {
        // It's not JSON, so treat the entire data string as the ID
      }
      
      const result = checkIn(attendeeId);
      setProcessing(false);
      setScanned(true);

      if (result.success) {
        playFeedback('success');
        Toast.show(`Checked in: ${result.attendee?.name}`, {
          type: 'success',
          position: 'top',
        });
      } else {
        // Evaluate failure reasons for different haptic/sound
        if (result.message.includes('already checked in')) {
           playFeedback('warning');
           Toast.show(`Already in: ${result.attendee?.name}`, {
             type: 'warning',
             position: 'top',
           });
        } else {
           playFeedback('error');
           Toast.show(result.message, {
             type: 'error',
             position: 'top',
           });
        }
      }

      setTimeout(() => {
        setScanned(false);
        lastScannedCode.current = null;
      }, 3000);
    }, 500);
  };

  return (
    <View className="flex-1 bg-ted-black">
      <Stack.Screen options={{ headerShown: false }} />
      
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
      >
        <View className="flex-1 bg-black/50 justify-between">
          {/* Top Bar */}
          <View className="flex-row items-center justify-between pt-16 px-5 pb-5">
            <Pressable 
              onPress={() => router.back()} 
              className="w-11 h-11 rounded-full bg-white/10 justify-center items-center"
            >
              <MaterialCommunityIcons name="chevron-left" size={32} color={TED_COLORS.white} />
            </Pressable>
            <Title size={20} color={TED_COLORS.white} weight="bold">
              Scan Ticket
            </Title>
            <View className="w-8" />
          </View>

          {/* Scanner Frame */}
          <View className="flex-1 justify-center items-center">
            <View style={{ width: SCAN_AREA_SIZE, height: SCAN_AREA_SIZE }} className="relative bg-transparent">
              {/* Corners */}
              <View className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-ted-red rounded-tl-xl" />
              <View className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-ted-red rounded-tr-xl" />
              <View className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-ted-red rounded-bl-xl" />
              <View className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-ted-red rounded-br-xl" />
              
              {/* Scan Line Animation */}
              {!scanned && !processing && (
                <Animated.View 
                  entering={FadeIn}
                  exiting={FadeOut}
                  className="absolute w-full h-0.5 bg-ted-red top-1/2"
                  style={{
                    shadowColor: TED_COLORS.red,
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.8,
                    shadowRadius: 10,
                    elevation: 10,
                  }}
                />
              )}

              {processing && (
                <View className="absolute inset-0 bg-black/40 justify-center items-center rounded-xl">
                  <CircleLoadingIndicator dotColor={TED_COLORS.red} />
                </View>
              )}
              
              {scanned && (
                <Animated.View entering={ZoomIn} className="absolute inset-0 bg-black/60 justify-center items-center rounded-xl">
                   <MaterialCommunityIcons 
                    name={lastScannedCode.current ? 'check-circle' : 'alert-circle'} 
                    size={80} 
                    color={TED_COLORS.white} 
                  />
                </Animated.View>
              )}
            </View>
          </View>

          {/* Bottom Instructions */}
          <View className="p-10 pb-16 bg-black/70">
            <Subtitle size={16} style={{ textAlign: 'center', color: TED_COLORS.white }}>
              Position the QR code within the frame to automatically check in the attendee.
            </Subtitle>
          </View>
        </View>
      </CameraView>
    </View>
  );
}
