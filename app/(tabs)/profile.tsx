import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import BottomNavbar from '../../components/Navbar/BottomNavbar';
import TopNavbar from '../../components/Navbar/TopNavbar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const { theme } = useTheme();
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: async () => {
            await logout();
            router.replace('/auth/login');
          }
        }
      ]
    );
  };

  if (!theme || (theme !== 'light' && theme !== 'dark')) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading theme...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-dark-background" edges={['left', 'right', 'bottom']}>
      <SafeAreaView edges={['top']} className="bg-background dark:bg-dark-background">
        <TopNavbar />
      </SafeAreaView>
      
      <View className="flex-1 px-4 pt-4">
        <Text className="text-2xl font-bold text-primary dark:text-dark-primary mb-6">
          Profile
        </Text>

        {/* Profile Content */}
        <View className="flex-1 items-center justify-center">
          <View className="w-24 h-24 rounded-full bg-gray-200 dark:bg-dark-card items-center justify-center mb-6">
            <FontAwesome name="user" size={32} color={theme === 'dark' ? '#00C853' : '#43A047'} />
          </View>

          <Text className="text-2xl font-bold text-primary dark:text-dark-primary mb-2">Your Name</Text>
          <Text className="text-base text-text-secondary dark:text-dark-text-secondary mb-8">@username</Text>

          <View className="w-full bg-card dark:bg-dark-card rounded-xl p-6 shadow">
            <Text className="text-lg font-semibold text-primary dark:text-dark-primary mb-2">
              Profile Info
            </Text>
            <Text className="text-base text-text-secondary dark:text-dark-text-secondary mb-4">
              This is your profile screen. Current theme: {theme}
            </Text>
            
            {/* Logout Button */}
            <TouchableOpacity
              onPress={handleLogout}
              className="bg-red-500 dark:bg-red-600 p-3 rounded-lg flex-row items-center justify-center mt-4"
            >
              <FontAwesome name="sign-out" size={16} color="#fff" />
              <Text className="text-white font-semibold ml-2">Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <BottomNavbar />
    </SafeAreaView>
  );
}