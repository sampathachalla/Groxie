import { View, Text, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import BottomNavbar from '../../components/Navbar/BottomNavbar';
import TopNavbar from '../../components/Navbar/TopNavbar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react';

export default function SearchScreen() {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([
    {
      id: 1,
      name: 'Organic Bananas',
      brand: 'Fresh Market',
      calories: 89,
      protein: '1.1g',
      carbs: '23g',
      fat: '0.3g',
      image: '🍌'
    },
    {
      id: 2,
      name: 'Greek Yogurt',
      brand: 'Chobani',
      calories: 130,
      protein: '15g',
      carbs: '9g',
      fat: '4g',
      image: '🥛'
    },
    {
      id: 3,
      name: 'Whole Grain Bread',
      brand: 'Nature\'s Own',
      calories: 80,
      protein: '3g',
      carbs: '15g',
      fat: '1g',
      image: '🍞'
    }
  ]);

  const handleSearch = () => {
    // In a real app, this would call an API
    console.log('Searching for:', searchQuery);
  };

  const handleScan = () => {
    // In a real app, this would open the camera
    console.log('Opening camera for scanning');
  };

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-dark-background" edges={['left', 'right', 'bottom']}>
      <SafeAreaView edges={['top']} className="bg-background dark:bg-dark-background">
        <TopNavbar />
      </SafeAreaView>
      
      <View className="flex-1 px-4 pt-4">
        <Text className="text-2xl font-bold text-primary dark:text-dark-primary mb-6">
          Search Food
        </Text>

        {/* Search input */}
        <View className="flex-row items-center mb-6">
          <View className="flex-1 flex-row items-center border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-card dark:bg-dark-card">
            <FontAwesome name="search" size={20} color={theme === 'dark' ? '#9CA3AF' : '#6B7280'} />
            <TextInput
              className="flex-1 ml-3 text-text-primary dark:text-dark-text-primary"
              placeholder="Search for food items..."
              placeholderTextColor={theme === 'dark' ? '#9CA3AF' : '#6B7280'}
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
            />
          </View>
        </View>

        {/* Scan button */}
        <TouchableOpacity
          onPress={handleScan}
          className="bg-primary dark:bg-dark-primary p-4 rounded-lg mb-6 flex-row items-center justify-center"
        >
          <FontAwesome name="camera" size={24} color="#fff" />
          <Text className="text-white font-semibold text-lg ml-3">
            Scan Food Item
          </Text>
        </TouchableOpacity>

        {/* Recent searches */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-primary dark:text-dark-primary mb-3">
            Recent Searches
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {['Apple', 'Milk', 'Bread', 'Chicken'].map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSearchQuery(item)}
                className="bg-card dark:bg-dark-card px-4 py-2 rounded-full mr-3 border border-gray-200 dark:border-gray-600"
              >
                <Text className="text-text-primary dark:text-dark-text-primary">
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Search results */}
        <View className="flex-1">
          <Text className="text-lg font-semibold text-primary dark:text-dark-primary mb-3">
            Search Results
          </Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            {searchResults.map((item) => (
              <TouchableOpacity
                key={item.id}
                className="bg-card dark:bg-dark-card p-4 rounded-lg mb-3 border border-gray-200 dark:border-gray-600"
              >
                <View className="flex-row items-center">
                  <Text className="text-3xl mr-4">{item.image}</Text>
                  <View className="flex-1">
                    <Text className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">
                      {item.name}
                    </Text>
                    <Text className="text-text-secondary dark:text-dark-text-secondary mb-2">
                      {item.brand}
                    </Text>
                    <View className="flex-row">
                      <Text className="text-sm text-text-secondary dark:text-dark-text-secondary mr-4">
                        {item.calories} cal
                      </Text>
                      <Text className="text-sm text-text-secondary dark:text-dark-text-secondary mr-4">
                        P: {item.protein}
                      </Text>
                      <Text className="text-sm text-text-secondary dark:text-dark-text-secondary mr-4">
                        C: {item.carbs}
                      </Text>
                      <Text className="text-sm text-text-secondary dark:text-dark-text-secondary">
                        F: {item.fat}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity className="bg-primary dark:bg-dark-primary p-2 rounded-full">
                    <FontAwesome name="plus" size={16} color="#fff" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      <BottomNavbar />
    </SafeAreaView>
  );
} 