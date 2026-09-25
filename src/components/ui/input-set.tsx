import { Ionicons } from '@expo/vector-icons';
import { type Ref, useState } from 'react';
import { Pressable, StyleSheet, TextInput, type TextInputProps, View } from 'react-native';

import { AppText } from '@/components/ui/text';
import { FontFamily, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type Props = TextInputProps & {
  label: string;
  /** 유효성 검증 실패 문구. 있으면 테두리 경고색 + 하단 문구 */
  error?: string;
  /** 비밀번호 표시/숨김 토글 (명세 LOG-01-01 #3) */
  password?: boolean;
  ref?: Ref<TextInput>;
};

/** InputSet (Figma 168:164) — 라벨 + 입력 + 에러 슬롯 */
export function InputSet({ label, error, password, style, ref, ...rest }: Props) {
  const theme = useTheme();
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(true);

  const borderColor = error ? theme.error : focused ? theme.primary : theme.border;

  return (
    <View style={styles.field}>
      <AppText variant="label02">{label}</AppText>
      <View style={[styles.box, { borderColor, backgroundColor: theme.card }]}>
        <TextInput
          ref={ref}
          placeholderTextColor={theme.textSecondary}
          selectionColor={theme.primary}
          secureTextEntry={password && hidden}
          autoCapitalize="none"
          autoCorrect={false}
          accessibilityLabel={label}
          style={[styles.input, { color: theme.text }, style]}
          {...rest}
          onFocus={(e) => {
            setFocused(true);
            rest.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            rest.onBlur?.(e);
          }}
        />
        {password && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={hidden ? '비밀번호 표시' : '비밀번호 숨기기'}
            hitSlop={10}
            onPress={() => setHidden((v) => !v)}
          >
            <Ionicons name={hidden ? 'eye-off-outline' : 'eye-outline'} size={20} color={theme.textSecondary} />
          </Pressable>
        )}
      </View>
      {!!error && (
        <AppText variant="caption01" tone="error" accessibilityRole="alert">
          {error}
        </AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  field: { gap: Spacing.xxs, width: '100%' },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    height: 48,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.lg,
    borderWidth: 1,
  },
  // 웹 body02(14)보다 한 단계 키움 — 모바일 입력 가독성
  input: { flex: 1, height: '100%', fontFamily: FontFamily.regular, fontSize: 16 },
});
