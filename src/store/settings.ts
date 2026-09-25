import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { storage } from '@/lib/storage';

export type ThemePreference = 'system' | 'light' | 'dark';

type SettingsState = {
  theme: ThemePreference;
  hapticsEnabled: boolean;
  setTheme: (theme: ThemePreference) => void;
  setHapticsEnabled: (enabled: boolean) => void;
};

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'system',
      hapticsEnabled: true,
      setTheme: (theme) => set({ theme }),
      setHapticsEnabled: (hapticsEnabled) => set({ hapticsEnabled }),
    }),
    {
      name: 'ksh-settings',
      version: 1,
      storage: createJSONStorage(() => storage),
    },
  ),
);
