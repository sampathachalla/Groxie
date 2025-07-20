import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, ActivityIndicator } from 'react-native';
import { ThemeProvider, useTheme } from '../context/ThemeContext';

// Load Tailwind styles only on web (for NativeWind)
if (typeof window !== 'undefined') {
  require('../global.css');
}

// 🔄 Custom inner layout wrapper to apply dynamic dark mode class
function ThemedLayoutWrapper() {
  // Add the same error handling here
  let theme = 'light';
  let themeError = false;
  let themeContext;

  try {
    themeContext = useTheme();
    if (themeContext && typeof themeContext === 'object' && themeContext.theme) {
      theme = themeContext.theme;
    }
  } catch (error) {
    // Fallback to light theme if context fails
    console.error('Error in ThemedLayoutWrapper:', error);
    themeError = true;
  }

  if (!themeContext || themeError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <View className="flex-1 bg-background dark:bg-dark-background">
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="auth" options={{ headerShown: false }} />
        </Stack>
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