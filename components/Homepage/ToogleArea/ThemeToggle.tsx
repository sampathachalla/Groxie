import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useThemeContext } from '../../../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      className="w-10 h-10 rounded-full bg-gray-200 items-center justify-center"
    >
      <Icon
        name={theme === 'dark' ? 'moon' : 'sunny'}
        size={20}
        color="#1e293b"
      />
    </TouchableOpacity>
  );
}