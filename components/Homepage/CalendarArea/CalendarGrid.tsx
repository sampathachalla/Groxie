import { View, Text, TouchableOpacity } from 'react-native';
import { useThemeContext } from '../../../context/ThemeContext';

const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

interface Props {
  currentMonth: Date;
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
}

export default function CalendarGrid({ currentMonth, selectedDate, onSelectDate }: Props) {
  const { theme } = useThemeContext();
  const today = new Date();

  const bgColor = theme === 'dark' ? '#1f2937' : '#ffffff';
  const textColor = theme === 'dark' ? '#FCD34D' : '#1f2937';
  const selectedBg = theme === 'dark' ? '#FCD34D' : '#0f766e';
  const selectedText = theme === 'dark' ? '#1f2937' : '#ffffff';
  const todayBorder = theme === 'dark' ? '#FCD34D' : '#0f766e';
  const todayBg = theme === 'dark' ? '#374151' : '#e0f2f1'; // subtle bg for today

  const getDaysArray = (month: number, year: number) => {
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const daysArray: (Date | null)[] = [];

    for (let i = 0; i < firstDay; i++) {
      daysArray.push(null);
    }

    for (let day = 1; day <= totalDays; day++) {
      daysArray.push(new Date(year, month, day));
    }

    return daysArray;
  };

  const isSameDate = (d1: Date | null, d2: Date | null) =>
    d1 && d2 &&
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear();

  const monthDays = getDaysArray(currentMonth.getMonth(), currentMonth.getFullYear());

  return (
    <View
      style={{
        backgroundColor: bgColor,
        paddingHorizontal: 12,
        paddingBottom: 16,
        paddingTop: 8,
        borderRadius: 12,
      }}
    >
      {/* Weekday Labels */}
      <View style={{ flexDirection: 'row' }}>
        {days.map((d, i) => (
          <Text
            key={i}
            style={{
              flex: 1,
              textAlign: 'center',
              fontWeight: '600',
              fontSize: 14,
              color: textColor,
              paddingBottom: 6,
            }}
          >
            {d}
          </Text>
        ))}
      </View>

      {/* Calendar Grid */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {monthDays.map((date, idx) => {
          const isSelected = isSameDate(date, selectedDate);
          const isToday = isSameDate(date, today);

          return (
            <View
              key={idx}
              style={{
                width: `${100 / 7}%`,
                aspectRatio: 1,
                padding: 4,
              }}
            >
              <TouchableOpacity
                onPress={() => date && onSelectDate(date)}
                disabled={!date}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 999,
                  backgroundColor: isSelected
                    ? selectedBg
                    : isToday
                    ? todayBg
                    : 'transparent',
                  borderWidth: isToday && !isSelected ? 2 : 0,
                  borderColor: isToday && !isSelected ? todayBorder : 'transparent',
                  opacity: date ? 1 : 0,
                }}
              >
                <Text
                  style={{
                    color: isSelected
                      ? selectedText
                      : isToday
                      ? theme === 'dark'
                        ? '#FCD34D'
                        : '#0f766e'
                      : textColor,
                    fontWeight: '700',
                    fontSize: 16,
                  }}
                >
                  {date ? date.getDate() : ''}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
}