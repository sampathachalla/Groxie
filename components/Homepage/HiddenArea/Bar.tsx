// components/Homepage/Bar.tsx
import { View } from 'react-native';
import { useThemeContext } from '../../../context/ThemeContext'; // ✅ Adjust path if needed

export default function Bar() {
  const { theme } = useThemeContext();

  // Choose color based on theme
  const backgroundColor = theme === 'dark' ? '#FCD34D' : '#A39E8D'; // yellow-300 for dark, beige for light

  return (
    <View
      style={{
        height: 6,
        width: 60,
        backgroundColor,
        borderRadius: 3,
        alignSelf: 'center',
        marginVertical: 8,
      }}
    />
  );
}