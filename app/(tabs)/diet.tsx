import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import BottomNavbar from '../../components/Navbar/BottomNavbar';
import TopNavbar from '../../components/Navbar/TopNavbar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react';

export default function DietScreen() {
  const { theme } = useTheme();
  const [selectedDay, setSelectedDay] = useState('today');
  
  const nutritionGoals = {
    calories: { target: 2000, current: 1450, unit: 'cal' },
    protein: { target: 150, current: 120, unit: 'g' },
    carbs: { target: 250, current: 180, unit: 'g' },
    fat: { target: 65, current: 45, unit: 'g' },
    fiber: { target: 25, current: 18, unit: 'g' }
  };

  const meals = [
    {
      id: 1,
      name: 'Breakfast',
      time: '8:00 AM',
      items: [
        { name: 'Oatmeal with Berries', calories: 320, image: '🥣' },
        { name: 'Greek Yogurt', calories: 130, image: '🥛' }
      ],
      totalCalories: 450
    },
    {
      id: 2,
      name: 'Lunch',
      time: '12:30 PM',
      items: [
        { name: 'Grilled Chicken Salad', calories: 380, image: '🥗' },
        { name: 'Apple', calories: 95, image: '🍎' }
      ],
      totalCalories: 475
    },
    {
      id: 3,
      name: 'Dinner',
      time: '7:00 PM',
      items: [
        { name: 'Salmon with Vegetables', calories: 425, image: '🐟' },
        { name: 'Brown Rice', calories: 100, image: '🍚' }
      ],
      totalCalories: 525
    }
  ];

  const dietRecommendations = [
    {
      id: 1,
      title: 'Increase Protein Intake',
      description: 'Add more lean protein sources like chicken, fish, or legumes',
      icon: '💪',
      priority: 'high'
    },
    {
      id: 2,
      title: 'More Fiber',
      description: 'Include more fruits, vegetables, and whole grains',
      icon: '🌾',
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Stay Hydrated',
      description: 'Drink at least 8 glasses of water daily',
      icon: '💧',
      priority: 'low'
    }
  ];

  const days = [
    { key: 'today', label: 'Today' },
    { key: 'tomorrow', label: 'Tomorrow' },
    { key: 'week', label: 'This Week' }
  ];

  const getProgressColor = (current: number, target: number) => {
    const percentage = (current / target) * 100;
    if (percentage >= 90) return '#10B981'; // green
    if (percentage >= 70) return '#F59E0B'; // yellow
    return '#EF4444'; // red
  };

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-dark-background" edges={['left', 'right', 'bottom']}>
      <SafeAreaView edges={['top']} className="bg-background dark:bg-dark-background">
        <TopNavbar />
      </SafeAreaView>
      
      <ScrollView className="flex-1 px-4 pt-4">
        <Text className="text-2xl font-bold text-primary dark:text-dark-primary mb-6">
          Diet Plan
        </Text>

        {/* Day selector */}
        <View className="flex-row mb-6 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          {days.map((day) => (
            <TouchableOpacity
              key={day.key}
              onPress={() => setSelectedDay(day.key)}
              className={`flex-1 py-2 px-4 rounded-md ${
                selectedDay === day.key
                  ? 'bg-white dark:bg-gray-700 shadow-sm'
                  : ''
              }`}
            >
              <Text className={`text-center font-medium ${
                selectedDay === day.key
                  ? 'text-primary dark:text-dark-primary'
                  : 'text-text-secondary dark:text-dark-text-secondary'
              }`}>
                {day.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Nutrition Overview */}
        <View className="bg-card dark:bg-dark-card p-4 rounded-lg mb-6">
          <Text className="text-lg font-semibold text-primary dark:text-dark-primary mb-4">
            Nutrition Overview
          </Text>
          {Object.entries(nutritionGoals).map(([key, goal]) => (
            <View key={key} className="mb-3">
              <View className="flex-row justify-between items-center mb-1">
                <Text className="text-sm font-medium text-text-primary dark:text-dark-text-primary capitalize">
                  {key}
                </Text>
                <Text className="text-sm text-text-secondary dark:text-dark-text-secondary">
                  {goal.current}/{goal.target} {goal.unit}
                </Text>
              </View>
              <View className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <View 
                  className="h-full rounded-full"
                  style={{
                    width: `${Math.min((goal.current / goal.target) * 100, 100)}%`,
                    backgroundColor: getProgressColor(goal.current, goal.target)
                  }}
                />
              </View>
            </View>
          ))}
        </View>

        {/* Meals */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-primary dark:text-dark-primary mb-4">
            Today's Meals
          </Text>
          {meals.map((meal) => (
            <View key={meal.id} className="bg-card dark:bg-dark-card p-4 rounded-lg mb-3 border border-gray-200 dark:border-gray-600">
              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">
                  {meal.name}
                </Text>
                <Text className="text-sm text-text-secondary dark:text-dark-text-secondary">
                  {meal.time}
                </Text>
              </View>
              {meal.items.map((item, index) => (
                <View key={index} className="flex-row items-center mb-2">
                  <Text className="text-xl mr-3">{item.image}</Text>
                  <View className="flex-1">
                    <Text className="text-text-primary dark:text-dark-text-primary">
                      {item.name}
                    </Text>
                    <Text className="text-sm text-text-secondary dark:text-dark-text-secondary">
                      {item.calories} calories
                    </Text>
                  </View>
                </View>
              ))}
              <View className="flex-row justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-600">
                <Text className="font-semibold text-primary dark:text-dark-primary">
                  Total: {meal.totalCalories} cal
                </Text>
                <TouchableOpacity className="bg-primary dark:bg-dark-primary px-3 py-1 rounded-full">
                  <Text className="text-white text-sm">Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Recommendations */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-primary dark:text-dark-primary mb-4">
            Recommendations
          </Text>
          {dietRecommendations.map((rec) => (
            <View key={rec.id} className="bg-card dark:bg-dark-card p-4 rounded-lg mb-3 border border-gray-200 dark:border-gray-600">
              <View className="flex-row items-start">
                <Text className="text-2xl mr-3">{rec.icon}</Text>
                <View className="flex-1">
                  <View className="flex-row items-center mb-1">
                    <Text className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">
                      {rec.title}
                    </Text>
                    <View className={`ml-2 px-2 py-1 rounded-full ${
                      rec.priority === 'high' ? 'bg-red-100 dark:bg-red-900' :
                      rec.priority === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900' :
                      'bg-green-100 dark:bg-green-900'
                    }`}>
                      <Text className={`text-xs font-medium ${
                        rec.priority === 'high' ? 'text-red-800 dark:text-red-200' :
                        rec.priority === 'medium' ? 'text-yellow-800 dark:text-yellow-200' :
                        'text-green-800 dark:text-green-200'
                      }`}>
                        {rec.priority.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                  <Text className="text-text-secondary dark:text-dark-text-secondary">
                    {rec.description}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-primary dark:text-dark-primary mb-4">
            Quick Actions
          </Text>
          <View className="flex-row space-x-3">
            <TouchableOpacity className="flex-1 bg-primary dark:bg-dark-primary p-4 rounded-lg items-center">
              <FontAwesome name="plus" size={24} color="#fff" />
              <Text className="text-white font-semibold mt-2">Add Meal</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-card dark:bg-dark-card p-4 rounded-lg items-center border border-gray-200 dark:border-gray-600">
              <FontAwesome name="bar-chart" size={24} color={theme === 'dark' ? '#9CA3AF' : '#6B7280'} />
              <Text className="text-text-primary dark:text-dark-text-primary font-semibold mt-2">Analytics</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <BottomNavbar />
    </SafeAreaView>
  );
} 