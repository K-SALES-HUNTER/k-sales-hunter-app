import { StyleSheet, Text, type TextProps } from 'react-native';

import { FontFamily } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type Variant =
  | 'heading01'
  | 'heading02'
  | 'heading03'
  | 'label01'
  | 'label02'
  | 'body01'
  | 'body02'
  | 'caption01'
  | 'captionStrong'
  | 'tableHeader';

type Tone = 'default' | 'strong' | 'secondary' | 'muted' | 'primary' | 'error' | 'onPrimary';

export type AppTextProps = TextProps & { variant?: Variant; tone?: Tone };

/**
 * 앱 전역 타이포그래피 — 웹 theme.typography 프리셋 이름을 그대로 쓴다.
 * 정적 Pretendard 웨이트라 fontWeight 대신 fontFamily로 굵기를 고른다(Android 호환).
 * RN은 color가 상속되지 않으므로 tone으로 매번 색을 정한다.
 */
export function AppText({ variant = 'body01', tone = 'default', style, ...rest }: AppTextProps) {
  const theme = useTheme();
  const color = {
    default: theme.text,
    strong: theme.textStrong,
    secondary: theme.textSecondary,
    muted: theme.textMuted,
    primary: theme.primary,
    error: theme.error,
    onPrimary: theme.textOnPrimary,
  }[tone];

  return <Text style={[styles[variant], { color }, style]} {...rest} />;
}

/** 웹 theme.ts typography 와 1:1 (px → dp) */
const styles = StyleSheet.create({
  heading01: { fontFamily: FontFamily.bold, fontSize: 32, lineHeight: 42, letterSpacing: -0.4 },
  heading02: { fontFamily: FontFamily.bold, fontSize: 28, lineHeight: 38, letterSpacing: -0.3 },
  heading03: { fontFamily: FontFamily.bold, fontSize: 24, lineHeight: 34, letterSpacing: -0.2 },
  label01: { fontFamily: FontFamily.bold, fontSize: 16, lineHeight: 26, letterSpacing: -0.1 },
  label02: { fontFamily: FontFamily.bold, fontSize: 14, lineHeight: 20 },
  body01: { fontFamily: FontFamily.regular, fontSize: 16, lineHeight: 26 },
  body02: { fontFamily: FontFamily.regular, fontSize: 14, lineHeight: 22 },
  caption01: { fontFamily: FontFamily.regular, fontSize: 12, lineHeight: 16 },
  captionStrong: { fontFamily: FontFamily.medium, fontSize: 12, lineHeight: 16 },
  tableHeader: { fontFamily: FontFamily.semibold, fontSize: 13, lineHeight: 18 },
});
