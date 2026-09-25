import { useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, type TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { login as loginApi } from '@/apis/auth';
import { Button } from '@/components/ui/button';
import { InputSet } from '@/components/ui/input-set';
import { Logo } from '@/components/ui/logo';
import { AppText } from '@/components/ui/text';
import { Spacing } from '@/constants/theme';
import { useHaptics } from '@/hooks/use-haptics';
import { useTheme } from '@/hooks/use-theme';
import { showPcOnly } from '@/lib/pc-only';
import { useAuth } from '@/store/auth';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** LOGIN (Figma 265:8260 · 명세 LOG-01-01) */
export default function LoginScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const haptics = useHaptics();
  const saveLogin = useAuth((s) => s.login);
  const passwordRef = useRef<TextInput>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);

  // 명세: 두 필드 모두 1자 이상일 때만 로그인 버튼 활성
  const canSubmit = email.trim() !== '' && password.trim() !== '';

  const submit = async () => {
    if (!canSubmit || loading) return;
    if (!EMAIL_REGEX.test(email.trim())) {
      haptics.warning();
      setEmailError('올바른 이메일 형식이 아닙니다.');
      return;
    }
    setLoading(true);
    try {
      const { accessToken } = await loginApi(email.trim(), password);
      haptics.success();
      // guard가 바뀌면서 (tabs)로 자동 전환된다
      await saveLogin(email.trim(), accessToken);
    } catch {
      // 명세: 어느 쪽이 틀렸는지 구분하지 않음 + 비밀번호 비우고 포커스
      haptics.warning();
      setFormError('이메일 또는 비밀번호가 올바르지 않습니다.');
      setPassword('');
      passwordRef.current?.focus();
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.fill, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + Spacing.xl, paddingBottom: insets.bottom + Spacing.lg },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.head}>
          <Logo size="lg" />
          <AppText variant="body02" tone="secondary">
            판매 현황을 한눈에 확인하세요
          </AppText>
        </View>

        <View style={styles.fields}>
          <InputSet
            label="이메일"
            placeholder="이메일을 입력해주세요."
            value={email}
            error={emailError}
            keyboardType="email-address"
            textContentType="username"
            autoComplete="email"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current?.focus()}
            onChangeText={(v) => {
              setEmail(v);
              // 명세: 다시 입력을 시작하면 에러 즉시 해제
              if (emailError) setEmailError('');
              if (formError) setFormError('');
            }}
          />
          <InputSet
            ref={passwordRef}
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            value={password}
            error={formError}
            password
            textContentType="password"
            autoComplete="current-password"
            returnKeyType="go"
            onSubmitEditing={submit}
            onChangeText={(v) => {
              setPassword(v);
              if (formError) setFormError('');
            }}
          />
        </View>

        <View style={styles.buttons}>
          <Button title="로그인" disabled={!canSubmit} loading={loading} onPress={submit} />
          <Button
            title="회원가입"
            variant="secondary"
            onPress={() => showPcOnly('회원가입은 PC에서 진행해주세요')}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    gap: Spacing.xl,
    paddingHorizontal: Spacing.lg,
  },
  head: { alignItems: 'center', gap: Spacing.md },
  fields: { gap: Spacing.md },
  buttons: { gap: Spacing.md },
});
