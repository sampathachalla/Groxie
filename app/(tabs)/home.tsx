import { View, Text } from 'react-native';
import BottomNavbar from '../../components/Navbar/BottomNavbar';
import TopNavbar from '../../components/Navbar/TopNavbar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import { useColorScheme } from 'nativewind';

export default function HomeScreen() {
  const { theme } = useTheme();
  const { colorScheme } = useColorScheme();

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-dark-background" edges={['left', 'right', 'bottom']}>
      <SafeAreaView edges={['top']} className="bg-background dark:bg-dark-background">
        <TopNavbar />
      </SafeAreaView>
      <View className="flex-1 justify-center items-center px-6 pt-16">
        <Text className="text-4xl font-extrabold text-primary dark:text-dark-primary mb-4 tracking-tight text-center">
          Welcome to Groxie!
        </Text>
        <Text className="text-lg text-text-secondary dark:text-dark-text-secondary text-center mb-8">
          Start scanning your food and discover what you eat.
        </Text>
        <Text className="text-base text-gray-400 text-center">
          (This is your home screen. Add your features here!)
        </Text>
        {/* Debug theme info */}
        <View className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg border border-gray-300 dark:border-gray-600">
          <Text className="text-text-primary dark:text-dark-text-primary font-bold">
            Context Theme: {theme}
          </Text>
          <Text className="text-text-primary dark:text-dark-text-primary font-bold">
            NativeWind Scheme: {colorScheme}
          </Text>
          <Text className="text-text-secondary dark:text-dark-text-secondary text-sm mt-2">
            This box should change color when you toggle the theme
          </Text>
          <Text className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            If themes match but colors don't change, restart the app
          </Text>
        </View>
      </View>
      <BottomNavbar />
    </SafeAreaView>
  );
}