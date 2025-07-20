import { View, Text, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '../../context/ThemeContext';
import { useRouter, useNavigation, usePathname } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';

export default function TopNavbar() {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const navigation = useNavigation();
  const pathname = usePathname();

  const handleProfilePress = () => {
    // Pass the current pathname as a parameter so profile knows where to return
    const currentPage = pathname || '/(tabs)/home';
    router.push({
      pathname: '/(tabs)/profile',
      params: { returnTo: currentPage }
    });
  };

  return (
    <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-dark-input bg-background dark:bg-dark-background z-50">
      {/* Profile Icon (left) */}
      <TouchableOpacity onPress={handleProfilePress}>
        <FontAwesome name="user-circle" size={28} color="#757575" />
      </TouchableOpacity>
      {/* Centered App Name */}
      <View className="flex-1 items-center">
        <Text className="text-xl font-bold text-primary dark:text-dark-primary">Groxie</Text>
      </View>
      {/* Right-side: Dark/Light Toggle */}
      <TouchableOpacity onPress={toggleTheme}>
        <FontAwesome
          name={theme === 'dark' ? 'sun-o' : 'moon-o'}
          size={22}
          color="#757575"
        />
      </TouchableOpacity>
    </View>
  );
}