/** 목 응답 지연 — 스켈레톤·로딩 상태를 실제처럼 보이게 한다 (웹 FE와 동일한 300ms) */
export const MOCK_DELAY_MS = 300;

export const withDelay = <T>(data: T, ms = MOCK_DELAY_MS): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(data), ms));
