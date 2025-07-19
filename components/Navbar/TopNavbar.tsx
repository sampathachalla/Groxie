import { View, Text, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '../../context/ThemeContext';

export default function TopNavbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <View className="flex-row items-center justify-center px-4 py-3 border-b border-gray-200 dark:border-dark-input bg-background dark:bg-dark-background">
      {/* Centered App Name */}
      <View className="flex-1 items-center">
        <Text className="text-xl font-bold text-primary dark:text-dark-primary">Groxie</Text>
      </View>
      {/* Right-side: Dark/Light Toggle */}
      <TouchableOpacity onPress={toggleTheme} className="absolute right-4">
        <FontAwesome
          name={theme === 'dark' ? 'sun-o' : 'moon-o'}
          size={22}
          color={theme === 'dark' ? '#F5F5F5' : '#757575'}
        />
      </TouchableOpacity>
    </View>
  );
} 