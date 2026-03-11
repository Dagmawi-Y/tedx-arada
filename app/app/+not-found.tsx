import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';
import { TED_COLORS } from '@/constants/Colors';

export default function NotFoundScreen() {
  return (
    <View className="flex-1 bg-ted-black justify-center items-center p-5">
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View className="items-center">
        <Text className="text-xl font-bold text-white">{"This screen doesn't exist."}</Text>
        <Link href="/" className="mt-4 pt-4">
          <Text className="text-sm border-b border-ted-red text-ted-red">Go to home screen!</Text>
        </Link>
      </View>
    </View>
  );
}
