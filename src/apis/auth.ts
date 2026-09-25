import { withDelay } from './mock';

type LoginResponse = { accessToken: string };

/**
 * 로그인 API — 백엔드 연동 전 목. 웹 FE와 같이 형식만 맞으면 통과시킨다.
 * 실제 연동 시 api<LoginResponse>('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) })
 */
export const login = (email: string, _password: string): Promise<LoginResponse> =>
  withDelay({ accessToken: `mock-token-${email}` }, 600);
