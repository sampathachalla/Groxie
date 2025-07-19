import { View, TouchableOpacity, Text } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '../../context/ThemeContext';

export default function BottomNavbar({ onScanPress }: { onScanPress?: () => void }) {
  const { theme } = useTheme();
  const iconColor = theme === 'dark' ? '#B0BEC5' : '#757575';

  return (
    <View className="bg-background dark:bg-dark-background border-t border-gray-200 dark:border-dark-input">
      <View className="flex-row items-center justify-between px-4 py-2">
        {/* Profile */}
        <TouchableOpacity className="flex-1 items-center">
          <FontAwesome name="user" size={24} color={iconColor} />
          <Text className="text-xs text-text-secondary dark:text-dark-text-secondary mt-1">Profile</Text>
        </TouchableOpacity>
        {/* Search */}
        <TouchableOpacity className="flex-1 items-center">
          <FontAwesome name="search" size={24} color={iconColor} />
          <Text className="text-xs text-text-secondary dark:text-dark-text-secondary mt-1">Search</Text>
        </TouchableOpacity>
        {/* Scanner (center, prominent) */}
        <TouchableOpacity
          className="flex-1 items-center"
          style={{ zIndex: 10 }}
          onPress={onScanPress}
          activeOpacity={0.8}
        >
          <View className="w-16 h-16 rounded-full bg-primary dark:bg-dark-primary items-center justify-center shadow-lg border-4 border-background dark:border-dark-background -mt-6">
            <FontAwesome name="camera" size={32} color="#fff" />
          </View>
          <Text className="text-xs text-primary dark:text-dark-primary mt-1 font-bold">Scan</Text>
        </TouchableOpacity>
        {/* History */}
        <TouchableOpacity className="flex-1 items-center">
          <FontAwesome name="history" size={24} color={iconColor} />
          <Text className="text-xs text-text-secondary dark:text-dark-text-secondary mt-1">History</Text>
        </TouchableOpacity>
        {/* More */}
        <TouchableOpacity className="flex-1 items-center">
          <FontAwesome name="bars" size={24} color={iconColor} />
          <Text className="text-xs text-text-secondary dark:text-dark-text-secondary mt-1">More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
} 