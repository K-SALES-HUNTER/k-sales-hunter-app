import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeOut } from 'react-native-reanimated';

import { AppText } from '@/components/ui/text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/**
 * 마켓 미연동 안내 — 웹의 환영 모달(WelcomeModal)을 대신한다.
 * 마켓 정보 등록은 PC 기능이라 모달로 막기보다 닫을 수 있는 배너로 알린다.
 */
export function MarketBanner({ onClose }: { onClose: () => void }) {
  const theme = useTheme();

  return (
    <Animated.View exiting={FadeOut.duration(180)}>
      <View style={[styles.banner, { backgroundColor: theme.primaryLight }]}>
        <Ionicons name="storefront-outline" size={22} color={theme.primary} />
        <View style={styles.texts}>
          <AppText variant="label02">환영합니다! 아직 연동된 마켓이 없어요</AppText>
          <AppText variant="caption01" tone="secondary">
            PC 웹의 마켓/설정에서 마켓 정보를 등록하고 서비스를 이용해 보세요.
          </AppText>
        </View>
        <Pressable accessibilityRole="button" accessibilityLabel="안내 닫기" hitSlop={10} onPress={onClose}>
          <Ionicons name="close" size={20} color={theme.textSecondary} />
        </Pressable>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    padding: Spacing.md,
    borderRadius: Radius.xl,
  },
  texts: { flex: 1, gap: 2 },
});
