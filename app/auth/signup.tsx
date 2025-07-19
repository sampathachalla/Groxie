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
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const colorScheme = useColorScheme();

  const handleSignup = () => {
    // TODO: Implement real signup logic
    if (!email || !password || !confirmPassword) {
      alert('Please fill all fields');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    router.replace('/auth/login');
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
            <Text className="text-base text-text-secondary dark:text-dark-text-secondary mb-8 font-medium">Create your Groxie account</Text>

            {/* Signup Form */}
            <View className="w-full p-6 rounded-2xl shadow-sm mb-6">
              <TextInput
                placeholder="Email or username"
                className="border-b border-gray-200 dark:border-dark-input mb-6 py-3 text-base text-text-primary dark:text-dark-text-primary bg-transparent"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                placeholderTextColor={colorScheme === 'dark' ? '#B0BEC5' : '#757575'}
              />
              <View className="relative mb-6">
                <TextInput
                  placeholder="Password"
                  className="border-b border-gray-200 dark:border-dark-input py-3 text-base text-text-primary dark:text-dark-text-primary bg-transparent pr-10"
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
              <View className="relative mb-8">
                <TextInput
                  placeholder="Confirm Password"
                  className="border-b border-gray-200 dark:border-dark-input py-3 text-base text-text-primary dark:text-dark-text-primary bg-transparent pr-10"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  placeholderTextColor={colorScheme === 'dark' ? '#B0BEC5' : '#757575'}
                />
                <TouchableOpacity
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-2"
                  onPress={() => setShowConfirmPassword((prev) => !prev)}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <FontAwesome
                    name={showConfirmPassword ? 'eye-slash' : 'eye'}
                    size={20}
                    color={colorScheme === 'dark' ? '#B0BEC5' : '#757575'}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                className="bg-button dark:bg-dark-button py-4 rounded-xl mb-2"
                onPress={handleSignup}
              >
                <Text className="text-white text-center font-bold text-lg">Sign Up</Text>
              </TouchableOpacity>
            </View>

            {/* Footer */}
            <Text className="text-base text-text-secondary dark:text-dark-text-secondary">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-secondary dark:text-dark-secondary font-bold">Log in</Link>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}