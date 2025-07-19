import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useThemeContext } from '../../../context/ThemeContext';

const { width } = Dimensions.get('window');

type Props = {
  selectedDate: Date | null;
};

const ActivityHeader = ({ selectedDate }: Props) => {
  const { theme } = useThemeContext();

  const formattedDate = selectedDate
    ? `${selectedDate.getMonth() + 1}/${selectedDate.getDate()}/${selectedDate.getFullYear()}`
    : '';

  const textColor = theme === 'dark' ? '#facc15' : '#065f46';

  return (
    <View style={styles.container}>
      <Text style={[styles.dateText, { color: textColor }]}>
        {formattedDate}
      </Text>
    </View>
  );
};

export default ActivityHeader;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'flex-end',
    paddingTop: 2
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
  },
});