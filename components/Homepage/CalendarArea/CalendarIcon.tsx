import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useThemeContext } from '../../../context/ThemeContext';

interface CalendarIconProps {
  onPress?: () => void;
  isOpen?: boolean; // ✅ Add this line
}

export default function CalendarIcon({ onPress, isOpen = false }: CalendarIconProps) {
  const { theme } = useThemeContext();

  const backgroundColor = theme === 'dark' ? '#374151' : '#E5E7EB';
  const iconColor = theme === 'dark' ? '#FCD34D' : '#1e293b';

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Icon
        name={isOpen ? 'calendar' : 'calendar-outline'} 
        size={22}
        color={iconColor}
      />
    </TouchableOpacity>
  );
}