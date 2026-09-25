import { tokenStorage } from '@/lib/token';

/**
 * 공용 fetch 클라이언트 — 백엔드 연동 시 apis/*.ts 의 목 반환을 이 함수 호출로 교체한다.
 * - 앱에는 origin이 없으므로 반드시 절대 URL (EXPO_PUBLIC_API_URL)
 * - fetch는 4xx/5xx에도 resolve되므로 res.ok 검사 필수
 */
const API_URL = process.env.EXPO_PUBLIC_API_URL;

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

export async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  if (!API_URL) throw new Error('EXPO_PUBLIC_API_URL이 설정되지 않았습니다 (.env 참고)');
  const token = await tokenStorage.get();
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...init.headers,
    },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiError(res.status, body.message ?? `HTTP ${res.status}`);
  }
  return res.json();
}
