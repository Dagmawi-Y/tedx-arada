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
import Animated, { ZoomIn } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { useAudioPlayer } from 'expo-audio';

const { width } = Dimensions.get('window');
const SCAN_AREA_SIZE = width * 0.7;

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [scanStatus, setScanStatus] = useState<'idle' | 'success' | 'warning' | 'error'>('idle');
  const [attendeeName, setAttendeeName] = useState<string | null>(null);

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
      setAttendeeName(result.attendee?.name || null);

      if (result.success) {
        setScanStatus('success');
        playFeedback('success');
        Toast.show(`Checked in: ${result.attendee?.name}`, {
          type: 'success',
          position: 'top',
        });
      } else {
        if (result.message.includes('already checked in')) {
          setScanStatus('warning');
          playFeedback('warning');
          Toast.show(`Already in: ${result.attendee?.name}`, {
            type: 'warning',
            position: 'top',
          });
        } else {
          setScanStatus('error');
          playFeedback('error');
          Toast.show(result.message, {
            type: 'error',
            position: 'top',
          });
        }
      }

      setTimeout(() => {
        setScanned(false);
        setScanStatus('idle');
        setAttendeeName(null);
        lastScannedCode.current = null;
      }, 3000);
    }, 500);
  };

  const getStatusOverlay = () => {
    switch (scanStatus) {
      case 'success':
        return {
          icon: 'check-circle',
          color: '#10B981',
          bg: 'rgba(16, 185, 129, 0.2)',
          label: 'Authorized'
        };
      case 'warning':
        return {
          icon: 'alert-circle',
          color: '#F59E0B',
          bg: 'rgba(245, 158, 11, 0.2)',
          label: 'Already In'
        };
      case 'error':
        return {
          icon: 'close-circle',
          color: '#EF4444',
          bg: 'rgba(239, 68, 68, 0.2)',
          label: 'Declined'
        };
      default:
        return null;
    }
  };

  const overlay = getStatusOverlay();

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

      {/* UI Overlay */}
      <View
        style={StyleSheet.absoluteFillObject}
        className="justify-between"
        pointerEvents="box-none"
      >
        <View className="flex-1 bg-black/60 justify-between py-12" pointerEvents="box-none">
          {/* Top Bar */}
          <View className="px-6 flex-row items-center justify-between" pointerEvents="box-none">
            <Pressable
              onPress={() => router.back()}
              className="w-12 h-12 rounded-2xl bg-white/10 blur-xl justify-center items-center border border-white/20"
            >
              <MaterialCommunityIcons name="chevron-left" size={28} color="white" />
            </Pressable>
            <View className="bg-white/10 px-6 py-2 rounded-full border border-white/20">
              <Text className="text-white font-bold text-sm uppercase tracking-[2px]">Validator</Text>
            </View>
            <View className="w-12" />
          </View>

          {/* Scanner Frame */}
          <View className="items-center" pointerEvents="none">
            <View style={{ width: SCAN_AREA_SIZE, height: SCAN_AREA_SIZE }} className="relative">
              {/* Corners */}
              <View className="absolute top-0 left-0 w-14 h-14 border-t-[3px] border-l-[3px] border-ted-red rounded-tl-3xl" />
              <View className="absolute top-0 right-0 w-14 h-14 border-t-[3px] border-r-[3px] border-ted-red rounded-tr-3xl" />
              <View className="absolute bottom-0 left-0 w-14 h-14 border-b-[3px] border-l-[3px] border-ted-red rounded-bl-3xl" />
              <View className="absolute bottom-0 right-0 w-14 h-14 border-b-[3px] border-r-[3px] border-ted-red rounded-br-3xl" />

              {/* Status Overlay */}
              {scanned && overlay && (
                <Animated.View
                  entering={ZoomIn.duration(400)}
                  className="absolute inset-4 rounded-2xl items-center justify-center"
                  style={{ backgroundColor: overlay.bg }}
                >
                  <MaterialCommunityIcons
                    name={overlay.icon as any}
                    size={80}
                    color={overlay.color}
                  />
                  <Text className="text-white font-bold mt-4 tracking-widest uppercase text-xs" style={{ color: overlay.color }}>
                    {overlay.label}
                  </Text>
                  {attendeeName && (
                    <Text className="text-white font-medium mt-1 text-center px-4" numberOfLines={1}>
                      {attendeeName}
                    </Text>
                  )}
                </Animated.View>
              )}

              {processing && (
                <View className="absolute inset-0 items-center justify-center">
                  <CircleLoadingIndicator dotColor={TED_COLORS.red} />
                </View>
              )}

              {/* Scanning Glow Line */}
              {!scanned && !processing && (
                <View className="absolute w-full h-1 bg-ted-red/30 top-1/2 blur-sm" />
              )}
            </View>

            <View className="mt-12 bg-black/40 px-8 py-4 rounded-3xl border border-white/10">
              <Text className="text-white/60 text-center font-medium">Position QR code within frame</Text>
            </View>
          </View>

          {/* Bottom Info */}
          <View className="px-10 items-center">
            <View className="flex-row items-center space-x-2">
              <View className="w-2 h-2 rounded-full bg-green-500" />
              <Text className="text-white/40 text-[10px] font-bold uppercase tracking-[3px] ml-2">System Online</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
