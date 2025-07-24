// context/ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Appearance, View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'nativewind';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isLoading, setIsLoading] = useState(true);
  const { setColorScheme } = useColorScheme();

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem('theme');
        if (stored === 'light' || stored === 'dark') {
          setTheme(stored);
          setColorScheme(stored);
        } else {
          const sys = Appearance.getColorScheme();
          const systemTheme = sys === 'dark' ? 'dark' : 'light';
          setTheme(systemTheme);
          setColorScheme(systemTheme);
        }
      } catch (error) {
        const sys = Appearance.getColorScheme();
        const systemTheme = sys === 'dark' ? 'dark' : 'light';
        setTheme(systemTheme);
        setColorScheme(systemTheme);
      }
      setIsLoading(false);
    })();
  }, []); // Remove setColorScheme from dependencies

  const toggleTheme = useCallback(async () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    setColorScheme(newTheme);
    try {
      await AsyncStorage.setItem('theme', newTheme);
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  }, [theme, setColorScheme]);

  if (isLoading) {
    // Render a loading indicator while theme is being loaded
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);