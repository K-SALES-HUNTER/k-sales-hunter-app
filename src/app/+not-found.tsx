import { Link, Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/** 잘못된 딥링크로 들어와도 앱이 죽지 않게 */
export default function NotFound() {
  const theme = useTheme();
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <AppText variant="heading03">페이지를 찾을 수 없어요</AppText>
        <Link href="/" replace>
          <AppText variant="label01" tone="primary">
            대시보드로 이동
          </AppText>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: Spacing.md },
});
