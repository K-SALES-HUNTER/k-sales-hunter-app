import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { AppText } from '@/components/ui/text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/** 카드 단위 오류 상태 + 재시도 (명세 DSH-01-01 — 실패한 영역만 오류, 나머지는 유지) */
export function ErrorBox({ message, onRetry }: { message: string; onRetry: () => void }) {
  const theme = useTheme();
  return (
    <View style={[styles.box, { borderColor: theme.border }]}>
      <Ionicons name="alert-circle-outline" size={24} color={theme.error} />
      <AppText variant="body02" style={styles.text}>
        {message}
      </AppText>
      <Button title="다시 시도" variant="secondary" onPress={onRetry} style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    alignItems: 'center',
    gap: Spacing.xs,
    padding: Spacing.lg,
    borderWidth: 1,
    borderRadius: Radius.md,
  },
  text: { textAlign: 'center' },
  button: { marginTop: Spacing.xs, height: 40, minWidth: 120 },
});
