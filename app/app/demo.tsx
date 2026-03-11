import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import { Glow } from '@/components/ui/base/glow';
import { Button } from '@/components/ui/base/button';
import { TouchableRipple } from '@/components/ui/base/ripple';
import { Container } from '@/components/Container';

export default function DemoScreen() {
  const [loading, setLoading] = useState(false);

  const handlePress = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <Container>
      <Stack.Screen options={{ title: 'Reacticx Demo' }} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Reacticx Components</Text>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Glow Effect</Text>
          <Glow size={6} color="#8b5cf6" secondaryColor="#ec4899">
            <View style={styles.card}>
              <Text style={styles.cardText}>Glow on View</Text>
            </View>
          </Glow>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Animated Button</Text>
          <Button
            isLoading={loading}
            onPress={handlePress}
            backgroundColor="#000"
            loadingText="Processing..."
            width={250}>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Click Me</Text>
          </Button>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Ripple Effect</Text>
          <TouchableRipple rippleConfig={{ color: 'rgba(0,0,0,0.1)' }}>
            <View style={[styles.card, { backgroundColor: '#f0f0f0' }]}>
              <Text style={[styles.cardText, { color: '#000' }]}>Tap for Ripple</Text>
            </View>
          </TouchableRipple>
        </View>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#000',
  },
  section: {
    marginBottom: 40,
    alignItems: 'center',
    width: '100%',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#666',
  },
  card: {
    width: 200,
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
