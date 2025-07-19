import { View, StyleSheet, Dimensions } from 'react-native';
import HiddenSection from './HiddenArea/HiddenSection';
import Bar from './HiddenArea/Bar';
import { useThemeContext } from '../../context/ThemeContext'; // ✅ Import your context

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const HIDDEN_SECTION_HEIGHT = SCREEN_HEIGHT * 0.3;

export const HIDDEN_SECTION_HEIGHT_CONST = HIDDEN_SECTION_HEIGHT;

export const HiddenHeader = () => {
  const { theme } = useThemeContext(); // ✅ Get current theme

  return (
    <View
      style={[
        styles.hiddenSection,
        { backgroundColor: theme === 'dark' ? '#1f2937' : '#f5f5f5' }, // ✅ Apply color based on theme
      ]}
    >
      <HiddenSection />
      <Bar />
    </View>
  );
};

const styles = StyleSheet.create({
  hiddenSection: {
    height: HIDDEN_SECTION_HEIGHT,
    zIndex: 0,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
});