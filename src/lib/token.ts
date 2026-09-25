import * as SecureStore from 'expo-secure-store';

/**
 * 액세스 토큰 저장소 (iOS Keychain / Android Keystore).
 * 토큰은 zustand persist(kv-store)에 넣지 않는다 — 평문 SQLite라서.
 * 웹 미리보기는 token.web.ts 가 대신 사용된다.
 */
const KEY = 'ksh-access-token';

export const tokenStorage = {
  get: () => SecureStore.getItemAsync(KEY),
  set: (token: string) => SecureStore.setItemAsync(KEY, token),
  remove: () => SecureStore.deleteItemAsync(KEY),
};
