/**
 * 디자인 토큰. k-sales-hunter-fe(src/styles/theme.ts)의 Figma 변수를 RN 숫자 단위로 옮긴 것.
 * - 웹과 같은 인상: 흰 바탕 + 헤어라인 보더 카드 + 연한 블루그레이 타일, 딥 네이비 브랜드
 * - 다크 팔레트는 웹에 없어서 동건앱에서 정의한 네이비 기반 팔레트를 재사용
 */

export type Theme = {
  /** 화면 배경 (웹 background) */
  background: string;
  /** 보더 카드 배경 (웹 surface) */
  card: string;
  /** 연한 타일·스켈레톤 (웹 bgLight) */
  surface: string;
  /** 비활성·스켈레톤 하이라이트 (웹 bgGray) */
  surfaceStrong: string;
  /** 본문 (웹 textPrimary) */
  text: string;
  /** 큰 숫자 (웹 textStrong) */
  textStrong: string;
  /** 보조 (웹 textSecondary) */
  textSecondary: string;
  /** 섹션 라벨 (웹 textMuted) */
  textMuted: string;
  textOnPrimary: string;
  border: string;
  primary: string;
  primaryLight: string;
  third: string;
  thirdLight: string;
  success: string;
  successLight: string;
  error: string;
  errorLight: string;
  tabBar: string;
  overlay: string;
};

export const Colors: { light: Theme; dark: Theme } = {
  light: {
    background: '#FFFFFF',
    card: '#FFFFFF',
    surface: '#F2F6FA',
    surfaceStrong: '#E8EBF1',
    text: '#364153',
    textStrong: '#0F2742',
    textSecondary: '#99A1AF',
    textMuted: '#94A3B8',
    textOnPrimary: '#FFFFFF',
    border: '#E8EBF1',
    primary: '#19336E',
    primaryLight: '#E7EDFA',
    third: '#8150C0',
    thirdLight: '#F3EEFA',
    success: '#2E7D32',
    successLight: '#E8F5E9',
    error: '#D76464',
    errorLight: '#FFF5F5',
    tabBar: '#FFFFFF',
    overlay: 'rgba(0,0,0,0.5)',
  },
  dark: {
    background: '#0E1420',
    card: '#131B2A',
    surface: '#1B2436',
    surfaceStrong: '#243047',
    text: '#E6EAF2',
    textStrong: '#FFFFFF',
    textSecondary: '#8A93A6',
    textMuted: '#6B7489',
    textOnPrimary: '#FFFFFF',
    border: '#263149',
    primary: '#7C9BE6',
    primaryLight: '#1C2A4D',
    third: '#B08BE6',
    thirdLight: '#2B2140',
    success: '#5FB864',
    successLight: '#1A2E1C',
    error: '#E88383',
    errorLight: '#3A1F22',
    tabBar: '#121A28',
    overlay: 'rgba(0,0,0,0.6)',
  },
};

/** 주요 CTA 그라데이션 (웹 gradient: 90deg #103687 → #5C2799). 다크에서도 동일 */
export const BrandGradient = ['#103687', '#5C2799'] as const;

/** 간격 토큰 (Figma margin-*) */
export const Spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxxl: 48,
} as const;

/** 라운드 토큰 */
export const Radius = {
  sm: 5,
  md: 8,
  lg: 10,
  xl: 12,
  full: 999,
} as const;

/** expo-font 플러그인으로 네이티브에 임베드된 Pretendard 정적 웨이트 */
export const FontFamily = {
  regular: 'Pretendard-Regular',
  medium: 'Pretendard-Medium',
  semibold: 'Pretendard-SemiBold',
  bold: 'Pretendard-Bold',
} as const;
