import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import type { ToastConfig } from 'react-native-toast-message';

import { AppText } from '@/components/ui/text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

function InfoToast({ text1, text2 }: { text1?: string; text2?: string }) {
  const theme = useTheme();
  return (
    <View style={[styles.toast, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <View style={[styles.icon, { backgroundColor: theme.primaryLight }]}>
        <Ionicons name="desktop-outline" size={18} color={theme.primary} />
      </View>
      <View style={styles.texts}>
        {!!text1 && <AppText variant="label02">{text1}</AppText>}
        {!!text2 && (
          <AppText variant="caption01" tone="secondary">
            {text2}
          </AppText>
        )}
      </View>
    </View>
  );
}

/** react-native-toast-message 기본 UI 대신 앱 토큰으로 그린 토스트. 루트 _layout 최하단 <Toast config> 에 연결 */
export const toastConfig: ToastConfig = {
  info: ({ text1, text2 }) => <InfoToast text1={text1} text2={text2} />,
};

const styles = StyleSheet.create({
  toast: {
    width: '92%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    padding: Spacing.sm,
    borderRadius: Radius.xl,
    borderWidth: 1,
    boxShadow: '0 6px 16px rgba(15, 39, 66, 0.12)',
  },
  icon: { width: 36, height: 36, borderRadius: Radius.full, alignItems: 'center', justifyContent: 'center' },
  texts: { flex: 1, gap: 2 },
});
