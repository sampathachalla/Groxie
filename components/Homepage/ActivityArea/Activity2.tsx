import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useThemeContext } from '../../../context/ThemeContext';

const { width } = Dimensions.get('window');
const PARENT_HORIZONTAL_PADDING = 24;
const componentWidth = width - PARENT_HORIZONTAL_PADDING * 2;

const Activity2 = () => {
  const { theme } = useThemeContext();
  const bgColor = 'transparent';
  const textColor = theme === 'dark' ? '#facc15' : '#065f46';

  return (
    <View style={[styles.card, { backgroundColor: bgColor }]}>
      <Text style={[styles.text, { color: textColor }]}>Activity 2</Text>
    </View>
  );
};

export default Activity2;

const styles = StyleSheet.create({
  card: {
    width: componentWidth,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
  },
  text: {
    fontWeight: '600',
    fontSize: 16,
  },
});