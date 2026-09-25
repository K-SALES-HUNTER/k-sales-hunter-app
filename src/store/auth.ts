import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { storage } from '@/lib/storage';
import { tokenStorage } from '@/lib/token';

type AuthState = {
  email: string | null;
  login: (email: string, token: string) => Promise<void>;
  logout: () => Promise<void>;
};

/**
 * 인증 스토어 — 이메일은 kv-store(persist), 토큰은 SecureStore.
 * 로그인 여부는 email 유무로 판단하고 루트 레이아웃의 Stack.Protected guard로 연결된다.
 */
export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      email: null,
      login: async (email, token) => {
        await tokenStorage.set(token);
        set({ email });
      },
      logout: async () => {
        await tokenStorage.remove();
        set({ email: null });
      },
    }),
    {
      name: 'ksh-auth',
      version: 1,
      storage: createJSONStorage(() => storage),
      partialize: (s) => ({ email: s.email }),
    },
  ),
);
