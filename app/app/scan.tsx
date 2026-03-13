import { Stack, router } from 'expo-router';
import { CameraView, useCameraPermissions } from 'expo-camera';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Pressable, Dimensions, StatusBar } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TED_COLORS } from '@/constants/Colors';
import { useCheckInStore } from '@/store/check-in-store';
import { Toast } from '@/components/ui/molecules/Toast';
import { CircleLoadingIndicator } from '@/components/ui/molecules/circle-loader';
import { Title } from '@/components/ui/base/title';
import { Subtitle } from '@/components/ui/base/subtitle/Subtitle';
import Animated, { FadeIn, FadeOut, ZoomIn } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { useAudioPlayer } from 'expo-audio';

const { width } = Dimensions.get('window');
const SCAN_AREA_SIZE = width * 0.7;

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [processing, setProcessing] = useState(false);
  const checkIn = useCheckInStore((state) => state.checkIn);
  
  const lastScannedCode = useRef<string | null>(null);

  // Sound players for zero-latency playback (SDK 54 expo-audio)
  const successPlayer = useAudioPlayer(require('@/assets/sounds/success.wav'));
  const warningPlayer = useAudioPlayer(require('@/assets/sounds/warning.wav'));
  const errorPlayer = useAudioPlayer(require('@/assets/sounds/error.wav'));

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  const playFeedback = async (type: 'success' | 'warning' | 'error') => {
    try {
      if (type === 'success') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        successPlayer.seekTo(0);
        successPlayer.play();
      } else if (type === 'warning') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium), 100);
        warningPlayer.seekTo(0);
        warningPlayer.play();
      } else {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        errorPlayer.seekTo(0);
        errorPlayer.play();
      }
    } catch (e) {
      console.log('Error playing feedback:', e);
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
      <View className="flex-1 bg-white justify-center items-center p-8">
        <StatusBar barStyle="dark-content" />
        <View className="w-24 h-24 bg-red-50 rounded-full justify-center items-center mb-8">
          <MaterialCommunityIcons name="camera-off" size={48} color={TED_COLORS.red} />
        </View>
        <Title size={28} color={TED_COLORS.black} weight="bold" style={{ textAlign: 'center' }}>
          Camera Access
        </Title>
        <Subtitle size={16} style={{ textAlign: 'center', marginTop: 12, paddingHorizontal: 20, color: '#666', lineHeight: 24 }}>
          To verify attendee credentials, we require access to your devices camera system.
        </Subtitle>
        <TouchableOpacity 
          className="mt-12 bg-ted-red px-10 py-5 rounded-full shadow-lg shadow-ted-red/30"
          onPress={requestPermission}
        >
          <Text className="text-white font-bold text-lg uppercase tracking-widest">Enable Camera</Text>
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
    <View className="flex-1 bg-black">
      <StatusBar barStyle="light-content" />
      <Stack.Screen options={{ headerShown: false }} />
      
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
      />

      {/* UI Overlay positioned absolutely on top of the CameraView */}
      <View 
        style={StyleSheet.absoluteFillObject} 
        className="justify-between" 
        pointerEvents="box-none"
      >
        <View className="flex-1 bg-black/40 justify-between" pointerEvents="box-none">
          {/* Top Bar - Still white for high contrast breadcrumb */}
          <View className="flex-row items-center justify-between pt-16 px-5 pb-5 bg-white/95 rounded-b-[32px] shadow-xl">
            <Pressable 
              onPress={() => router.back()} 
              className="w-11 h-11 rounded-full bg-ted-gray justify-center items-center"
            >
              <MaterialCommunityIcons name="close" size={24} color={TED_COLORS.black} />
            </Pressable>
            <Title size={20} color={TED_COLORS.black} weight="bold">Validate Ticket</Title>
            <View className="w-11" />
          </View>

          {/* Scanner Frame */}
          <View className="flex-1 justify-center items-center" pointerEvents="none">
            <View style={{ width: SCAN_AREA_SIZE, height: SCAN_AREA_SIZE }} className="relative bg-transparent">
              {/* Corners - More rounded and premium */}
              <View className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-ted-red rounded-tl-[32px]" />
              <View className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-ted-red rounded-tr-[32px]" />
              <View className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-ted-red rounded-bl-[32px]" />
              <View className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-ted-red rounded-br-[32px]" />
              
              {/* Scan Line Animation */}
              {!scanned && !processing && (
                <View 
                  className="absolute w-full h-[1px] bg-ted-red/50 top-1/2"
                />
              )}

              {processing && (
                <View className="absolute inset-0 bg-white/10 justify-center items-center rounded-[32px]">
                  <CircleLoadingIndicator dotColor={TED_COLORS.red} />
                </View>
              )}
              
              {scanned && (
                <Animated.View entering={ZoomIn} className="absolute inset-0 bg-white/20 justify-center items-center rounded-[32px]">
                   <MaterialCommunityIcons 
                    name={lastScannedCode.current ? 'check-circle' : 'alert-circle'} 
                    size={80} 
                    color="white" 
                  />
                </Animated.View>
              )}
            </View>
          </View>

          {/* Bottom Instructions - Now in white */}
          <View className="p-8 pb-12 bg-white rounded-t-[40px] shadow-2xl">
            <View className="flex-row items-center justify-center mb-2">
                <MaterialCommunityIcons name="information-outline" size={16} color="#999" />
                <Text className="text-gray-400 font-bold text-[10px] uppercase tracking-widest ml-2">Scanner Active</Text>
            </View>
            <Subtitle size={16} style={{ textAlign: 'center', color: TED_COLORS.black, fontWeight: '600' }}>
              Hold the QR code inside the capture area to instantly register arrival.
            </Subtitle>
          </View>
        </View>
      </View>
    </View>
  );
}
