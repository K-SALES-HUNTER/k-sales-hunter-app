import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { StatOrderIcon, StatReportIcon, TrendIcon } from '@/components/icons/stat-icons';
import { AreaTrendChart } from '@/components/dashboard/area-trend-chart';
import { Card } from '@/components/ui/card';
import { AppText } from '@/components/ui/text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { asOfDate, percentPoint, won } from '@/lib/format';
import type { DashboardSummary } from '@/types/dashboard';

/**
 * 매출 개요 + 판매 성과 카드 (웹 OverviewSection, Figma 221:2503).
 * 웹 태블릿 레이아웃처럼 한 카드 안에서 세로로 쌓는다.
 * 명세: 매출·순이익은 전체 상품 기준 계산값이며 기준일을 함께 표기.
 */
export function OverviewCard({ summary }: { summary: DashboardSummary }) {
  const theme = useTheme();
  const down = summary.netProfitDelta < 0;

  return (
    <Card style={styles.card}>
      <View>
        <SectionLabel>매출 개요</SectionLabel>
        <View style={styles.revenueRow}>
          <View style={styles.revenueText}>
            <AppText variant="label01">순이익</AppText>
            <AppText variant="heading01" tone="strong" adjustsFontSizeToFit numberOfLines={1}>
              {won(summary.revenue)}
            </AppText>
            <AppText variant="caption01" tone="muted">
              {asOfDate(summary.revenueAsOf)}
            </AppText>
          </View>

          <View style={[styles.profitTile, { backgroundColor: theme.surface, borderColor: theme.primaryLight }]}>
            <AppText variant="tableHeader" tone="primary">
              전체 마진율
            </AppText>
            <AppText variant="heading02" tone="primary">
              {summary.netProfitRate}%
            </AppText>
            {/* 명세 #5: 양수는 상승색, 음수는 하락색 */}
            <View style={styles.delta}>
              <TrendIcon color={down ? theme.error : theme.primary} down={down} />
              <AppText variant="captionStrong" tone={down ? 'error' : 'primary'}>
                전월 대비 {percentPoint(summary.netProfitDelta)}
              </AppText>
            </View>
          </View>
        </View>

        <AreaTrendChart
          data={summary.monthlyRevenue.map((m) => ({ label: m.month, value: m.value }))}
          formatValue={won}
        />
      </View>

      <View>
        <SectionLabel>판매 성과</SectionLabel>
        <View style={styles.stats}>
          <StatTile
            wide
            icon={<StatOrderIcon color={theme.textSecondary} />}
            value={won(summary.totalSales)}
            label="총 매출"
          />
          <View style={styles.statRow}>
            <StatTile
              icon={<StatOrderIcon color={theme.textSecondary} />}
              value={`${summary.orderCount}건`}
              label="주문량"
            />
            <StatTile
              icon={<StatReportIcon color={theme.textSecondary} />}
              value={`${summary.activeProductCount}개`}
              label="판매 중인 상품"
              primaryLabel
            />
          </View>
        </View>
      </View>
    </Card>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <AppText variant="label02" tone="muted" style={styles.sectionLabel}>
      {children}
    </AppText>
  );
}

function StatTile({
  icon,
  value,
  label,
  wide,
  primaryLabel,
}: {
  icon: ReactNode;
  value: string;
  label: string;
  wide?: boolean;
  primaryLabel?: boolean;
}) {
  const theme = useTheme();
  return (
    <View
      style={[styles.statTile, wide ? styles.statWide : styles.statHalf, { backgroundColor: theme.surface }]}
    >
      <View style={[styles.statIcon, { backgroundColor: theme.card }]}>{icon}</View>
      <View style={wide ? styles.statWideText : undefined}>
        <AppText variant="heading02" tone="primary" adjustsFontSizeToFit numberOfLines={1}>
          {value}
        </AppText>
        <AppText variant="label02" tone={primaryLabel ? 'primary' : 'default'}>
          {label}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { gap: Spacing.lg },
  sectionLabel: { paddingBottom: Spacing.md },
  revenueRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.md,
    paddingBottom: Spacing.md,
  },
  revenueText: { flexShrink: 1, minWidth: 160 },
  profitTile: {
    alignItems: 'center',
    gap: Spacing.xxs,
    paddingVertical: 13,
    paddingHorizontal: 19,
    borderWidth: 0.8,
    borderRadius: Radius.xl,
  },
  delta: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  stats: { gap: Spacing.sm },
  statRow: { flexDirection: 'row', gap: Spacing.sm },
  statTile: {
    gap: Spacing.xs,
    paddingVertical: 14,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.xl,
  },
  statWide: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  statWideText: { flex: 1 },
  statHalf: { flex: 1 },
  statIcon: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center' },
});
