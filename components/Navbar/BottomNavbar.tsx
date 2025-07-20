import { View, TouchableOpacity, Text } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '../../context/ThemeContext';
import { useRouter, usePathname } from 'expo-router';

export default function BottomNavbar({ onScanPress }: { onScanPress?: () => void }) {
  const { theme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  
  const iconColor = theme === 'dark' ? '#B0BEC5' : '#757575';
  const activeIconColor = theme === 'dark' ? '#FFFFFF' : '#000000';
  const activeTextColor = theme === 'dark' ? '#FFFFFF' : '#000000';

  const tabs = [
    { name: 'home', icon: 'home', label: 'Home', route: '/(tabs)/home' as const },
    { name: 'grocery', icon: 'shopping-basket', label: 'Grocery', route: '/(tabs)/grocery' as const },
    { name: 'search', icon: 'search', label: 'Search', route: '/(tabs)/search' as const },
    { name: 'diet', icon: 'cutlery', label: 'Diet', route: '/(tabs)/diet' as const },
    { name: 'history', icon: 'history', label: 'History', route: '/(tabs)/history' as const }
  ];

  const isActive = (route: string) => {
    return pathname === route;
  };

  return (
    <View className="bg-background dark:bg-dark-background border-t border-gray-200 dark:border-dark-input">
      <View className="flex-row items-center justify-between px-4 py-2">
        {tabs.map((tab, index) => {
          const active = isActive(tab.route);
          const isSearchTab = tab.name === 'search';
          
          if (isSearchTab) {
            return (
              <TouchableOpacity
                key={tab.name}
                className="flex-1 items-center"
                style={{ zIndex: 10 }}
                onPress={() => router.push(tab.route)}
                activeOpacity={0.8}
              >
                <View className="w-16 h-16 rounded-full bg-primary dark:bg-dark-primary items-center justify-center shadow-lg border-4 border-background dark:border-dark-background -mt-6">
                  <FontAwesome name="search" size={32} color="#fff" />
                </View>
                <Text className="text-xs text-primary dark:text-dark-primary mt-1 font-bold">Search</Text>
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity
              key={tab.name}
              className="flex-1 items-center"
              onPress={() => router.push(tab.route)}
              activeOpacity={0.7}
            >
              <FontAwesome 
                name={tab.icon as any} 
                size={24} 
                color={active ? activeIconColor : iconColor} 
              />
              <Text className={`text-xs mt-1 ${
                active 
                  ? 'text-primary dark:text-dark-primary font-semibold' 
                  : 'text-text-secondary dark:text-dark-text-secondary'
              }`}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
} 