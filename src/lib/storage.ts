import Storage from 'expo-sqlite/kv-store';
import type { StateStorage } from 'zustand/middleware';

/**
 * zustand persist용 저장소 (iOS/Android).
 * expo-sqlite/kv-store: SQLite 기반, AsyncStorage와 동일한 API, 추가 네이티브 의존성 없음.
 * 웹은 storage.web.ts 가 대신 사용된다 (Metro 플랫폼 확장자 해석).
 */
export const storage: StateStorage = {
  getItem: (name) => Storage.getItem(name),
  setItem: (name, value) => Storage.setItem(name, value),
  removeItem: (name) => Storage.removeItem(name),
};
