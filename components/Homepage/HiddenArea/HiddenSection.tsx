import { View, Text, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useThemeContext } from '../../../context/ThemeContext'; // ✅ Adjust path based on your structure

const { height } = Dimensions.get('window');

export default function HiddenSection() {
  const { theme } = useThemeContext(); // ✅ Get current theme

  // Theme-based styles
  const backgroundColor = theme === 'dark' ? '#1e293b' : '#F5F5DC'; // dark gray or light beige
  const textColor = theme === 'dark' ? '#FCD34D' : '#5A4A2F';       // yellow-300 or brown

  return (
    <Animatable.View
      animation="fadeInDown"
      duration={400}
      useNativeDriver
      style={{
        flex: 1,
        backgroundColor,
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        justifyContent: 'flex-start',
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: textColor }}>
        🎁 Surprise Unlocked!
      </Text>
      <Text style={{ fontSize: 14, marginTop: 8, color: textColor }}>
        You revealed this by pulling down. Nice move!
      </Text>
    </Animatable.View>
  );
}