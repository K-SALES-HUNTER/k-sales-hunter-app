import { useColorScheme } from 'react-native';

import { Colors, type Theme } from '@/constants/theme';
import { useSettings } from '@/store/settings';

/** 설정(시스템/라이트/다크)을 반영한 현재 테마 */
export function useTheme(): Theme & { isDark: boolean } {
  const system = useColorScheme();
  const preference = useSettings((s) => s.theme);
  const scheme = preference === 'system' ? (system ?? 'light') : preference;
  const isDark = scheme === 'dark';
  return { ...Colors[isDark ? 'dark' : 'light'], isDark };
}
