import { Stack, router } from 'expo-router';
import { View, Text, Pressable, StatusBar, Image } from 'react-native';
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
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      <Stack.Screen options={{ headerShown: false }} />

      <View className="flex-1 px-6 justify-center">
        {/* Top Branding Section */}
        <View className="items-center mb-12">
          <Image
            source={require('@/assets/images/logo-black.png')}
            style={{ width: 180, height: 60 }}
            resizeMode="contain"
            className="mb-6"
          />
          <Subtitle size={14} style={{ color: TED_COLORS.textMuted, marginTop: -10, letterSpacing: 2, fontWeight: '700' }}>
            ORGANIZER PORTAL
          </Subtitle>
        </View>

        {/* Stats Card */}
        <View className="bg-white border border-gray-100 rounded-[40px] p-8 shadow-2xl shadow-black/5 mb-12">
          <View className="flex-row justify-between items-center mb-8">
            <View>
              <Text className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Check-in Status</Text>
              <Text className="text-ted-black text-2xl font-black">
                {checkedInCount} <Text className="text-gray-300 font-medium">/ {totalCount}</Text>
              </Text>
            </View>
            <View className="bg-ted-gray w-12 h-12 rounded-2xl justify-center items-center">
              <MaterialCommunityIcons name="chart-donut" size={24} color={TED_COLORS.red} />
            </View>
          </View>

          {/* Progress Bar Container */}
          <View className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
            <View
              style={{ width: `${totalCount > 0 ? (checkedInCount / totalCount) * 100 : 0}%` }}
              className="h-full bg-ted-red shadow-sm"
            />
          </View>
          <View className="flex-row justify-between mt-3">
            <Text className="text-ted-red font-bold text-xs">{Math.round((checkedInCount / totalCount) * 100)}% Complete</Text>
            <Text className="text-gray-400 text-xs font-medium">{totalCount - checkedInCount} remaining</Text>
          </View>
        </View>

        {/* Primary Actions */}
        <View className="space-y-6 items-center">
          <Glow size={6} color={TED_COLORS.red} secondaryColor={TED_COLORS.accent} radius={35}>
            <Button
              onPress={() => router.push('/scan')}
              backgroundColor={TED_COLORS.red}
              width={300}
              height={70}
              borderRadius={35}
            >
              <View className="flex-row items-center justify-center">
                <MaterialCommunityIcons name="qrcode-scan" size={26} color="white" />
                <Text className="text-white text-xl font-bold ml-3 italic">Launch Scanner</Text>
              </View>
            </Button>
          </Glow>

          <Pressable
            onPress={() => router.push('/attendees')}
            className="flex-row items-center mt-12 bg-gray-50 px-6 py-3 rounded-2xl border border-gray-100 active:bg-gray-100"
          >
            <MaterialCommunityIcons name="account-group-outline" size={22} color={TED_COLORS.black} />
            <Text className="ml-3 font-bold text-base text-ted-black">
              Attendees
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
