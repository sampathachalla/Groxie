import { View, Text, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useRouter, useGlobalSearchParams } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const router = useRouter();
  const params = useGlobalSearchParams();
  
  // Add error handling for useTheme
  let theme = 'light';
  let themeError = false;
  
  try {
    const themeContext = useTheme();
    if (themeContext && typeof themeContext === 'object' && themeContext.theme) {
      theme = themeContext.theme;
    } else {
      console.warn('useTheme returned invalid data:', themeContext);
      themeError = true;
    }
  } catch (error) {
    console.error('Error using useTheme:', error);
    themeError = true;
  }

  const handleBackPress = () => {
    // Get the returnTo parameter to know which page to go back to
    const returnTo = params.returnTo as string;
    
    if (returnTo && typeof returnTo === 'string') {
      // Navigate to the specific page the user came from
      router.push(returnTo as any);
    } else if (router.canGoBack()) {
      // Fallback: try to go back in history
      router.back();
    } else {
      // Final fallback: go to home
      router.push('/(tabs)/home');
    }
  };
  
  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-dark-background" edges={['top', 'left', 'right']}>
      {/* Header with back button - modern minimalist style */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b bg-white dark:bg-black z-10" style={{ borderBottomWidth: 1, borderColor: theme === 'dark' ? '#222' : '#eee' }}>
        <TouchableOpacity 
          onPress={handleBackPress} // Use the improved back handler
          className="items-center justify-center"
          activeOpacity={0.7}
          style={{ width: 44, height: 44 }}
        >
          <FontAwesome 
            name="arrow-left" 
            size={20} 
            color={theme === 'dark' ? '#B0BEC5' : '#222'} 
          />
        </TouchableOpacity>
        <Text className="text-xl font-bold" style={{ color: theme === 'dark' ? '#00FF00' : '#007AFF' }}>
          Profile {themeError && '(Theme Error)'}
        </Text>
        <View style={{ width: 44, height: 44 }} /> {/* Spacer for centering */}
      </View>

      {/* Profile Content */}
      <View className="flex-1 items-center justify-center px-6">
        <View className="w-24 h-24 rounded-full bg-gray-200 dark:bg-dark-card items-center justify-center mb-6">
          {/* Placeholder for avatar */}
          <Text className="text-4xl text-primary dark:text-dark-primary font-bold">👤</Text>
        </View>
        <Text className="text-2xl font-bold text-primary dark:text-dark-primary mb-2">Your Name</Text>
        <Text className="text-base text-text-secondary dark:text-dark-text-secondary mb-8">@username</Text>
        <View className="w-full bg-card dark:bg-dark-card rounded-xl p-6 shadow">
          <Text className="text-lg font-semibold text-primary dark:text-dark-primary mb-2">Profile Info</Text>
          <Text className="text-base text-text-secondary dark:text-dark-text-secondary">
            This is your profile screen. Current theme: {theme}
            {themeError && ' (Error loading theme context)'}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
} 