import type { Country, DashboardSummary, RecentProduct } from '@/types/dashboard';

/** k-sales-hunter-fe/src/mocks/dashboard.ts 와 같은 값 — 웹과 앱이 같은 숫자를 보여준다 */
const COUNTRIES: Country[] = [
  { code: 'TH', name: '태국' },
  { code: 'SG', name: '싱가포르' },
  { code: 'VN', name: '베트남' },
];

export const dashboardSummaryMock: DashboardSummary = {
  revenue: 3200458,
  revenueAsOf: '2026-07-28',
  netProfitRate: 38.4,
  netProfitDelta: 3.3,
  totalSales: 60000,
  orderCount: 42,
  activeProductCount: 4,
  monthlyRevenue: [
    { month: '2월', value: 1200000 },
    { month: '3월', value: 1750000 },
    { month: '4월', value: 1580000 },
    { month: '5월', value: 2400000 },
    { month: '6월', value: 3200458 },
  ],
};

export const recentProductsMock: RecentProduct[] = [
  {
    id: 1,
    name: '제주 화산송이 클렌저 150ml',
    image: require('@/assets/images/products/travel-mug.png'),
    revenue: null,
    registeredAt: '2026-06-20',
    reportCountries: COUNTRIES,
  },
  {
    id: 2,
    name: '한류 스타 포토카드 패키지',
    image: require('@/assets/images/products/eco-tote.png'),
    revenue: 15000,
    registeredAt: '2026-06-20',
    reportCountries: COUNTRIES,
  },
  {
    id: 3,
    name: '서울 컬렉션 헤어미스트',
    image: require('@/assets/images/products/lip-tint.png'),
    revenue: 6000,
    registeredAt: '2026-06-20',
    reportCountries: COUNTRIES,
  },
  {
    id: 4,
    name: '비건 립틴트 4종 세트',
    image: require('@/assets/images/products/led-strip.png'),
    revenue: null,
    registeredAt: '2026-06-20',
    reportCountries: COUNTRIES,
  },
];

/** 마켓 연동 여부 목 — false면 대시보드 상단에 PC 연동 안내 배너 노출 */
export const hasLinkedMarketMock = false;
