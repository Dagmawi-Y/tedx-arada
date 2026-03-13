import { Stack, router } from 'expo-router';
import { View, Text, Pressable, StatusBar, Image, Dimensions } from 'react-native';
import { Button } from '@/components/ui/base/button';
import { Glow } from '@/components/ui/base/glow';
import { TED_COLORS } from '@/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useCheckInStore } from '@/store/check-in-store';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function Home() {
  const attendees = useCheckInStore((state) => state.attendees);
  const checkedInCount = attendees.filter((a) => a.status === 'checked_in').length;
  const totalCount = attendees.length;
  const progress = totalCount > 0 ? (checkedInCount / totalCount) : 0;

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      <Stack.Screen options={{ headerShown: false }} />

      {/* Background Decorative Gradient */}
      <View className="absolute top-0 w-full h-80">
        <LinearGradient
          colors={['rgba(230, 43, 30, 0.05)', 'transparent']}
          className="flex-1"
        />
      </View>

      <View className="flex-1 px-8 justify-center">
        {/* Top Branding Section */}
        <Animated.View 
          entering={FadeInUp.duration(600).delay(200)}
          className="items-center mb-16"
        >
          <Image
            source={require('@/assets/images/logo-black.png')}
            style={{ width: 220, height: 60 }}
            resizeMode="contain"
            className="mb-4"
          />
          <View className="bg-ted-black/5 px-4 py-1.5 rounded-full">
            <Text className="text-ted-black/60 font-black text-[10px] tracking-[3px] uppercase">
              Organizer Portal
            </Text>
          </View>
        </Animated.View>

        {/* Stats Card */}
        <Animated.View 
          entering={FadeInDown.duration(800).delay(400)}
          className="bg-white border border-gray-100 rounded-[48px] p-10 shadow-2xl shadow-black/5 mb-16"
        >
          <View className="flex-row justify-between items-start mb-10">
            <View>
              <Text className="text-gray-400 text-[10px] font-black uppercase tracking-[2px] mb-2">Check-in Status</Text>
              <View className="flex-row items-baseline">
                <Text className="text-ted-black text-4xl font-black">
                  {checkedInCount}
                </Text>
                <Text className="text-gray-300 text-xl font-bold ml-2">/ {totalCount}</Text>
              </View>
            </View>
            <View className="bg-ted-red/10 w-14 h-14 rounded-[20px] justify-center items-center">
              <MaterialCommunityIcons name="account-group" size={28} color={TED_COLORS.red} />
            </View>
          </View>

          {/* Progress Bar */}
          <View className="w-full h-4 bg-gray-50 rounded-full overflow-hidden border border-gray-100">
            <Animated.View
              style={{ width: `${progress * 100}%` }}
              className="h-full bg-ted-red rounded-full"
            />
          </View>
          <View className="flex-row justify-between mt-4">
            <Text className="text-ted-red font-black text-xs tracking-wide">
              {Math.round(progress * 100)}% Complete
            </Text>
            <Text className="text-gray-400 text-xs font-bold uppercase">
              {totalCount - checkedInCount} Pending
            </Text>
          </View>
        </Animated.View>

        {/* Primary Actions */}
        <Animated.View 
          entering={FadeInDown.duration(800).delay(600)}
          className="items-center"
        >
          {/* Refined Glow and Button */}
          <Glow 
            size={4} 
            color={TED_COLORS.red} 
            secondaryColor={TED_COLORS.accent} 
            radius={32}
            intensity={1}
            speed={0.5}
            style="pulse"
          >
            <Button
              onPress={() => router.push('/scan')}
              backgroundColor={TED_COLORS.red}
              width={260}
              height={64}
              borderRadius={32}
              style={{ shadowColor: TED_COLORS.red, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.15, shadowRadius: 12 }}
            >
              <View className="flex-row items-center justify-center w-full">
                <MaterialCommunityIcons name="qrcode-scan" size={22} color="white" />
                <Text className="text-white text-lg font-bold ml-3 tracking-tight">Scan QR</Text>
              </View>
            </Button>
          </Glow>

          <Pressable
            onPress={() => router.push('/attendees')}
            className="mt-12 flex-row items-center bg-gray-50 px-8 py-4 rounded-[24px] border border-gray-100 active:scale-95 transition-all"
          >
            <MaterialCommunityIcons name="format-list-bulleted" size={20} color={TED_COLORS.black} />
            <Text className="ml-3 font-bold text-ted-black tracking-tight">
              View All Attendees
            </Text>
          </Pressable>
        </Animated.View>
      </View>
    </View>
  );
}

