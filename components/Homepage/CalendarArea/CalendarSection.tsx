import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useThemeContext } from '../../../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';

const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

interface Props {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
}

export default function CalendarSection({ selectedDate, onSelectDate }: Props) {
  const { theme } = useThemeContext();
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const startMonth = new Date(today.getFullYear(), today.getMonth() - 2, 1);

  const bgColor = theme === 'dark' ? '#1f2937' : '#ffffff';
  const textColor = theme === 'dark' ? '#FCD34D' : '#1f2937';
  const selectedBg = theme === 'dark' ? '#FCD34D' : '#0f766e';
  const selectedText = theme === 'dark' ? '#1f2937' : '#ffffff';

  const getDaysInMonth = (month: number, year: number) => {
    const lastDay = new Date(year, month + 1, 0);
    return Array.from({ length: lastDay.getDate() }, (_, i) => new Date(year, month, i + 1));
  };

  const isSameDay = (d1: Date, d2: Date) =>
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear();

  const canGoPrev = currentMonth > startMonth;
  const canGoNext =
    currentMonth.getMonth() < today.getMonth() || currentMonth.getFullYear() < today.getFullYear();

  return (
    <View style={{ paddingHorizontal: 8, paddingTop: 12, marginTop: 8 }}>
      {/* Month Header */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <TouchableOpacity
          disabled={!canGoPrev}
          onPress={() =>
            setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
          }
          style={{ padding: 12 }}
        >
          <Icon name="chevron-back" size={28} color={canGoPrev ? textColor : '#9ca3af'} />
        </TouchableOpacity>

        <Text style={{ color: textColor, fontSize: 20, fontWeight: 'bold' }}>
          {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </Text>

        <TouchableOpacity
          disabled={!canGoNext}
          onPress={() =>
            setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
          }
          style={{ padding: 12 }}
        >
          <Icon name="chevron-forward" size={28} color={canGoNext ? textColor : '#9ca3af'} />
        </TouchableOpacity>
      </View>

      {/* Weekday Labels */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
        {days.map((d, i) => (
          <Text
            key={i}
            style={{
              color: textColor,
              width: 36,
              textAlign: 'center',
              fontWeight: '600',
              fontSize: 14,
            }}
          >
            {d}
          </Text>
        ))}
      </View>

      {/* Calendar Grid */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', rowGap: 12, columnGap: 12, justifyContent: 'center' }}>
        {getDaysInMonth(currentMonth.getMonth(), currentMonth.getFullYear()).map((dateObj) => {
          const isSelected = selectedDate && isSameDay(selectedDate, dateObj);
          const isToday = isSameDay(today, dateObj);
          const isFuture = dateObj > today;

          return (
            <TouchableOpacity
              key={dateObj.toDateString()}
              disabled={isFuture}
              onPress={() => onSelectDate(dateObj)}
              style={{
                width: 36,
                height: 44,
                borderRadius: 24,
                backgroundColor: isSelected ? selectedBg : 'transparent',
                borderWidth: isToday && !isSelected ? 2 : 0,
                borderColor: isToday && !isSelected ? selectedBg : 'transparent',
                justifyContent: 'center',
                alignItems: 'center',
                opacity: isFuture ? 0.4 : 1,
              }}
            >
              <Text
                style={{
                  color: isSelected ? selectedText : textColor,
                  fontWeight: '600',
                  fontSize: 16,
                }}
              >
                {dateObj.getDate()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}