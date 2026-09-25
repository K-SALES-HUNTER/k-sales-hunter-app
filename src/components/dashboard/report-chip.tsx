import { Pressable, StyleSheet } from 'react-native';

import { AppText } from '@/components/ui/text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type Props = {
  /** total: 전체 분석 보고서(네이비) / country: 국가 보고서(라이트) */
  variant: 'total' | 'country';
  label: string;
  onPress: () => void;
};

/** 보고서 이동 (Figma 102:2627) — 웹과 같은 모양. 앱에선 눌렀을 때 PC 안내 */
export function ReportChip({ variant, label, onPress }: Props) {
  const theme = useTheme();
  const total = variant === 'total';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${label} 분석 보고서`}
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        { backgroundColor: total ? theme.primary : theme.primaryLight, opacity: pressed ? 0.8 : 1 },
      ]}
    >
      <AppText variant="label02" tone={total ? 'onPrimary' : 'default'} style={total && theme.isDark && styles.dark}>
        {label} →
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    borderRadius: Radius.xl,
  },
  // 다크 primary(#7C9BE6)는 밝아서 흰 글씨 대비가 낮다 → 배경색으로 글씨
  dark: { color: '#0E1420' },
});
