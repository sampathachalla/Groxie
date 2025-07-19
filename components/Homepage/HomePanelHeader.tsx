import { View, StyleSheet } from 'react-native';
import ProfileIcon from './ProfileArea/ProfileIcon';
import ThemeToggle from './ToogleArea/ThemeToggle';
import CalendarIcon from './CalendarArea/CalendarIcon';
import { useThemeContext } from '../../context/ThemeContext';

interface Props {
  onCalendarPress: () => void;
  calendarOpen: boolean; 
}

export default function HomePanelHeader({ onCalendarPress, calendarOpen }: Props) {
  const { theme } = useThemeContext();
  const backgroundColor = theme === 'dark' ? '#18181b' : '#ffffff';

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* Left: Profile Icon */}
      <ProfileIcon />

      {/* Right: Theme Toggle + Calendar Icon */}
      <View style={styles.rightRow}>
        <ThemeToggle />
        <View style={styles.calendarWrapper}>
          <CalendarIcon onPress={onCalendarPress} isOpen={calendarOpen} /> 
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  rightRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calendarWrapper: {
    marginLeft: 24,
  },
});