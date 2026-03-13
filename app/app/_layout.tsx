import '../global.css';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { ToastProviderWithViewport } from '@/components/ui/molecules/Toast';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'SafeAreaView has been deprecated',
  'Unable to activate keep awake',
]);


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
