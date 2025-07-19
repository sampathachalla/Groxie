// utils/colors.ts
export const getThemeColors = (theme: 'light' | 'dark') => ({
  // Icons
  iconPrimary: theme === 'dark' ? '#F5F5F5' : '#757575',
  iconSecondary: theme === 'dark' ? '#B0BEC5' : '#757575',
  
  // Status bar
  statusBarStyle: theme === 'dark' ? 'light' : 'dark' as 'light' | 'dark',
  statusBarBackground: theme === 'dark' ? '#181818' : '#FFFFFF',
  
  // Surfaces
  background: theme === 'dark' ? '#181818' : '#FFFFFF',
  card: theme === 'dark' ? '#1E1E1E' : '#FFFFFF',
  
  // Text
  textPrimary: theme === 'dark' ? '#F5F5F5' : '#1E1E1E',
  textSecondary: theme === 'dark' ? '#B0BEC5' : '#757575',
  
  // Brand colors (these could remain the same or have theme variants)
  primary: theme === 'dark' ? '#00C853' : '#43A047',
  secondary: theme === 'dark' ? '#FFAB40' : '#FB8C00',
});

export type ThemeColors = ReturnType<typeof getThemeColors>;
