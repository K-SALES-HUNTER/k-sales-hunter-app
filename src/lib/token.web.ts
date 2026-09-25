/** 웹 미리보기용 — expo-secure-store는 웹을 지원하지 않아 sessionStorage로 대체한다. */
const KEY = 'ksh-access-token';

export const tokenStorage = {
  get: async () => {
    try {
      return sessionStorage.getItem(KEY);
    } catch {
      return null;
    }
  },
  set: async (token: string) => {
    try {
      sessionStorage.setItem(KEY, token);
    } catch {}
  },
  remove: async () => {
    try {
      sessionStorage.removeItem(KEY);
    } catch {}
  },
};
