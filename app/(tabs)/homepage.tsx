import { useEffect, useState } from 'react';
import { SafeAreaView, ActivityIndicator, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { HiddenHeader } from '@/components/Homepage/HiddenHeader';
import HomePanel from '@/components/Homepage/HomePanel';
import { useThemeContext } from '@/context/ThemeContext';

export default function HomePage() {
  const [user, setUser] = useState<{ id: string; username: string } | null>(null);
  const { theme } = useThemeContext();

  useEffect(() => {
    const loadUser = async () => {
      const data = await AsyncStorage.getItem('userInfo');
      if (data) {
        setUser(JSON.parse(data));
      }
    };
    loadUser();
  }, []);

  const backgroundColor = theme === 'dark' ? '#18181b' : '#ffffff'; // ✅ Theme-aware background

  if (!user) {
    return (
      <SafeAreaView style={[styles.centered, { backgroundColor }]}>
        <ActivityIndicator size="large" color="#fff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      {/* ✅ Floating top surprise section */}
      <View style={StyleSheet.absoluteFillObject} pointerEvents="box-none">
        <HiddenHeader />
      </View>

      {/* ✅ HomePanel fills screen below header */}
      <View style={{ flex: 1 }}>
        <HomePanel user={user} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});