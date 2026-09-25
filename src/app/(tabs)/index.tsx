import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { fetchDashboardSummary, fetchHasLinkedMarket, fetchRecentProducts } from '@/apis/dashboard';
import { ErrorBox } from '@/components/dashboard/error-box';
import { MarketBanner } from '@/components/dashboard/market-banner';
import { OverviewCard } from '@/components/dashboard/overview-card';
import { EmptyProducts, RecentProducts } from '@/components/dashboard/recent-products';
import { Logo } from '@/components/ui/logo';
import { Screen } from '@/components/ui/screen';
import { Skeleton } from '@/components/ui/skeleton';
import { AppText } from '@/components/ui/text';
import { Spacing } from '@/constants/theme';
import { useFetch } from '@/hooks/use-fetch';

/** 대시보드 (Figma 221:613 · 명세 DSH-01-01) — 조회 전용 */
export default function DashboardScreen() {
  const summary = useFetch(fetchDashboardSummary);
  const products = useFetch(fetchRecentProducts);
  const linked = useFetch(fetchHasLinkedMarket);
  // 웹은 세션당 1번 환영 모달 → 앱은 닫으면 앱을 다시 켤 때까지 숨김
  const [bannerClosed, setBannerClosed] = useState(false);

  return (
    <Screen>
      {/* 헤더 — 데이터 로딩과 무관하게 가장 먼저 렌더 (명세 #2) */}
      <View style={styles.header}>
        <Logo size="sm" />
        <View>
          <AppText variant="heading03">대시보드</AppText>
          <AppText variant="body02" tone="secondary">
            글로벌 판매 기회와 실시간 인사이트
          </AppText>
        </View>
      </View>

      {linked.data === false && !bannerClosed && <MarketBanner onClose={() => setBannerClosed(true)} />}

      {/* 명세: 응답 전에는 카드 자리를 스켈레톤으로 유지, 실패하면 이 카드만 오류 */}
      {summary.loading && <Skeleton height={520} />}
      {summary.error && !summary.loading && (
        <ErrorBox message="매출 정보를 불러오지 못했습니다." onRetry={summary.refetch} />
      )}
      {summary.data && !summary.loading && (
        <Animated.View entering={FadeIn.duration(250)}>
          <OverviewCard summary={summary.data} />
        </Animated.View>
      )}

      {products.loading && (
        <View style={styles.skeletons}>
          <Skeleton height={42} />
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} height={112} />
          ))}
        </View>
      )}
      {products.error && !products.loading && (
        <ErrorBox message="최근 상품을 불러오지 못했습니다." onRetry={products.refetch} />
      )}
      {products.data && !products.loading && (
        <Animated.View entering={FadeIn.duration(250)}>
          {/* 명세: 상품 0건이면 목록 대신 등록 유도 */}
          {products.data.length === 0 ? <EmptyProducts /> : <RecentProducts products={products.data} />}
        </Animated.View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { gap: Spacing.md, paddingTop: Spacing.sm },
  skeletons: { gap: Spacing.sm },
});
