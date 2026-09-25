import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Svg, { Circle, Defs, Line, LinearGradient, Path, Stop } from 'react-native-svg';

import { AppText } from '@/components/ui/text';
import { Spacing } from '@/constants/theme';
import { useHaptics } from '@/hooks/use-haptics';
import { useTheme } from '@/hooks/use-theme';

export type TrendPoint = { label: string; value: number };

type Props = {
  data: TrendPoint[];
  /** 차트 영역 높이. 라벨 줄 제외 */
  height?: number;
  formatValue?: (value: number) => string;
};

const PAD_Y = 8;
const PAD_X = 6;

/**
 * 영역 추이 차트 (웹 AreaTrendChart의 RN판).
 * 웹은 viewBox + non-scaling-stroke로 늘렸지만 RN SVG엔 그 속성이 없어서
 * onLayout으로 실제 폭을 재고 픽셀 좌표로 경로를 만든다.
 * 호버가 없는 모바일에선 월 라벨/구간을 탭하면 그 달 값을 보여준다 (기본: 최근 달).
 */
export function AreaTrendChart({ data, height = 72, formatValue = (v) => v.toLocaleString() }: Props) {
  const theme = useTheme();
  const haptics = useHaptics();
  const [width, setWidth] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);

  // 명세 DSH-01-01 #6: 1개월 이하면 안내 문구
  if (data.length < 2) {
    return (
      <AppText variant="caption01" tone="secondary" style={styles.empty}>
        추이를 보려면 데이터가 더 필요합니다.
      </AppText>
    );
  }

  const selected = picked ?? data.length - 1;
  const values = data.map((d) => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const innerW = Math.max(width - PAD_X * 2, 1);

  const points = data.map((d, i) => ({
    x: PAD_X + (i / (data.length - 1)) * innerW,
    y: height - PAD_Y - ((d.value - min) / range) * (height - PAD_Y * 2),
  }));
  const line = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  const area = `${line} L${points[points.length - 1].x},${height} L${points[0].x},${height} Z`;
  const active = points[selected];

  const pick = (i: number) => {
    haptics.selection();
    setPicked(i);
  };

  return (
    <View>
      <View style={styles.readout}>
        <AppText variant="captionStrong" tone="secondary">
          {data[selected].label}
        </AppText>
        <AppText variant="captionStrong" tone="primary">
          {formatValue(data[selected].value)}
        </AppText>
      </View>

      <View style={{ height }} onLayout={(e) => setWidth(e.nativeEvent.layout.width)}>
        {width > 0 && (
          <Svg width={width} height={height}>
            <Defs>
              <LinearGradient id="area" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor={theme.primary} stopOpacity={0.25} />
                <Stop offset="1" stopColor={theme.primary} stopOpacity={0} />
              </LinearGradient>
            </Defs>
            {/* 그리드 (상/하단 점선) */}
            <Line x1={0} y1={PAD_Y} x2={width} y2={PAD_Y} stroke={theme.border} strokeDasharray="3 3" />
            <Line
              x1={0}
              y1={height - PAD_Y}
              x2={width}
              y2={height - PAD_Y}
              stroke={theme.border}
              strokeDasharray="3 3"
            />
            <Path d={area} fill="url(#area)" />
            <Path
              d={line}
              fill="none"
              stroke={theme.primary}
              strokeWidth={2}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <Line
              x1={active.x}
              y1={PAD_Y}
              x2={active.x}
              y2={height}
              stroke={theme.primary}
              strokeOpacity={0.25}
            />
            <Circle cx={active.x} cy={active.y} r={4.5} fill={theme.card} stroke={theme.primary} strokeWidth={2} />
          </Svg>
        )}
        {/* 탭 영역 — 각 포인트 구간 */}
        <View style={[StyleSheet.absoluteFill, styles.hitRow]}>
          {data.map((d, i) => (
            <Pressable
              key={d.label}
              style={styles.hit}
              accessibilityRole="button"
              accessibilityLabel={`${d.label} ${formatValue(d.value)}`}
              onPress={() => pick(i)}
            />
          ))}
        </View>
      </View>

      <View style={styles.labels}>
        {data.map((d, i) => (
          <AppText
            key={d.label}
            variant="caption01"
            tone={i === selected ? 'primary' : 'secondary'}
            style={styles.label}
          >
            {d.label}
          </AppText>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  empty: { padding: Spacing.md, textAlign: 'center' },
  readout: { flexDirection: 'row', justifyContent: 'flex-end', gap: 6, paddingBottom: Spacing.xxs },
  hitRow: { flexDirection: 'row' },
  hit: { flex: 1 },
  labels: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: Spacing.xxs },
  label: { fontSize: 11 },
});
