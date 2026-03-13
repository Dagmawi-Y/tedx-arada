import { Stack, router } from 'expo-router';
import { View, Text, Pressable } from 'react-native';
import { Button } from '@/components/ui/base/button';
import { Glow } from '@/components/ui/base/glow';
import { Title } from '@/components/ui/base/title';
import { Subtitle } from '@/components/ui/base/subtitle/Subtitle';
import { TED_COLORS } from '@/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useCheckInStore } from '@/store/check-in-store';

export default function Home() {
  const attendees = useCheckInStore((state) => state.attendees);
  const checkedInCount = attendees.filter((a) => a.status === 'checked_in').length;
  const totalCount = attendees.length;

  return (
    <View className="flex-1 bg-ted-black">
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 justify-center items-center p-5">
        <View className="items-center mb-10">
          {/* Logo Section */}
          <View className="w-24 h-24 rounded-full bg-ted-dark justify-center items-center mb-5 border border-white/10">
            <MaterialCommunityIcons name="microphone-variant" size={48} color={TED_COLORS.red} />
          </View>
          <Title size={32} weight="bold" color={TED_COLORS.white}>
            TEDxArada
          </Title>
          <Subtitle size={16} style={{ color: TED_COLORS.accent }}>
            Check-in System
          </Subtitle>
        </View>

        {/* Stats view */}
        <View className="mb-12 bg-ted-dark px-8 py-5 rounded-3xl border border-white/10 shadow-lg items-center">
          <View className="flex-row justify-between w-64">
            <View className="items-center">
              <Text className="text-white text-3xl font-bold">{totalCount}</Text>
              <Text className="text-gray-400 text-sm font-semibold mt-1">Total</Text>
            </View>
            <View className="w-px h-full bg-white/20 mx-4" />
            <View className="items-center">
              <Text className="text-ted-red text-3xl font-bold">{checkedInCount}</Text>
              <Text className="text-gray-400 text-sm font-semibold mt-1">Checked In</Text>
            </View>
          </View>
          {/* Progress Bar */}
          <View className="w-full h-2 bg-black/50 rounded-full mt-6 overflow-hidden">
            <View 
              style={{ width: `${totalCount > 0 ? (checkedInCount / totalCount) * 100 : 0}%` }} 
              className="h-full bg-ted-red" 
            />
          </View>
        </View>

        <View className="mt-5">
          <Glow size={4} color={TED_COLORS.red} secondaryColor={TED_COLORS.accent} radius={30}>
            <Button
              onPress={() => router.push('/scan')}
              backgroundColor={TED_COLORS.red}
              width={280}
              height={60}
              borderRadius={30}
            >
              <View className="flex-row items-center justify-center">
                <MaterialCommunityIcons name="qrcode-scan" size={24} color={TED_COLORS.white} className="mr-2" />
                <Text className="text-white text-lg font-bold">Start Scanning</Text>
              </View>
            </Button>
          </Glow>
        </View>
      </View>
    </View>
  );
}
