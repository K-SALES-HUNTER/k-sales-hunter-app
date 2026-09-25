import { useEffect, useState } from 'react';

type State<T> = { data?: T; error?: Error; loading: boolean };

/**
 * 최소한의 조회 훅 (강의 방식: fetch + useState).
 * 카드마다 따로 호출해서 도착한 것부터 그린다 — 명세 DSH-01-01 "도착한 카드부터 순서 무관 교체".
 * fetcher는 모듈 레벨 함수처럼 참조가 고정된 것을 넘긴다.
 */
export function useFetch<T>(fetcher: () => Promise<T>) {
  const [state, setState] = useState<State<T>>({ loading: true });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetcher().then(
      (data) => !cancelled && setState({ data, loading: false }),
      (error: Error) => !cancelled && setState((prev) => ({ ...prev, error, loading: false })),
    );
    return () => {
      cancelled = true;
    };
  }, [fetcher, attempt]);

  const refetch = () => {
    setState((prev) => ({ ...prev, error: undefined, loading: true }));
    setAttempt((n) => n + 1);
  };

  return { ...state, refetch };
}
