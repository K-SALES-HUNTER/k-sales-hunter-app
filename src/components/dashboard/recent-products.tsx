import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ReportChip } from '@/components/dashboard/report-chip';
import { AppText } from '@/components/ui/text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { won } from '@/lib/format';
import { showPcOnly } from '@/lib/pc-only';
import type { RecentProduct } from '@/types/dashboard';

/**
 * 최근 상품 (웹 RecentProductsSection, Figma 303:2698).
 * 웹의 5열 테이블은 폰 폭에 안 맞아서 한 상품 = 한 행(썸네일 + 이름/매출·등록일 + 보고서 칩 가로 스크롤)으로 재배치.
 * 보고서·상품 목록 화면은 앱 범위 밖이라 누르면 PC 안내를 띄운다.
 */
export function RecentProducts({ products }: { products: RecentProduct[] }) {
  const theme = useTheme();

  return (
    <View style={styles.section}>
      <View style={styles.titleRow}>
        <AppText variant="label01">최근 상품</AppText>
        <AppText variant="label01" tone="secondary">
          총 {products.length}개
        </AppText>
      </View>

      <View style={[styles.list, { borderColor: theme.border }]}>
        {products.map((product, i) => (
          <View
            key={product.id}
            style={[styles.item, i > 0 && { borderTopWidth: 1, borderTopColor: theme.border }]}
          >
            <Pressable
              accessibilityRole="button"
              accessibilityHint="전체 분석 보고서 안내"
              onPress={() => showPcOnly('분석 보고서는 PC에서 확인해주세요')}
              style={({ pressed }) => [styles.main, pressed && { opacity: 0.7 }]}
            >
              <Image
                source={product.image}
                style={[styles.thumb, { backgroundColor: theme.surface }]}
                contentFit="cover"
                accessibilityIgnoresInvertColors
              />
              <View style={styles.info}>
                <AppText variant="body01" numberOfLines={1}>
                  {product.name}
                </AppText>
                <View style={styles.meta}>
                  {/* 명세 #8: 매출 없는 상품은 0원이 아니라 비움 */}
                  {product.revenue !== null && (
                    <AppText variant="captionStrong" tone="primary">
                      {won(product.revenue)}
                    </AppText>
                  )}
                  <AppText variant="caption01" tone="secondary">
                    {product.registeredAt} 등록
                  </AppText>
                </View>
              </View>
            </Pressable>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.chips}
            >
              <ReportChip
                variant="total"
                label="전체"
                onPress={() => showPcOnly('분석 보고서는 PC에서 확인해주세요')}
              />
              {product.reportCountries.map((country) => (
                <ReportChip
                  key={country.code}
                  variant="country"
                  label={country.name}
                  onPress={() => showPcOnly(`${country.name} 보고서는 PC에서 확인해주세요`)}
                />
              ))}
            </ScrollView>
          </View>
        ))}
      </View>

      <View style={[styles.note, { backgroundColor: theme.surface }]}>
        <Ionicons name="desktop-outline" size={16} color={theme.textSecondary} />
        <AppText variant="caption01" tone="secondary" style={styles.noteText}>
          상품 등록·분석 보고서·판매 관리는 PC 웹에서 이용할 수 있어요.
        </AppText>
      </View>
    </View>
  );
}

/** 상품 0건 — 웹 Title section(Figma 167:332) 문구에 PC 안내만 덧붙임 */
export function EmptyProducts() {
  const theme = useTheme();
  return (
    <View style={[styles.empty, { backgroundColor: theme.surface }]}>
      <AppText variant="heading03">상품을 등록해주세요</AppText>
      <AppText variant="body01" tone="secondary">
        상품을 먼저 등록해야 분석이 가능해요. PC 웹에서 최소한의 정보만 기입해주시면 AI가 나머지를 자동으로
        채워드릴게요.
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { gap: Spacing.md },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.xxs,
  },
  list: { borderWidth: 1, borderRadius: Radius.md, overflow: 'hidden' },
  item: { paddingVertical: Spacing.sm, gap: Spacing.sm },
  main: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, paddingHorizontal: Spacing.md },
  thumb: { width: 48, height: 48, borderRadius: Radius.sm },
  info: { flex: 1, gap: 2 },
  meta: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs },
  chips: { gap: 10, paddingHorizontal: Spacing.md },
  note: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    padding: Spacing.sm,
    borderRadius: Radius.md,
  },
  noteText: { flex: 1 },
  empty: { gap: Spacing.xs, paddingVertical: Spacing.md, paddingHorizontal: Spacing.lg },
});
