import { View, Text } from 'react-native';

export default function Navbar() {
  return (
    <View className="w-full flex-row items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-dark-input bg-background dark:bg-dark-background">
      <Text className="text-xl font-bold text-primary dark:text-dark-primary">Groxie</Text>
      {/* Add navigation icons or buttons here */}
    </View>
  );
} 