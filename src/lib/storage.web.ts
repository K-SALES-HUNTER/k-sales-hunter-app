import type { StateStorage } from 'zustand/middleware';

/** 웹 미리보기용 localStorage 어댑터. 프라이빗 모드 등에서 예외가 나도 앱이 죽지 않게 감싼다. */
export const storage: StateStorage = {
  getItem: (name) => {
    try {
      return localStorage.getItem(name);
    } catch {
      return null;
    }
  },
  setItem: (name, value) => {
    try {
      localStorage.setItem(name, value);
    } catch {}
  },
  removeItem: (name) => {
    try {
      localStorage.removeItem(name);
    } catch {}
  },
};
