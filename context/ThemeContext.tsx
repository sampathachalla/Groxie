// context/ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Appearance } from 'react-native';
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
  const { setColorScheme } = useColorScheme();

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem('theme');
        console.log('Stored theme:', stored);
        if (stored === 'light' || stored === 'dark') {
          setTheme(stored);
          setColorScheme(stored);
        } else {
          const sys = Appearance.getColorScheme();
          console.log('System theme:', sys);
          const systemTheme = sys === 'dark' ? 'dark' : 'light';
          setTheme(systemTheme);
          setColorScheme(systemTheme);
        }
      } catch (error) {
        console.log('Error loading theme:', error);
        const sys = Appearance.getColorScheme();
        const systemTheme = sys === 'dark' ? 'dark' : 'light';
        setTheme(systemTheme);
        setColorScheme(systemTheme);
      }
    })();
  }, [setColorScheme]);

  const toggleTheme = async () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    console.log('Toggling theme from', theme, 'to', newTheme);
    setTheme(newTheme);
    setColorScheme(newTheme); // This is crucial for NativeWind
    try {
      await AsyncStorage.setItem('theme', newTheme);
      console.log('Theme saved to storage:', newTheme);
    } catch (error) {
      console.log('Error saving theme:', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);