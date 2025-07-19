import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { useThemeContext } from '../../../context/ThemeContext';
import ActivityHeader from './ActivityHeader';
import Activity1 from './Activity1';
import Activity2 from './Activity2';
import Activity3 from './Activity3';
import IndicatorSection from './IndicatorSection';

const { width, height } = Dimensions.get('window');

// This is the horizontal padding from the parent ScrollView in HomePanel.tsx
const PARENT_HORIZONTAL_PADDING = 24;
// Calculate the actual width available for the component.
const componentWidth = width - PARENT_HORIZONTAL_PADDING * 2;

type Props = {
  selectedDate: Date | null;
};

const ActivitySection = ({ selectedDate }: Props) => {
  const { theme } = useThemeContext();
  const backgroundColor = theme === 'dark' ? '#27272a' : '#f5f5dc';
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const activities = [<Activity1 />, <Activity2 />, <Activity3 />];

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    // Use the correct componentWidth to calculate the index
    const index = Math.round(scrollX / componentWidth);
    setActiveIndex(index);
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* Top: Header */}
      <View style={styles.headerWrapper}>
        <ActivityHeader selectedDate={selectedDate} />
      </View>

      {/* Middle: Carousel */}
      <View style={styles.carouselWrapper}>
        <FlatList
          ref={flatListRef}
          data={activities}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item }) => (
            // Apply the calculated width to each carousel item
            <View style={[styles.carouselItem, { width: componentWidth }]}>
              {item}
            </View>
          )}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        />
      </View>

      {/* Bottom: Indicator */}
      <View style={styles.indicatorWrapper}>
        <IndicatorSection activeIndex={activeIndex} />
      </View>
    </View>
  );
};

export default ActivitySection;

const styles = StyleSheet.create({
  container: {
    height: height * 0.3,
    borderRadius: 16, // Use a fixed value for consistency
    marginVertical: height * 0.015,
    overflow: 'hidden',
  },
  headerWrapper: {
    flex: 1,
    paddingHorizontal: 16, // Internal padding
    justifyContent: 'flex-start',
    paddingTop: 8,
  },
  carouselWrapper: {
    flex: 4,
  },
  indicatorWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselItem: {
    // The width is now set dynamically in renderItem
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
});