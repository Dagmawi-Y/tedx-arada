import '../global.css';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { ToastProviderWithViewport } from '@/components/ui/molecules/Toast';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ToastProviderWithViewport>
          <Stack />
        </ToastProviderWithViewport>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
