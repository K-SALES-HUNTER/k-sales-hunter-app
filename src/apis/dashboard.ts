import { dashboardSummaryMock, hasLinkedMarketMock, recentProductsMock } from '@/mocks/dashboard';
import type { DashboardSummary, RecentProduct } from '@/types/dashboard';

import { withDelay } from './mock';

/**
 * 대시보드 API — 백엔드 연동 전 목 데이터 반환.
 * 실제 연동 시 api<DashboardSummary>('/dashboard/summary') 등으로 교체하고 시그니처는 유지.
 */
export const fetchDashboardSummary = (): Promise<DashboardSummary> => withDelay(dashboardSummaryMock);

export const fetchRecentProducts = (): Promise<RecentProduct[]> => withDelay(recentProductsMock);

export const fetchHasLinkedMarket = (): Promise<boolean> => withDelay(hasLinkedMarketMock);
