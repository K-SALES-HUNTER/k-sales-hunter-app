/** 3200458 → '3,200,458원' */
export const won = (value: number) => `${value.toLocaleString('ko-KR')}원`;

/** '2026-07-28' → '2026년 7월 28일 기준' */
export const asOfDate = (iso: string) => {
  const [y, m, d] = iso.slice(0, 10).split('-').map(Number);
  return `${y}년 ${m}월 ${d}일 기준`;
};

/** 3.3 → '+3.3%p', -1.2 → '-1.2%p' */
export const percentPoint = (value: number) => `${value > 0 ? '+' : ''}${value}%p`;
