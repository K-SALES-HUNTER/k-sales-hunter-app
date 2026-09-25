import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import type { ReactNode } from 'react';
import { Alert, Platform, Pressable, StyleSheet, Switch, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Screen } from '@/components/ui/screen';
import { AppText } from '@/components/ui/text';
import { Radius, Spacing } from '@/constants/theme';
import { useHaptics } from '@/hooks/use-haptics';
import { useTheme } from '@/hooks/use-theme';
import { showPcOnly } from '@/lib/pc-only';
import { useAuth } from '@/store/auth';
import { type ThemePreference, useSettings } from '@/store/settings';

const THEME_OPTIONS: { value: ThemePreference; label: string }[] = [
  { value: 'system', label: '시스템' },
  { value: 'light', label: '라이트' },
  { value: 'dark', label: '다크' },
];

/** 설정 — 계정 확인·로그아웃과 앱 환경. 계정/마켓 정보 수정은 PC(MKT-01-01) */
export default function SettingsScreen() {
  const theme = useTheme();
  const haptics = useHaptics();
  const email = useAuth((s) => s.email);
  const logout = useAuth((s) => s.logout);
  const themePref = useSettings((s) => s.theme);
  const setTheme = useSettings((s) => s.setTheme);
  const hapticsEnabled = useSettings((s) => s.hapticsEnabled);
  const setHapticsEnabled = useSettings((s) => s.setHapticsEnabled);

  const confirmLogout = () => {
    // 웹 미리보기엔 Alert 버튼이 없어서 바로 실행
    if (Platform.OS === 'web') return void logout();
    Alert.alert('로그아웃', '로그아웃 하시겠어요?', [
      { text: '취소', style: 'cancel' },
      { text: '로그아웃', style: 'destructive', onPress: () => logout() },
    ]);
  };

  return (
    <Screen>
      <View style={styles.header}>
        <AppText variant="heading03">설정</AppText>
        <AppText variant="body02" tone="secondary">
          계정과 앱 환경을 관리해요
        </AppText>
      </View>

      <Section title="계정">
        <Row label="이메일">
          <AppText variant="body02" tone="secondary" numberOfLines={1} style={styles.value}>
            {email}
          </AppText>
        </Row>
        <Divider />
        <Pressable
          accessibilityRole="button"
          onPress={() => showPcOnly('계정·마켓 정보는 PC에서 관리해주세요')}
          style={({ pressed }) => pressed && { opacity: 0.6 }}
        >
          <Row label="계정·마켓 정보 관리">
            <Ionicons name="desktop-outline" size={18} color={theme.textSecondary} />
          </Row>
        </Pressable>
      </Section>

      <Section title="화면">
        <View style={styles.rowStack}>
          <AppText variant="body01">테마</AppText>
          <View style={[styles.segment, { backgroundColor: theme.surface }]} accessibilityRole="radiogroup">
            {THEME_OPTIONS.map((opt) => {
              const selected = themePref === opt.value;
              return (
                <Pressable
                  key={opt.value}
                  accessibilityRole="radio"
                  accessibilityState={{ selected }}
                  onPress={() => {
                    haptics.selection();
                    setTheme(opt.value);
                  }}
                  style={[styles.segmentItem, selected && { backgroundColor: theme.card, borderColor: theme.border }]}
                >
                  <AppText variant="label02" tone={selected ? 'primary' : 'secondary'}>
                    {opt.label}
                  </AppText>
                </Pressable>
              );
            })}
          </View>
        </View>
        <Divider />
        <Row label="진동 피드백">
          <Switch
            value={hapticsEnabled}
            onValueChange={setHapticsEnabled}
            trackColor={{ true: theme.primary, false: theme.surfaceStrong }}
            thumbColor="#FFFFFF"
            ios_backgroundColor={theme.surfaceStrong}
            accessibilityLabel="진동 피드백"
          />
        </Row>
      </Section>

      <Section title="앱 정보">
        <Row label="버전">
          <AppText variant="body02" tone="secondary">
            {Constants.expoConfig?.version ?? '-'}
          </AppText>
        </Row>
        <Divider />
        <AppText variant="caption01" tone="secondary" style={styles.caption}>
          케세헌 앱은 판매 현황 조회용이에요. 상품 등록·분석 보고서·판매 관리는 PC 웹에서 이용해주세요.
        </AppText>
      </Section>

      <Button title="로그아웃" variant="secondary" onPress={confirmLogout} />
    </Screen>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View style={styles.section}>
      <AppText variant="label02" tone="muted" style={styles.sectionTitle}>
        {title}
      </AppText>
      <Card style={styles.card}>{children}</Card>
    </View>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <View style={styles.row}>
      <AppText variant="body01">{label}</AppText>
      {children}
    </View>
  );
}

function Divider() {
  const theme = useTheme();
  return <View style={[styles.divider, { backgroundColor: theme.border }]} />;
}

const styles = StyleSheet.create({
  header: { paddingTop: Spacing.sm },
  section: { gap: Spacing.xs },
  sectionTitle: { paddingHorizontal: Spacing.xxs },
  card: { paddingVertical: Spacing.xxs },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.md,
    minHeight: 48,
  },
  value: { flexShrink: 1 },
  rowStack: { gap: Spacing.sm, paddingVertical: Spacing.sm },
  segment: { flexDirection: 'row', padding: 3, borderRadius: Radius.lg },
  segmentItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.xs,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  divider: { height: 1 },
  caption: { paddingVertical: Spacing.sm },
});
