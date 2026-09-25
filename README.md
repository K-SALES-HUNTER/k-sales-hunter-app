# 케세헌 (K-SALES HUNTER 어드민 앱)

K-SALES HUNTER 판매 현황을 폰에서 확인하는 **조회 전용** 앱. 상품 등록·분석 보고서·판매 관리 같은 핵심 기능은 PC 웹(`k-sales-hunter-fe`)에서 쓴다.

## 범위

| 화면 | 내용 | 웹 대응 |
|---|---|---|
| 로그인 `src/app/login.tsx` | 이메일·비밀번호, 형식 검증, 비밀번호 표시 토글 | LOG-01-01 |
| 대시보드 `src/app/(tabs)/index.tsx` | 순이익·마진율, 매출 추이(탭하면 월별 값), 판매 성과 3종, 최근 상품 + 보고서 칩 | DSH-01-01 |
| 설정 `src/app/(tabs)/settings.tsx` | 계정 이메일, 테마(시스템/라이트/다크), 진동, 버전, 로그아웃 | MKT-01-01 일부 |

앱 범위 밖 동작(보고서 칩, 회원가입, 계정·마켓 관리)을 누르면 "PC에서 이용" 토스트를 띄운다 (`src/lib/pc-only.ts`).

## 스택

Expo SDK 57 · expo-router(`src/app`, `Stack.Protected` 로그인 가드, 클래식 Tabs) · `StyleSheet.create` · zustand + persist(`expo-sqlite/kv-store`) · 토큰 `expo-secure-store` · Reanimated 4 · react-native-svg(차트·로고) · expo-linear-gradient(주 CTA) · react-native-toast-message · Pretendard 정적 폰트

## 디자인

`src/constants/theme.ts`는 웹 `src/styles/theme.ts`의 색·간격·라운드를 그대로 옮겼고, `AppText` variant 이름도 웹 typography(heading01 ~ tableHeader)와 같다. 다크 팔레트는 웹에 없어서 동건앱의 네이비 다크 팔레트를 재사용했다.

## 데이터

백엔드 API가 아직 없어 웹과 같은 목 데이터를 300ms 지연 후 반환한다 (`src/apis/*` → `src/mocks/*`).
연동할 때는 `src/apis/*.ts` 함수 본문만 `api()`(`src/apis/client.ts`) 호출로 바꾸고 `.env`에 `EXPO_PUBLIC_API_URL`을 넣는다.

## 실행

```bash
npm install
npx expo start          # i: iOS 시뮬레이터 / a: Android 에뮬레이터 / w: 웹
npx tsc --noEmit && npx expo lint && npx expo-doctor
```

## ✅ Commit Convention (k-sales-hunter-fe와 동일)

| 태그     | 설명                           | 예시                         |
| -------- | ------------------------------ | ---------------------------- |
| Feat     | 새로운 기능 추가               | Feat: 로그인 기능 추가       |
| Fix      | 버그 수정                      | Fix: 로그인 오류 수정        |
| Design   | UI 스타일 및 레이아웃 변경     | Design: 버튼 색상 변경       |
| Docs     | 문서 수정                      | Docs: README 사용법 업데이트 |
| Refactor | 리팩토링 (기능 변화 없음)      | Refactor: 로그인 함수 정리   |
| Chore    | 설정, 패키지 등 환경 관련 변경 | Chore: 패키지 버전 변경      |

> ⚠️ Feat은 진짜 "새 기능"에만! 오타 수정 등에는 Fix 사용

PR은 `.github/PULL_REQUEST_TEMPLATE.md` 양식을 따른다.
