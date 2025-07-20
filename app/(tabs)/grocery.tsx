import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import BottomNavbar from '../../components/Navbar/BottomNavbar';
import TopNavbar from '../../components/Navbar/TopNavbar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react';

export default function GroceryScreen() {
  const { theme } = useTheme();
  const [groceryItems, setGroceryItems] = useState([
    { id: 1, name: 'Apples', quantity: '6 pieces', completed: false },
    { id: 2, name: 'Milk', quantity: '1 liter', completed: true },
    { id: 3, name: 'Bread', quantity: '2 loaves', completed: false },
    { id: 4, name: 'Chicken Breast', quantity: '500g', completed: false },
  ]);
  const [newItem, setNewItem] = useState('');

  const toggleItem = (id: number) => {
    setGroceryItems(items =>
      items.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const addItem = () => {
    if (newItem.trim()) {
      setGroceryItems(items => [
        ...items,
        { id: Date.now(), name: newItem.trim(), quantity: '1', completed: false }
      ]);
      setNewItem('');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-dark-background" edges={['left', 'right', 'bottom']}>
      <SafeAreaView edges={['top']} className="bg-background dark:bg-dark-background">
        <TopNavbar />
      </SafeAreaView>
      
      <View className="flex-1 px-4 pt-4">
        <Text className="text-2xl font-bold text-primary dark:text-dark-primary mb-6">
          Grocery List
        </Text>

        {/* Add new item */}
        <View className="flex-row items-center mb-6">
          <TextInput
            className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-text-primary dark:text-dark-text-primary bg-card dark:bg-dark-card"
            placeholder="Add new item..."
            placeholderTextColor={theme === 'dark' ? '#9CA3AF' : '#6B7280'}
            value={newItem}
            onChangeText={setNewItem}
            onSubmitEditing={addItem}
          />
          <TouchableOpacity
            onPress={addItem}
            className="ml-3 bg-primary dark:bg-dark-primary p-3 rounded-lg"
          >
            <FontAwesome name="plus" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Grocery items */}
        <ScrollView className="flex-1">
          {groceryItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => toggleItem(item.id)}
              className={`flex-row items-center p-4 mb-3 rounded-lg border ${
                item.completed
                  ? 'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                  : 'bg-card dark:bg-dark-card border-gray-200 dark:border-gray-600'
              }`}
            >
              <View className={`w-6 h-6 rounded-full border-2 items-center justify-center mr-4 ${
                item.completed
                  ? 'bg-primary dark:bg-dark-primary border-primary dark:border-dark-primary'
                  : 'border-gray-400 dark:border-gray-500'
              }`}>
                {item.completed && (
                  <FontAwesome name="check" size={12} color="#fff" />
                )}
              </View>
              <View className="flex-1">
                <Text className={`text-lg font-medium ${
                  item.completed
                    ? 'text-gray-500 dark:text-gray-400 line-through'
                    : 'text-text-primary dark:text-dark-text-primary'
                }`}>
                  {item.name}
                </Text>
                <Text className={`text-sm ${
                  item.completed
                    ? 'text-gray-400 dark:text-gray-500'
                    : 'text-text-secondary dark:text-dark-text-secondary'
                }`}>
                  {item.quantity}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Summary */}
        <View className="bg-card dark:bg-dark-card p-4 rounded-lg mt-4 mb-4">
          <Text className="text-lg font-semibold text-primary dark:text-dark-primary mb-2">
            Summary
          </Text>
          <Text className="text-text-secondary dark:text-dark-text-secondary">
            {groceryItems.filter(item => !item.completed).length} items remaining
          </Text>
          <Text className="text-text-secondary dark:text-dark-text-secondary">
            {groceryItems.filter(item => item.completed).length} items completed
          </Text>
        </View>
      </View>

      <BottomNavbar />
    </SafeAreaView>
  );
} 