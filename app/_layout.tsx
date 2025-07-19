import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { ThemeProvider, useTheme } from '../context/ThemeContext';

// Load Tailwind styles only on web (for NativeWind)
if (typeof window !== 'undefined') {
  require('../global.css');
}

// 🔄 Custom inner layout wrapper to apply dynamic dark mode class
function ThemedLayoutWrapper() {
  const { theme } = useTheme();

  return (
    <SafeAreaProvider>
      <View className="flex-1 bg-background dark:bg-dark-background">
        <Stack screenOptions={{ headerShown: false }} />
        <StatusBar
          style={theme === 'dark' ? 'light' : 'dark'}
          backgroundColor={theme === 'dark' ? '#181818' : '#FFFFFF'}
        />
      </View>
    </SafeAreaProvider>
  );
}

// ✅ Final Export
export default function Layout() {
  return (
    <ThemeProvider>
      <ThemedLayoutWrapper />
    </ThemeProvider>
  );
}