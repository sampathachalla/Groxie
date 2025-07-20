import { Tabs } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function TabsLayout() {
  const { theme } = useTheme();
  const iconColor = theme === 'dark' ? '#B0BEC5' : '#757575';
  const activeIconColor = theme === 'dark' ? '#FFFFFF' : '#000000';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: 'none' }, // Hide default tab bar since we have custom BottomNavbar
      }}
      initialRouteName="home"
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <FontAwesome 
              name="home" 
              size={24} 
              color={focused ? activeIconColor : iconColor} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="grocery"
        options={{
          title: 'Grocery',
          tabBarIcon: ({ focused }) => (
            <FontAwesome 
              name="shopping-basket" 
              size={24} 
              color={focused ? activeIconColor : iconColor} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ focused }) => (
            <FontAwesome 
              name="search" 
              size={24} 
              color={focused ? activeIconColor : iconColor} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="diet"
        options={{
          title: 'Diet',
          tabBarIcon: ({ focused }) => (
            <FontAwesome 
              name="cutlery" 
              size={24} 
              color={focused ? activeIconColor : iconColor} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ focused }) => (
            <FontAwesome 
              name="history" 
              size={24} 
              color={focused ? activeIconColor : iconColor} 
            />
          ),
        }}
      />
    </Tabs>
  );
}
