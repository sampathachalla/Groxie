// components/Homepage/ProfileArea/ProfileIcon.tsx
import { Text, TouchableOpacity } from 'react-native';
import { useThemeContext } from '../../../context/ThemeContext'; // Adjust the path as needed

export default function ProfileIcon() {
  const { theme } = useThemeContext();

  const backgroundColor = theme === 'dark' ? '#FCD34D' : '#0f766e'; // yellow-300 or teal-700
  const textColor = theme === 'dark' ? '#1e293b' : '#ffffff';       // slate-800 or white

  return (
    <TouchableOpacity
      style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ color: textColor, fontSize: 18, fontWeight: 'bold' }}>
        S
      </Text>
    </TouchableOpacity>
  );
}