import { ScrollView, type ScrollViewProps, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/** 화면 공통 래퍼: 배경색 + safe area + 기본 패딩(좌우 16, 웹 콘텐츠 패딩과 동일) */
export function Screen({ style, contentContainerStyle, children, ...rest }: ScrollViewProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={[styles.fill, { backgroundColor: theme.background }, style]}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + Spacing.xs, paddingBottom: Spacing.xl },
        contentContainerStyle,
      ]}
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="never"
      {...rest}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  content: { paddingHorizontal: Spacing.md, gap: 20 },
});
