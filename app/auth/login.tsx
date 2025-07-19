import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  useColorScheme,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const colorScheme = useColorScheme();

  const handleLogin = () => {
    // Dummy login logic for demo
    if ((email === 'sampath' || email === 'sampath@gmail.com') && password === 'sam2001') {
      router.replace('/(tabs)/home');
    } else {
      alert('Invalid credentials. Try sampath / sam2001');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-dark-background">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <View className="flex-1 justify-center items-center px-6 py-12">
            {/* Branding */}
            <Text className="text-5xl font-extrabold text-primary dark:text-dark-primary mb-2 tracking-tight">Groxie</Text>
            <Text className="text-base text-text-secondary dark:text-dark-text-secondary mb-8 font-medium">Scan. Eat. Repeat.</Text>

            {/* Login Form */}
            <View className="w-full p-6 rounded-2xl shadow-sm mb-6">
              <TextInput
                placeholder="Email or username"
                className="border-b border-gray-200 dark:border-dark-input mb-6 py-3 text-base text-text-primary dark:text-dark-text-primary bg-transparent"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                placeholderTextColor={colorScheme === 'dark' ? '#B0BEC5' : '#757575'}
              />
              <View className="relative">
                <TextInput
                  placeholder="Password"
                  className="border-b border-gray-200 dark:border-dark-input mb-2 py-3 text-base text-text-primary dark:text-dark-text-primary bg-transparent pr-10"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  placeholderTextColor={colorScheme === 'dark' ? '#B0BEC5' : '#757575'}
                />
                <TouchableOpacity
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-2"
                  onPress={() => setShowPassword((prev) => !prev)}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <FontAwesome
                    name={showPassword ? 'eye-slash' : 'eye'}
                    size={20}
                    color={colorScheme === 'dark' ? '#B0BEC5' : '#757575'}
                  />
                </TouchableOpacity>
              </View>
              <View className="items-end mb-6">
                <TouchableOpacity>
                  <Text className="text-xs text-secondary dark:text-dark-secondary font-semibold">Forgot Password?</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                className="bg-button dark:bg-dark-button py-4 rounded-xl mb-2"
                onPress={handleLogin}
              >
                <Text className="text-white text-center font-bold text-lg">Log In</Text>
              </TouchableOpacity>
            </View>

            {/* Divider */}
            <View className="flex-row items-center w-full mb-6">
              <View className="flex-1 h-px bg-gray-200 dark:bg-dark-input" />
              <Text className="mx-4 text-text-secondary dark:text-dark-text-secondary font-medium">or</Text>
              <View className="flex-1 h-px bg-gray-200 dark:bg-dark-input" />
            </View>

            {/* Google Button */}
            <TouchableOpacity
              className="flex-row items-center bg-card dark:bg-dark-card py-3 px-6 rounded-full border border-gray-200 dark:border-dark-input mb-8 shadow-sm"
              onPress={() => {}}
            >
              <FontAwesome name="google" size={20} color="#FB8C00" />
              <Text className="ml-3 text-base font-semibold text-text-primary dark:text-dark-text-primary">Sign in with Google</Text>
            </TouchableOpacity>

            {/* Footer */}
            <Text className="text-base text-text-secondary dark:text-dark-text-secondary">
              Don’t have an account?{' '}
              <Link href="/auth/signup" className="text-secondary dark:text-dark-secondary font-bold">Sign up</Link>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}