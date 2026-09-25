import { StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { symbol, text1, text2 } from '@/components/icons/logo-paths';
import { useTheme } from '@/hooks/use-theme';

/** size별 심볼/워드마크 크기 — 웹 Logo.styled.ts (Figma LOGO 인스턴스 실측값) */
const sizes = {
  sm: { symbol: 14, text1W: 56, text2W: 50, gap: 12, innerGap: 6 },
  md: { symbol: 22, text1W: 88, text2W: 78, gap: 16, innerGap: 9 },
  lg: { symbol: 34, text1W: 134, text2W: 119, gap: 29, innerGap: 14 },
} as const;

function Mark({ data, width, color }: { data: typeof symbol; width: number; color: string }) {
  const [, , w, h] = data.viewBox.split(' ').map(Number);
  return (
    <Svg width={width} height={(width * h) / w} viewBox={data.viewBox}>
      {data.paths.map((d) => (
        <Path key={d.slice(0, 24)} d={d} fill={color} />
      ))}
    </Svg>
  );
}

/** LOGO (Figma 371:3327) — 웹 SVG 경로를 그대로 쓰고 색만 테마에 맞춘다 */
export function Logo({ size = 'sm' }: { size?: keyof typeof sizes }) {
  const theme = useTheme();
  const s = sizes[size];

  return (
    <View
      accessible
      accessibilityRole="image"
      accessibilityLabel="K-SALES HUNTER"
      style={[styles.row, { gap: s.gap }]}
    >
      <Mark data={symbol} width={s.symbol} color={theme.text} />
      <View style={[styles.row, { gap: s.innerGap }]}>
        <Mark data={text1} width={s.text1W} color={theme.text} />
        <Mark data={text2} width={s.text2W} color={theme.text} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
});
