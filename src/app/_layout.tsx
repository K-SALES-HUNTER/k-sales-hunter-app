import { useFonts } from 'expo-font';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';

import { toastConfig } from '@/components/ui/toast';
import { FontFamily } from '@/constants/theme';
import { useHydrated } from '@/hooks/use-hydrated';
import { useTheme } from '@/hooks/use-theme';
import { useAuth } from '@/store/auth';

// 저장소 복원·폰트 로딩이 끝날 때까지 스플래시 유지
SplashScreen.preventAutoHideAsync().catch(() => {});
SplashScreen.setOptions({ duration: 300, fade: true });

export default function RootLayout() {
  const theme = useTheme();
  const hydrated = useHydrated();
  const isLoggedIn = useAuth((s) => !!s.email);
  // 네이티브는 expo-font 플러그인으로 이미 임베드돼 즉시 resolve, 웹은 여기서 실제 로딩
  const [fontsLoaded] = useFonts({
    [FontFamily.regular]: require('@/assets/fonts/Pretendard-Regular.otf'),
    [FontFamily.medium]: require('@/assets/fonts/Pretendard-Medium.otf'),
    [FontFamily.semibold]: require('@/assets/fonts/Pretendard-SemiBold.otf'),
    [FontFamily.bold]: require('@/assets/fonts/Pretendard-Bold.otf'),
  });

  const ready = hydrated && fontsLoaded;

  useEffect(() => {
    if (ready) SplashScreen.hideAsync().catch(() => {});
  }, [ready]);

  if (!ready) return null;

  const base = theme.isDark ? DarkTheme : DefaultTheme;
  const navTheme = {
    ...base,
    colors: {
      ...base.colors,
      background: theme.background,
      card: theme.card,
      primary: theme.primary,
      text: theme.textStrong,
      border: theme.border,
    },
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={navTheme}>
        <StatusBar style={theme.isDark ? 'light' : 'dark'} animated />
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: theme.background } }}>
          {/* guard가 false가 되면 해당 화면이 히스토리에서 빠진다 → 로그아웃 시 자동으로 login */}
          <Stack.Protected guard={isLoggedIn}>
            <Stack.Screen name="(tabs)" />
          </Stack.Protected>
          <Stack.Protected guard={!isLoggedIn}>
            <Stack.Screen name="login" options={{ animation: 'fade' }} />
          </Stack.Protected>
        </Stack>
        <Toast config={toastConfig} />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
