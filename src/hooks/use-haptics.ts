import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

import { useSettings } from '@/store/settings';

/** 설정에서 끈 경우 no-op. 웹에서는 항상 no-op. */
export function useHaptics() {
  const enabled = useSettings((s) => s.hapticsEnabled) && Platform.OS !== 'web';

  return {
    light: () => enabled && Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
    medium: () => enabled && Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium),
    selection: () => enabled && Haptics.selectionAsync(),
    success: () => enabled && Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success),
    warning: () => enabled && Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning),
  };
}
