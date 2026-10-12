import { ScrollView, type ScrollViewProps, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/**
 * 화면 공통 래퍼: 배경색 + safe area + 기본 패딩(좌우 16, 웹 콘텐츠 패딩과 동일).
 * 상단 inset은 스크롤 밖 View가 차지해서 스크롤한 내용이 상태바 아래로 비치지 않게 한다.
 */
export function Screen({ style, contentContainerStyle, children, ...rest }: ScrollViewProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.fill, { backgroundColor: theme.background, paddingTop: insets.top }]}>
      <ScrollView
        style={[styles.fill, style]}
        contentContainerStyle={[
          styles.content,
          { paddingTop: Spacing.xs, paddingBottom: Spacing.xl },
          contentContainerStyle,
        ]}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="never"
        {...rest}
      >
        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  content: { paddingHorizontal: Spacing.md, gap: 20 },
});
