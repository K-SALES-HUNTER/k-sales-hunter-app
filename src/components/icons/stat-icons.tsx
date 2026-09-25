import Svg, { Path } from 'react-native-svg';

/** 웹 assets/icons/stat-order.svg · stat-report.svg · trend-up.svg 를 react-native-svg로 옮긴 것 */
type Props = { size?: number; color: string };

export function StatOrderIcon({ size = 24, color }: Props) {
  return (
    <Svg width={size} height={size} viewBox="-4.3 -2.8 24 24" fill="none">
      <Path
        d="M12.7 0.7H2.7C1.59543 0.7 0.7 1.59543 0.7 2.7V15.7C0.7 16.8046 1.59543 17.7 2.7 17.7H12.7C13.8046 17.7 14.7 16.8046 14.7 15.7V2.7C14.7 1.59543 13.8046 0.7 12.7 0.7Z"
        stroke={color}
        strokeWidth={1.4}
      />
      <Path d="M4.7 5.7H10.7M4.7 9.7H10.7M4.7 13.7H8.7" stroke={color} strokeWidth={1.4} strokeLinecap="round" />
    </Svg>
  );
}

export function StatReportIcon({ size = 24, color }: Props) {
  return (
    <Svg width={size} height={size} viewBox="-2.8 -1.3 24 24" fill="none">
      <Path
        d="M17.7 5.7L9.2 0.7L0.7 5.7V15.7L9.2 20.7L17.7 15.7V5.7Z"
        stroke={color}
        strokeWidth={1.4}
        strokeLinejoin="round"
      />
      <Path
        d="M9.2 9.7V13.7M13.2 7.7V13.7M5.2 11.7V13.7"
        stroke={color}
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function TrendIcon({ size = 11, color, down }: Props & { down?: boolean }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 11 11"
      fill="none"
      style={down ? { transform: [{ scaleY: -1 }] } : undefined}
    >
      <Path
        d="M10.0833 3.20833L6.1875 7.10417L3.89583 4.8125L0.916667 7.79167"
        stroke={color}
        strokeWidth={1.14583}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.33333 3.20833H10.0833V5.95833"
        stroke={color}
        strokeWidth={1.14583}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
