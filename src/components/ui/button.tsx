import { LinearGradient } from 'expo-linear-gradient';
import type { ReactNode } from 'react';
import { ActivityIndicator, Pressable, type PressableProps, StyleSheet, View, type ViewStyle } from 'react-native';

import { AppText } from '@/components/ui/text';
import { BrandGradient, Radius, Spacing } from '@/constants/theme';
import { useHaptics } from '@/hooks/use-haptics';
import { useTheme } from '@/hooks/use-theme';

type Props = Omit<PressableProps, 'style' | 'children'> & {
  title: string;
  /** primary: 그라데이션 주 동작(화면당 1개) / secondary: 보조 / text: 배경 없는 텍스트 */
  variant?: 'primary' | 'secondary' | 'text';
  icon?: ReactNode;
  loading?: boolean;
  style?: ViewStyle;
};

/**
 * 웹 Button(Figma 102:2651)의 모바일판.
 * 웹의 StateLayer(::after 오버레이)를 절대배치 View 하나로 옮겨 눌림/비활성을 표현한다.
 */
export function Button({ title, variant = 'primary', icon, loading, disabled, style, onPress, ...rest }: Props) {
  const theme = useTheme();
  const haptics = useHaptics();
  const isDisabled = !!disabled || !!loading;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: !!loading }}
      disabled={isDisabled}
      onPress={(e) => {
        haptics.light();
        onPress?.(e);
      }}
      style={[
        styles.base,
        variant === 'secondary' && { backgroundColor: theme.primaryLight },
        variant === 'text' && styles.text,
        style,
      ]}
      {...rest}
    >
      {({ pressed }) => (
        <>
          {variant === 'primary' && (
            <LinearGradient
              colors={BrandGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={StyleSheet.absoluteFill}
            />
          )}
          {loading ? (
            <ActivityIndicator color={variant === 'primary' ? theme.textOnPrimary : theme.text} />
          ) : (
            <View style={styles.content}>
              {icon}
              <AppText
                variant="label01"
                tone={variant === 'primary' ? 'onPrimary' : isDisabled ? 'secondary' : 'default'}
              >
                {title}
              </AppText>
            </View>
          )}
          {/* StateLayer — 눌림: 검정 12% / 비활성: 흰색 60% (웹과 동일 값) */}
          <View
            style={[
              StyleSheet.absoluteFill,
              styles.none,
              pressed && { backgroundColor: 'rgba(0,0,0,0.12)' },
              isDisabled && { backgroundColor: theme.isDark ? 'rgba(14,20,32,0.6)' : 'rgba(255,255,255,0.6)' },
            ]}
          />
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 48,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.md,
    overflow: 'hidden',
  },
  text: { backgroundColor: 'transparent', height: 40 },
  none: { pointerEvents: 'none' },
  content: { flexDirection: 'row', alignItems: 'center', gap: 10 },
});
