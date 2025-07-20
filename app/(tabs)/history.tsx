import { View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import BottomNavbar from '../../components/Navbar/BottomNavbar';
import TopNavbar from '../../components/Navbar/TopNavbar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react';

export default function HistoryScreen() {
  const { theme } = useTheme();
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  const historyData = [
    {
      id: 1,
      type: 'scan',
      name: 'Organic Bananas',
      brand: 'Fresh Market',
      calories: 89,
      date: '2024-01-15',
      time: '10:30 AM',
      image: '🍌'
    },
    {
      id: 2,
      type: 'search',
      name: 'Greek Yogurt',
      brand: 'Chobani',
      calories: 130,
      date: '2024-01-15',
      time: '09:15 AM',
      image: '🥛'
    },
    {
      id: 3,
      type: 'scan',
      name: 'Whole Grain Bread',
      brand: 'Nature\'s Own',
      calories: 80,
      date: '2024-01-14',
      time: '06:45 PM',
      image: '🍞'
    },
    {
      id: 4,
      type: 'search',
      name: 'Chicken Breast',
      brand: 'Perdue',
      calories: 165,
      date: '2024-01-14',
      time: '05:20 PM',
      image: '🍗'
    },
    {
      id: 5,
      type: 'scan',
      name: 'Spinach',
      brand: 'Organic Valley',
      calories: 23,
      date: '2024-01-13',
      time: '04:10 PM',
      image: '🥬'
    }
  ];

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'scan', label: 'Scans' },
    { key: 'search', label: 'Searches' }
  ];

  const filteredData = selectedFilter === 'all' 
    ? historyData 
    : historyData.filter(item => item.type === selectedFilter);

  const renderHistoryItem = ({ item }: { item: any }) => (
    <TouchableOpacity className="bg-card dark:bg-dark-card p-4 rounded-lg mb-3 border border-gray-200 dark:border-gray-600">
      <View className="flex-row items-center">
        <View className="mr-4">
          <Text className="text-3xl">{item.image}</Text>
        </View>
        <View className="flex-1">
          <View className="flex-row items-center mb-1">
            <Text className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">
              {item.name}
            </Text>
            <View className={`ml-2 px-2 py-1 rounded-full ${
              item.type === 'scan' 
                ? 'bg-blue-100 dark:bg-blue-900' 
                : 'bg-green-100 dark:bg-green-900'
            }`}>
              <Text className={`text-xs font-medium ${
                item.type === 'scan' 
                  ? 'text-blue-800 dark:text-blue-200' 
                  : 'text-green-800 dark:text-green-200'
              }`}>
                {item.type === 'scan' ? 'SCAN' : 'SEARCH'}
              </Text>
            </View>
          </View>
          <Text className="text-text-secondary dark:text-dark-text-secondary mb-1">
            {item.brand}
          </Text>
          <View className="flex-row items-center">
            <Text className="text-sm text-text-secondary dark:text-dark-text-secondary mr-4">
              {item.calories} cal
            </Text>
            <Text className="text-sm text-text-secondary dark:text-dark-text-secondary">
              {item.date} • {item.time}
            </Text>
          </View>
        </View>
        <TouchableOpacity className="p-2">
          <FontAwesome name="ellipsis-v" size={16} color={theme === 'dark' ? '#9CA3AF' : '#6B7280'} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-dark-background" edges={['left', 'right', 'bottom']}>
      <SafeAreaView edges={['top']} className="bg-background dark:bg-dark-background">
        <TopNavbar />
      </SafeAreaView>
      
      <View className="flex-1 px-4 pt-4">
        <Text className="text-2xl font-bold text-primary dark:text-dark-primary mb-6">
          History
        </Text>

        {/* Filter tabs */}
        <View className="flex-row mb-6 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.key}
              onPress={() => setSelectedFilter(filter.key)}
              className={`flex-1 py-2 px-4 rounded-md ${
                selectedFilter === filter.key
                  ? 'bg-white dark:bg-gray-700 shadow-sm'
                  : ''
              }`}
            >
              <Text className={`text-center font-medium ${
                selectedFilter === filter.key
                  ? 'text-primary dark:text-dark-primary'
                  : 'text-text-secondary dark:text-dark-text-secondary'
              }`}>
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Stats */}
        <View className="bg-card dark:bg-dark-card p-4 rounded-lg mb-6">
          <Text className="text-lg font-semibold text-primary dark:text-dark-primary mb-3">
            This Week
          </Text>
          <View className="flex-row justify-between">
            <View className="items-center">
              <Text className="text-2xl font-bold text-primary dark:text-dark-primary">
                {historyData.filter(item => item.type === 'scan').length}
              </Text>
              <Text className="text-sm text-text-secondary dark:text-dark-text-secondary">
                Scans
              </Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-primary dark:text-dark-primary">
                {historyData.filter(item => item.type === 'search').length}
              </Text>
              <Text className="text-sm text-text-secondary dark:text-dark-text-secondary">
                Searches
              </Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-primary dark:text-dark-primary">
                {historyData.length}
              </Text>
              <Text className="text-sm text-text-secondary dark:text-dark-text-secondary">
                Total
              </Text>
            </View>
          </View>
        </View>

        {/* History list */}
        <View className="flex-1">
          <Text className="text-lg font-semibold text-primary dark:text-dark-primary mb-3">
            Recent Activity
          </Text>
          <FlatList
            data={filteredData}
            renderItem={renderHistoryItem}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View className="items-center justify-center py-8">
                <FontAwesome name="history" size={48} color={theme === 'dark' ? '#6B7280' : '#9CA3AF'} />
                <Text className="text-text-secondary dark:text-dark-text-secondary mt-4 text-center">
                  No {selectedFilter === 'all' ? 'activity' : selectedFilter} found
                </Text>
              </View>
            }
          />
        </View>
      </View>

      <BottomNavbar />
    </SafeAreaView>
  );
} 