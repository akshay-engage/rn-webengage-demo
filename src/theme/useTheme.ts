import {useColorScheme} from 'react-native';

export interface Theme {
  isDark: boolean;
  background: string;
  card: string;
  text: string;
  textMuted: string;
  border: string;
  primary: string;
  primaryText: string;
  accent: string;
  danger: string;
}

const light: Theme = {
  isDark: false,
  background: '#F5F6F8',
  card: '#FFFFFF',
  text: '#1A1A1A',
  textMuted: '#6B7280',
  border: '#E5E7EB',
  primary: '#2563EB',
  primaryText: '#FFFFFF',
  accent: '#F59E0B',
  danger: '#DC2626',
};

const dark: Theme = {
  isDark: true,
  background: '#0B0F14',
  card: '#161B22',
  text: '#F3F4F6',
  textMuted: '#9CA3AF',
  border: '#2A2F36',
  primary: '#3B82F6',
  primaryText: '#FFFFFF',
  accent: '#FBBF24',
  danger: '#F87171',
};

/** Returns a palette that follows the OS light/dark setting. */
export function useTheme(): Theme {
  const scheme = useColorScheme();
  return scheme === 'dark' ? dark : light;
}
