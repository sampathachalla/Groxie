import React from 'react';
import { View, StyleSheet } from 'react-native';

type Props = {
  activeIndex: number;
};

export default function IndicatorSection({ activeIndex }: Props) {
  return (
    <View style={styles.container}>
      {[0, 1, 2].map((index) => (
        <View
          key={index}
          style={[
            styles.dot,
            activeIndex === index ? styles.activeDot : styles.inactiveDot,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 6,
  },
  activeDot: {
    backgroundColor: '#0f766e',
  },
  inactiveDot: {
    backgroundColor: '#94a3b8',
  },
});