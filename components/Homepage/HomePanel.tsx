import {
  ScrollView,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
  View,
  Easing,
} from 'react-native';
import { useRef, useState } from 'react';
import HomePanelHeader from './HomePanelHeader';
import CalendarSection from './CalendarArea/CalendarSection';
import ActivitySection from './ActivityArea/ActivitySection';
import { useThemeContext } from '../../context/ThemeContext';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const HIDDEN_SECTION_HEIGHT_CONST = SCREEN_HEIGHT * 0.3;

export default function HomePanel({ user }: { user: { id: string; username: string } }) {
  const { theme } = useThemeContext();
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [calendarContentHeight, setCalendarContentHeight] = useState(0);
  const [isScrollAtTop, setIsScrollAtTop] = useState(true);

  const animatedTranslateY = useRef(new Animated.Value(0)).current;
  const calendarHeight = useRef(new Animated.Value(0)).current;
  const contentGroupTranslateY = useRef(new Animated.Value(0)).current;
  const isOpen = useRef(false);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) =>
        isScrollAtTop && Math.abs(gesture.dy) > 5,

      onPanResponderMove: (_, gesture) => {
        let translate = gesture.dy + (isOpen.current ? -HIDDEN_SECTION_HEIGHT_CONST : 0);
        const clamped = Math.max(-HIDDEN_SECTION_HEIGHT_CONST, Math.min(0, translate));
        animatedTranslateY.setValue(clamped);
      },

      onPanResponderRelease: (_, gesture) => {
        const threshold = HIDDEN_SECTION_HEIGHT_CONST / 2;
        if (gesture.dy < -threshold || gesture.vy < -0.5) {
          Animated.spring(animatedTranslateY, {
            toValue: -HIDDEN_SECTION_HEIGHT_CONST,
            useNativeDriver: true,
          }).start(() => (isOpen.current = true));
        } else if (gesture.dy > threshold || gesture.vy > 0.5) {
          Animated.spring(animatedTranslateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start(() => (isOpen.current = false));
        } else {
          Animated.spring(animatedTranslateY, {
            toValue: isOpen.current ? -HIDDEN_SECTION_HEIGHT_CONST : 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const backgroundColor = theme === 'dark' ? '#18181b' : '#ffffff';

  const handleCalendarToggle = () => {
    const newVal = !showCalendar;
    setShowCalendar(newVal);

    Animated.parallel([
      Animated.timing(calendarHeight, {
        toValue: newVal ? (calendarContentHeight || 400) : 0,
        duration: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }),
      Animated.timing(contentGroupTranslateY, {
        toValue: newVal ? 20 : 0,
        duration: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.slidingPanel,
        {
          transform: [
            {
              translateY: Animated.add(
                animatedTranslateY,
                new Animated.Value(HIDDEN_SECTION_HEIGHT_CONST)
              ),
            },
          ],
          backgroundColor,
        },
      ]}
    >
      <HomePanelHeader
        onCalendarPress={handleCalendarToggle}
        calendarOpen={showCalendar}
      />

      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        decelerationRate="normal"
        onScroll={({ nativeEvent }) => {
          setIsScrollAtTop(nativeEvent.contentOffset.y <= 0);
        }}
        scrollEventThrottle={16}
      >
        <View style={styles.innerPadding}>
          {showCalendar && calendarContentHeight === 0 && (
            <View
              style={{ position: 'absolute', opacity: 0, zIndex: -1 }}
              onLayout={(event) => {
                const { height } = event.nativeEvent.layout;
                setCalendarContentHeight(height);
              }}
            >
              <CalendarSection
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
              />
            </View>
          )}

          <Animated.View style={{ height: calendarHeight, overflow: 'hidden' }}>
            {calendarContentHeight > 0 && showCalendar && (
              <CalendarSection
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
              />
            )}
          </Animated.View>

          <Animated.View
            style={{
              transform: [{ translateY: contentGroupTranslateY }],
              marginTop: 12,
            }}
          >
            <ActivitySection selectedDate={selectedDate} />
          </Animated.View>
        </View>
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  slidingPanel: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
    zIndex: 1,
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  innerPadding: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});