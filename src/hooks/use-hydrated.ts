import { useSyncExternalStore } from 'react';

import { useAuth } from '@/store/auth';
import { useSettings } from '@/store/settings';

const subscribe = (onChange: () => void) => {
  const offAuth = useAuth.persist.onFinishHydration(onChange);
  const offSettings = useSettings.persist.onFinishHydration(onChange);
  return () => {
    offAuth();
    offSettings();
  };
};

const getSnapshot = () => useAuth.persist.hasHydrated() && useSettings.persist.hasHydrated();

/**
 * 인증·설정 스토어가 kv-store에서 모두 복원됐는지.
 * 복원 전에 그리면 로그인 화면·라이트 테마가 잠깐 보였다가 바뀌므로 그때까지 스플래시를 유지한다.
 */
export function useHydrated() {
  return useSyncExternalStore(subscribe, getSnapshot);
}
