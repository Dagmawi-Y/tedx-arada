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
import Animated, { FadeIn, FadeOut, ZoomIn, useAnimatedStyle, withRepeat, withTiming, withSequence } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');
const SCAN_AREA_SIZE = width * 0.7;

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [processing, setProcessing] = useState(false);
  const checkIn = useCheckInStore((state) => state.checkIn);
  
  const lastScannedCode = useRef<string | null>(null);

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  if (!permission) {
    return (
      <View style={styles.centered}>
        <CircleLoadingIndicator dotColor={TED_COLORS.red} />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.centered}>
        <MaterialCommunityIcons name="camera-off" size={64} color={TED_COLORS.red} />
        <Title size={24} color={TED_COLORS.white} weight="bold" style={{ marginTop: 20 }}>
          Camera Access Required
        </Title>
        <Subtitle size={16} style={{ textAlign: 'center', marginTop: 10, paddingHorizontal: 40 }}>
          We need your permission to show the camera for scanning attendee QR codes.
        </Subtitle>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    if (processing || scanned) return;
    
    // Simple debounce to avoid double scans
    if (data === lastScannedCode.current) return;
    lastScannedCode.current = data;

    setProcessing(true);
    
    // Simulate a slight delay for better UX (so it doesn't just flash)
    setTimeout(() => {
      const result = checkIn(data);
      setProcessing(false);
      setScanned(true);

      if (result.success) {
        Toast.show(`Checked in: ${result.attendee?.name}`, {
          type: 'success',
          position: 'top',
        });
      } else {
        Toast.show(result.message, {
          type: 'error',
          position: 'top',
        });
      }

      // Reset after 3 seconds to allow next scan
      setTimeout(() => {
        setScanned(false);
        lastScannedCode.current = null;
      }, 3000);
    }, 500);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
      >
        <View style={styles.overlay}>
          {/* Top Bar */}
          <View style={styles.topBar}>
            <Pressable onPress={() => router.back()} style={styles.backButton}>
              <MaterialCommunityIcons name="chevron-left" size={32} color={TED_COLORS.white} />
            </Pressable>
            <Title size={20} color={TED_COLORS.white} weight="bold">
              Scan Ticket
            </Title>
            <View style={{ width: 32 }} />
          </View>

          {/* Scanner Frame */}
          <View style={styles.scannerWrapper}>
            <View style={styles.scannerFrame}>
              <View style={[styles.corner, styles.topLeft]} />
              <View style={[styles.corner, styles.topRight]} />
              <View style={[styles.corner, styles.bottomLeft]} />
              <View style={[styles.corner, styles.bottomRight]} />
              
              {/* Scan Line Animation */}
              {!scanned && !processing && (
                <Animated.View 
                  entering={FadeIn}
                  exiting={FadeOut}
                  style={styles.scanLine}
                />
              )}

              {processing && (
                <View style={styles.processingOverlay}>
                  <CircleLoadingIndicator dotColor={TED_COLORS.red} />
                </View>
              )}
              
              {scanned && (
                <Animated.View entering={ZoomIn} style={styles.statusOverlay}>
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
          <View style={styles.footer}>
            <Subtitle size={16} style={{ textAlign: 'center', color: TED_COLORS.white }}>
              Position the QR code within the frame to automatically check in the attendee.
            </Subtitle>
          </View>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: TED_COLORS.black,
  },
  centered: {
    flex: 1,
    backgroundColor: TED_COLORS.black,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannerWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannerFrame: {
    width: SCAN_AREA_SIZE,
    height: SCAN_AREA_SIZE,
    borderWidth: 0,
    position: 'relative',
    backgroundColor: 'transparent',
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: TED_COLORS.red,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 12,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 12,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 12,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 12,
  },
  scanLine: {
    position: 'absolute',
    width: '100%',
    height: 2,
    backgroundColor: TED_COLORS.red,
    top: '50%',
    shadowColor: TED_COLORS.red,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  processingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  statusOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  footer: {
    padding: 40,
    paddingBottom: 60,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  permissionButton: {
    marginTop: 30,
    backgroundColor: TED_COLORS.red,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 30,
  },
  permissionButtonText: {
    color: TED_COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
