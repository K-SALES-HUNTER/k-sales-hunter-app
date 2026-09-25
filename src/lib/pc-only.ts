import Toast from 'react-native-toast-message';

/**
 * 앱은 현황 조회 전용 — 등록·보고서·판매 관리 같은 핵심 기능은 PC 웹에서 쓴다.
 * 앱 범위 밖 동작을 눌렀을 때 이 안내를 띄운다.
 */
export function showPcOnly(title: string) {
  Toast.show({
    type: 'info',
    text1: title,
    text2: 'PC 웹(K-SALES HUNTER)에서 이용할 수 있어요.',
    position: 'bottom',
    visibilityTime: 2500,
  });
}
