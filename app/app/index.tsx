import { Stack, router } from 'expo-router';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Button } from '@/components/ui/base/button';
import { Container } from '@/components/Container';
import { Glow } from '@/components/ui/base/glow';
import { Title } from '@/components/ui/base/title';
import { Subtitle } from '@/components/ui/base/subtitle/Subtitle';
import { TED_COLORS } from '@/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Home() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.content}>
        <View style={styles.logoSection}>
          {/* Mock Logo or Icon */}
          <View style={styles.logoCircle}>
            <MaterialCommunityIcons name="microphone-variant" size={48} color={TED_COLORS.red} />
          </View>
          <Title size={32} weight="bold" color={TED_COLORS.white}>
            TEDxArada
          </Title>
          <Subtitle size={16} style={{ color: TED_COLORS.accent }}>
            Check-in System
          </Subtitle>
        </View>

        <Glow size={4} color={TED_COLORS.red} secondaryColor={TED_COLORS.accent}>
          <View style={styles.buttonWrapper}>
            <Button
              onPress={() => router.push('/scan')}
              backgroundColor={TED_COLORS.red}
              width={280}
              height={60}
              borderRadius={30}
            >
              <View style={styles.buttonContent}>
                <MaterialCommunityIcons name="qrcode-scan" size={24} color={TED_COLORS.white} style={{ marginRight: 10 }} />
                <Text style={styles.buttonText}>Start Scanning</Text>
              </View>
            </Button>
          </View>
        </Glow>
        
        <Pressable style={styles.settingsLink} onPress={() => router.push('/demo')}>
          <Text style={styles.settingsText}>View UI Demo</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: TED_COLORS.black,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: TED_COLORS.dark,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  buttonWrapper: {
    marginTop: 20,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: TED_COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  settingsLink: {
    marginTop: 40,
    padding: 10,
  },
  settingsText: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 14,
  },
});
