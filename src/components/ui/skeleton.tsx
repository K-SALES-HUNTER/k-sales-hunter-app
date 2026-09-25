import { useEffect } from 'react';
import { type DimensionValue, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/**
 * 로딩 스켈레톤 (명세 DSH-01-01 — 응답 전 카드 자리 유지).
 * 웹은 gradient shimmer, RN은 그라데이션 이동 대신 bgLight ↔ bgGray 사이를 오가는 펄스로 단순화.
 */
export function Skeleton({ height, width = '100%' }: { height: number; width?: DimensionValue }) {
  const theme = useTheme();
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.set(withRepeat(withTiming(1, { duration: 900, easing: Easing.inOut(Easing.ease) }), -1, true));
  }, [progress]);

  const animated = useAnimatedStyle(() => ({ opacity: 0.55 + progress.get() * 0.45 }));

  return (
    <Animated.View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={[styles.base, { height, width, backgroundColor: theme.surfaceStrong }, animated]}
    />
  );
}

const styles = StyleSheet.create({
  base: { borderRadius: Radius.md },
});
