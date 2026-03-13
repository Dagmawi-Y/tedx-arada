import React, { useState, useMemo, memo } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { Stack, router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import { useCheckInStore, Attendee } from '@/store/check-in-store';
import { TED_COLORS } from '@/constants/Colors';
import { Title } from '@/components/ui/base/title';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Toast } from '@/components/ui/molecules/Toast';
import * as Haptics from 'expo-haptics';

/**
 * Highly optimized Attendee Item
 * Memoized to prevent re-renders during recycling
 */
const AttendeeItem = memo(({ item }: { item: Attendee }) => {
  const isCheckedIn = item.status === 'checked_in';
  const checkIn = useCheckInStore((state) => state.checkIn);

  const handleManualCheckIn = () => {
    if (isCheckedIn) return;
    
    // Simple haptic for manual action
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    const result = checkIn(item.id);
    if (result.success) {
      Toast.show(`Manually Checked In: ${item.name}`, {
        type: 'success',
        position: 'top',
      });
    }
  };

  return (
    <View className="mb-4">
      <View 
        className="bg-white p-5 rounded-[24px] border border-gray-100 flex-row items-center justify-between shadow-sm shadow-black/5"
      >
        <View className="flex-row items-center flex-1">
          <View 
            style={{ backgroundColor: isCheckedIn ? '#059669' : '#F9F9F9' }}
            className="w-12 h-12 rounded-2xl justify-center items-center mr-4"
          >
            <MaterialCommunityIcons 
              name={isCheckedIn ? "account-check" : "account-outline"} 
              size={24} 
              color={isCheckedIn ? 'white' : '#CCC'} 
            />
          </View>
          <View className="flex-1 pr-2">
            <Text className="text-ted-black font-bold text-lg" numberOfLines={1}>{item.name}</Text>
            <Text className="text-gray-400 text-sm font-medium" numberOfLines={1}>{item.email}</Text>
          </View>
        </View>

        <Pressable 
          onPress={handleManualCheckIn}
          style={{ 
            backgroundColor: isCheckedIn ? 'rgba(5, 150, 105, 0.05)' : 'white',
            borderColor: isCheckedIn ? '#059669' : '#F0F0F0' 
          }}
          className="px-4 py-2 rounded-xl border active:opacity-60"
        >
          <Text style={{ color: isCheckedIn ? '#059669' : '#BBB' }} className="text-[10px] font-black uppercase tracking-tighter">
            {isCheckedIn ? 'AUTHENTICATED' : 'CHECK IN'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
});

export default function AttendeesScreen() {
  const attendees = useCheckInStore((state) => state.attendees);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'checked_in' | 'pending'>('all');

  const filteredAttendees = useMemo(() => {
    return attendees
      .filter((a) => {
        const matchesSearch = a.name.toLowerCase().includes(search.toLowerCase()) || 
                             a.email.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === 'all' || 
                             (filter === 'checked_in' && a.status === 'checked_in') ||
                             (filter === 'pending' && a.status !== 'checked_in');
        return matchesSearch && matchesFilter;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [attendees, search, filter]);

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header Area */}
      <View className="pt-16 px-5 pb-6 bg-white shadow-sm shadow-black/5 z-10">
        <View className="flex-row items-center justify-between mb-6">
          <Pressable 
            onPress={() => router.back()} 
            className="w-10 h-10 rounded-full bg-gray-50 justify-center items-center border border-gray-100"
          >
            <MaterialCommunityIcons name="chevron-left" size={28} color={TED_COLORS.black} />
          </Pressable>
          <Title size={20} color={TED_COLORS.black} weight="bold">Guest Registry</Title>
          <View className="w-10" />
        </View>

        {/* Search Bar */}
        <View className="bg-gray-50 rounded-2xl flex-row items-center px-4 py-3 border border-gray-100">
          <MaterialCommunityIcons name="magnify" size={20} color="#999" />
          <TextInput 
            placeholder="Find by name or email..."
            placeholderTextColor="#999"
            className="flex-1 text-ted-black ml-2 text-base font-medium"
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <Pressable onPress={() => setSearch('')}>
              <MaterialCommunityIcons name="close-circle" size={18} color="#999" />
            </Pressable>
          )}
        </View>

        {/* Filter Tabs */}
        <View className="flex-row mt-6 space-x-2">
          {[
            { id: 'all', label: 'All Guests' },
            { id: 'checked_in', label: 'In Event' },
            { id: 'pending', label: 'Awaiting' }
          ].map((opt) => (
            <Pressable
              key={opt.id}
              onPress={() => setFilter(opt.id as any)}
              style={{ 
                backgroundColor: filter === opt.id ? TED_COLORS.red : 'white',
                borderColor: filter === opt.id ? TED_COLORS.red : '#eee'
              }}
              className="px-4 py-2 rounded-full border mr-2"
            >
              <Text className={`text-xs font-bold uppercase tracking-wider ${filter === opt.id ? 'text-white' : 'text-gray-400'}`}>
                {opt.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Optimized List Area */}
      <View className="flex-1 mt-2">
        <FlashList
          data={filteredAttendees}
          renderItem={({ item }) => <AttendeeItem item={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Animated.View entering={FadeIn.delay(200)} className="items-center justify-center py-20">
              <MaterialCommunityIcons name="account-search-outline" size={64} color="#333" />
              <Text className="text-gray-500 mt-4 text-lg">No attendees found</Text>
            </Animated.View>
          )}
        />
      </View>
    </View>
  );
}
