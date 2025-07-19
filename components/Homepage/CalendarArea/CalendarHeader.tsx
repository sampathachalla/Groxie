import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useThemeContext } from '../../../context/ThemeContext';

interface Props {
  currentMonth: Date;
  onChangeMonth: (offset: number) => void;
}

export default function CalendarHeader({ currentMonth, onChangeMonth }: Props) {
  const { theme } = useThemeContext();
  const textColor = theme === 'dark' ? '#FCD34D' : '#1f2937';

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 12,
      }}
    >
      <TouchableOpacity
        onPress={() => onChangeMonth(-1)}
        style={{
          width: 48,
          height: 48,
          borderRadius: 24,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Icon name="chevron-back" size={28} color={textColor} />
      </TouchableOpacity>

      <Text style={{ color: textColor, fontSize: 18, fontWeight: 'bold' }}>
        {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
      </Text>

      <TouchableOpacity
        onPress={() => onChangeMonth(1)}
        style={{
          width: 48,
          height: 48,
          borderRadius: 24,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Icon name="chevron-forward" size={28} color={textColor} />
      </TouchableOpacity>
    </View>
  );
}