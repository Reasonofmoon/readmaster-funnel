---
version: alpha
revision: 0.0.1
theme: light
name: 리드마스터

colors:
  # ── neutrals ──────────────────────────────────────────────
  text: "#1A1F1B"
  text-subtle: "#4B564D"
  text-subtlest: "#7A8578"
  text-inverse: "#FFFFFF"
  text-disabled: "#A9B2A7"
  link: "#0B5D3B"
  link-pressed: "#073D26"
  icon: "#2E3B30"
  icon-subtle: "#6B766C"
  icon-inverse: "#FFFFFF"
  border: "#D8D2C2"
  border-bold: "#B9B29C"
  border-input: "#C7C0AC"
  border-focused: "#C9A227"
  background-neutral: "#F3F1E9"
  background-neutral-hovered: "#ECE7D9"
  background-neutral-pressed: "#E2DCC9"
  background-neutral-subtle: "#FAF8F2"
  background-neutral-subtle-hovered: "#F3F0E7"
  background-neutral-subtle-pressed: "#ECE7DA"
  background-neutral-bold: "#1A1F1B"
  background-input: "#FFFFFF"
  background-disabled: "#EDEAE1"

  # ── semantic: brand ───────────────────────────────────────
  text-brand: "#122E1C"
  icon-brand: "#16371F"
  border-brand: "#2F5C3D"
  background-brand-subtlest: "#E8F0EA"
  background-brand-bold: "#122E1C"
  background-brand-bold-hovered: "#0D2315"
  background-brand-bold-pressed: "#081A0F"

  # ── semantic: danger ──────────────────────────────────────
  text-danger: "#B3261E"
  icon-danger: "#B3261E"
  border-danger: "#E4B3AE"
  background-danger-subtlest: "#FBEAE9"
  background-danger-bold: "#B3261E"

  # ── semantic: warning ─────────────────────────────────────
  text-warning: "#8A6D1B"
  icon-warning: "#8A6D1B"
  border-warning: "#E8D9A0"
  background-warning-subtlest: "#FBF3DC"
  background-warning-bold: "#C9A227"

  # ── semantic: success ─────────────────────────────────────
  text-success: "#1B7A43"
  icon-success: "#1B7A43"
  border-success: "#A9DABF"
  background-success-subtlest: "#E7F7EE"
  background-success-bold: "#1B7A43"

  # ── semantic: information ─────────────────────────────────
  text-information: "#1B5FA8"
  icon-information: "#1B5FA8"
  border-information: "#A9C9E8"
  background-information-subtlest: "#E9F1FB"
  background-information-bold: "#1B5FA8"

  # ── semantic: selected ────────────────────────────────────
  text-selected: "#122E1C"
  border-selected: "#122E1C"
  background-selected: "#E8F0EA"

  # ── accent ramp: gold (장식 전용) ─────────────────────────
  background-accent-gold-subtlest: "#FBF3DC"
  background-accent-gold-subtler: "#F5E6B8"
  background-accent-gold-subtle: "#E8C468"
  background-accent-gold-bolder: "#C9A227"
  text-accent-gold: "#8A6D1B"
  icon-accent-gold: "#9C7E1F"
  border-accent-gold: "#D9BE6E"

  # ── accent ramp: teal ──────────────────────────────────────
  background-accent-teal-subtlest: "#E6F5F3"
  background-accent-teal-subtler: "#C3E8E3"
  background-accent-teal-subtle: "#7FCEC4"
  background-accent-teal-bolder: "#2E9C8D"
  text-accent-teal: "#1C6A5F"
  icon-accent-teal: "#237A6D"
  border-accent-teal: "#8FCFC5"

  # ── accent ramp: plum ──────────────────────────────────────
  background-accent-plum-subtlest: "#F5EAF2"
  background-accent-plum-subtler: "#E3C7DC"
  background-accent-plum-subtle: "#B87DA8"
  background-accent-plum-bolder: "#833D6E"
  text-accent-plum: "#5C2A4C"
  icon-accent-plum: "#6E3459"
  border-accent-plum: "#C79BB9"

  # ── accent ramp: terracotta ─────────────────────────────────
  background-accent-terracotta-subtlest: "#FBEEE7"
  background-accent-terracotta-subtler: "#F0CDB8"
  background-accent-terracotta-subtle: "#DB8F63"
  background-accent-terracotta-bolder: "#B85C31"
  text-accent-terracotta: "#7C3B1C"
  icon-accent-terracotta: "#914523"
  border-accent-terracotta: "#E0AA88"

  # ── accent ramp: sand ────────────────────────────────────────
  background-accent-sand-subtlest: "#FAF6EC"
  background-accent-sand-subtler: "#F0E6CB"
  background-accent-sand-subtle: "#D9C48F"
  background-accent-sand-bolder: "#B89C56"
  text-accent-sand: "#6E5A2B"
  icon-accent-sand: "#806B33"
  border-accent-sand: "#D2BD86"

  # ── accent ramp: slate ───────────────────────────────────────
  background-accent-slate-subtlest: "#EEF1F0"
  background-accent-slate-subtler: "#D2D9D6"
  background-accent-slate-subtle: "#8FA09A"
  background-accent-slate-bolder: "#566B63"
  text-accent-slate: "#38473F"
  icon-accent-slate: "#445A50"
  border-accent-slate: "#9DB0A9"

  # ── chart ──────────────────────────────────────────────────
  chart-categorical-1: "#122E1C"
  chart-categorical-2: "#C9A227"
  chart-categorical-3: "#2E9C8D"
  chart-categorical-4: "#B85C31"
  chart-categorical-5: "#833D6E"
  chart-categorical-6: "#1B5FA8"
  chart-brand: "#122E1C"
  chart-danger: "#B3261E"
  chart-warning: "#C9A227"
  chart-success: "#1B7A43"
  chart-neutral: "#7A8578"

typography:
  heading-1:
    fontFamily: "Noto Serif KR, Georgia, serif"
    fontSize: "2.5rem"
    fontWeight: 700
    lineHeight: 1.2
  heading-2:
    fontFamily: "Noto Serif KR, Georgia, serif"
    fontSize: "2rem"
    fontWeight: 700
    lineHeight: 1.25
  heading-3:
    fontFamily: "Noto Serif KR, Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.3
  heading-4:
    fontFamily: "Pretendard, -apple-system, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.4
  heading-5:
    fontFamily: "Pretendard, -apple-system, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.4
  body-large:
    fontFamily: "Pretendard, -apple-system, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Pretendard, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  body-small:
    fontFamily: "Pretendard, -apple-system, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  code:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  weight-regular: 400
  weight-medium: 500
  weight-bold: 700
  family-heading: "Noto Serif KR, Georgia, serif"
  family-body: "Pretendard, -apple-system, sans-serif"
  family-code: "JetBrains Mono, monospace"

rounded:
  xsmall: "0.25rem"
  small: "0.5rem"
  medium: "0.75rem"
  large: "1rem"
  xlarge: "1.5rem"
  full: "9999px"

spacing:
  spacing-0: "0rem"
  spacing-1: "0.5rem"
  spacing-2: "1rem"
  spacing-3: "1.5rem"
  spacing-4: "2rem"
  spacing-5: "2.5rem"
  spacing-6: "3rem"
  spacing-7: "3.5rem"
  spacing-8: "4rem"

borders:
  width-default: "0.0625rem"
  width-selected: "0.125rem"
  width-focused: "0.125rem"

surfaces:
  default: "#FFFFFF"
  sunken: "#F7F1E1"
  raised: "#FFFFFF"
  raised-shadow: "0 1px 2px rgba(18,46,28,0.08), 0 4px 12px rgba(18,46,28,0.06)"
  overlay: "#FFFFFF"
  overlay-shadow: "0 12px 32px rgba(18,46,28,0.18), 0 4px 10px rgba(18,46,28,0.10)"

motion:
  duration-instant: "80ms"
  duration-fast: "120ms"
  duration-base: "200ms"
  duration-moderate: "320ms"
  duration-slow: "480ms"
  easing-standard: "cubic-bezier(0.2, 0, 0, 1)"
  easing-entrance: "cubic-bezier(0, 0, 0.2, 1)"
  easing-exit: "cubic-bezier(0.4, 0, 1, 1)"

components:
  button-default:
    background: "{colors.background-neutral}"
    background-hovered: "{colors.background-neutral-hovered}"
    background-pressed: "{colors.background-neutral-pressed}"
    background-disabled: "{colors.background-disabled}"
    text: "{colors.text}"
    text-disabled: "{colors.text-disabled}"
    border: "{borders.width-default} solid {colors.border}"
    radius: "{rounded.small}"
    padding: "{spacing.spacing-2} {spacing.spacing-3}"
    typography: "{typography.body}"
  button-primary:
    background: "{colors.background-brand-bold}"
    background-hovered: "{colors.background-brand-bold-hovered}"
    text: "{colors.text-inverse}"
    border: "none"
    radius: "{rounded.small}"
    padding: "{spacing.spacing-2} {spacing.spacing-4}"
    typography: "{typography.body}"
  button-danger:
    background: "{colors.background-danger-bold}"
    text: "{colors.text-inverse}"
    border: "none"
    radius: "{rounded.small}"
    padding: "{spacing.spacing-2} {spacing.spacing-4}"
    typography: "{typography.body}"
  textfield-standard:
    background: "{colors.background-input}"
    border: "{borders.width-default} solid {colors.border-input}"
    border-focused: "{borders.width-focused} solid {colors.border-focused}"
    border-invalid: "{borders.width-default} solid {colors.border-danger}"
    radius: "{rounded.xsmall}"
    padding: "{spacing.spacing-2}"
    text: "{colors.text}"
    placeholder: "{colors.text-subtlest}"
  card:
    background: "{colors.background-input}"
    shadow: "0 1px 2px rgba(18,46,28,0.08), 0 4px 12px rgba(18,46,28,0.06)"
    border: "{borders.width-default} solid {colors.border}"
    radius: "{rounded.medium}"
    padding: "{spacing.spacing-4}"
  badge:
    background: "{colors.background-brand-subtlest}"
    text: "{colors.text-brand}"
    radius: "{rounded.full}"
    padding: "{spacing.spacing-1} {spacing.spacing-2}"
    typography: "{typography.body-small}"
  modal-dialog:
    background: "{colors.background-input}"
    shadow: "0 12px 32px rgba(18,46,28,0.18), 0 4px 10px rgba(18,46,28,0.10)"
    radius: "{rounded.large}"
    padding: "{spacing.spacing-5}"
    border: "none"
  table-head-cell:
    background: "{colors.background-neutral-subtle}"
    text: "{colors.text-subtle}"
    typography: "{typography.body-small}"
    padding: "{spacing.spacing-2} {spacing.spacing-3}"
    border-bottom: "{borders.width-default} solid {colors.border}"
  table-cell:
    background: "{colors.background-input}"
    text: "{colors.text}"
    typography: "{typography.body}"
    padding: "{spacing.spacing-2} {spacing.spacing-3}"
    border-bottom: "{borders.width-default} solid {colors.border}"
---

# 리드마스터 DESIGN.md

*"스스로 읽는 힘 — Lectio Libera."*

> **참고:** 배경색 `#122E1C`(진한 브랜드 그린)는 세로형 돌출 간판 시안 캡션에 "바탕 #122E1C (브랜드 그린 진하게)"로 명시된 **관찰값**입니다. 로고 심볼의 골드 톤(`#C9A227` 계열), 도어 사이니지의 크림 배경(`#F7F1E1` 계열), 리셉션 데스크의 화이트(`#FFFFFF`)는 스크린샷에서 육안 관찰된 색을 근사 추출한 **관찰 기반 추정값**입니다. 라틴어 태그라인 "Lectio Libera"와 국문 카피 "스스로 읽는 힘"은 도어 목업에서 관찰된 **관찰값**입니다. 타이포그래피 상세 수치(rem, line-height), spacing 8단 스케일, motion(duration/easing), accent 6색상 램프, chart 색상, semantic danger/warning/success/information 전체, surfaces의 shadow 문자열은 스크린샷에서 직접 관찰할 수 없는 축이므로 브랜드 톤(짙은 그린 + 골드 + 세리프 로고타입)에 부합하도록 **생성값**으로 제작했습니다.

## Table of Contents
1. [Overview](#overview)
2. [Colors](#colors)
3. [Typography](#typography)
4. [Layout](#layout)
5. [Elevation & Depth](#elevation--depth)
6. [Shapes](#shapes)
7. [Components](#components)
8. [Do's and Don'ts](#dos-and-donts)
9. [Icons](#icons)
10. [Motion](#motion)
11. [Voice and tone](#voice-and-tone)
12. [Accessibility](#accessibility)
13. [Responsive behaviour](#responsive-behaviour)

## Overview

**리드마스터는 진한 포레스트 그린과 클래식 세리프 로고타입, 골드 디테일로 신뢰와 학문적 권위를 표현하는 국어·문해력 학원 브랜드다.**

- 브랜드는 **MUST** 항상 짙은 그린(`background-brand-bold`)을 주인공 색으로 노출해야 한다. 왜냐하면 모든 관찰된 사이니지(세로 돌출간판, 파사드 사인, 도어 스티커)에서 그린이 배경 또는 주 텍스트 색으로 일관되게 등장하기 때문이다.
- 골드(`background-accent-gold-*`)는 **MUST NOT** 본문 텍스트의 기본색으로 쓰여서는 안 된다. 골드는 관찰된 모든 예시에서 전화번호, 구분선, 다이아몬드 장식, 로고 심볼의 책장 하이라이트 등 **강조 전용**으로만 등장했기 때문이다.
- 로고 심볼(책 모양 방패/날개형 마크)은 **SHOULD** 단독으로 사용할 때 그린-골드 2색 조합을 유지해야 한다. 모노톤 변형이 필요할 경우 **MAY** 그린 단색만 허용하고 골드 단색 변형은 지양한다.
- 세리프 로고타입("Read Master")과 고딕 국문 병기("리드마스터 학원")의 **이중 표기 체계**는 **MUST** 상단 브랜드 영역에서 함께 유지되어야 한다. 도어 사이니지와 리셉션 데스크 모두 영문 세리프 + 국문 고딕 병기 구조를 따르기 때문이다.
- 크림/아이보리 배경(`surfaces.sunken`)은 **SHOULD** 그린이 과도하게 무거워 보이는 실내 사이니지·인쇄물 맥락에서 대안 배경으로 사용해야 한다. 단 디지털 제품 UI의 기본 캔버스는 `surfaces.default`(순백)를 원칙으로 한다.

### Brand vs product 경계
브랜드 자산(로고, 간판, 도어 사이니지, 리셉션 데스크 그래픽)은 오프라인 물리적 매체에 최적화된 고정 톤(진그린 + 골드 + 세리프)을 사용한다. 반면 제품 UI(웹사이트, 학습 관리 대시보드, 상담 신청 폼)는 **SHOULD** 동일한 브랜드 팔레트를 사용하되 상호작용 상태(hover/pressed/disabled)와 접근성 대비를 위해 semantic 토큰 체계로 확장해야 한다. 브랜드 로고타입과 심볼 자체의 비율·구성은 **MUST NOT** 제품팀이 임의로 재해석하지 않는다 — 이는 브랜드 자산 가이드의 영역이다.

### Reference points
- **Aligned with:** Material Design 3의 surface tonal elevation 개념(그린 계열 단일 hue 기반의 밝기 단계 구성), IBM Carbon의 semantic color role 분리 방식(브랜드색과 기능색을 명확히 구분).
- **Not aligned with:** 채도 높은 멀티 그라디언트를 남용하는 스타트업 테크 브랜드(예: 과도한 네온/글래스모피즘 계열), 플랫 원색 위주의 장난스러운 에듀테크 브랜드 — 리드마스터는 **MUST NOT** 이러한 톤을 차용하지 않는다. 학원 브랜드 특유의 신뢰감과 전통적 권위를 훼손하기 때문이다.

## Colors

### Neutrals
| 토큰 | 값 | 용도 |
|---|---|---|
| text | #1A1F1B | 본문 기본 텍스트 |
| text-subtle | #4B564D | 보조 설명 텍스트 |
| text-subtlest | #7A8578 | placeholder, 캡션 |
| text-inverse | #FFFFFF | 그린/다크 배경 위 텍스트 |
| text-disabled | #A9B2A7 | 비활성 텍스트 |
| link | #0B5D3B | 인라인 링크 |
| link-pressed | #073D26 | 링크 클릭 상태 |
| border | #D8D2C2 | 기본 구분선 |
| border-focused | #C9A227 | 포커스 링 |
| background-neutral | #F3F1E9 | 중립 배경 |
| background-neutral-bold | #1A1F1B | 고대비 블록 |
| background-input | #FFFFFF | 입력 필드 배경 |
| background-disabled | #EDEAE1 | 비활성 배경 |

### Semantic roles
| 역할 | text | icon | border | subtlest bg | bold bg |
|---|---|---|---|---|---|
| brand | #122E1C | #16371F | #2F5C3D | #E8F0EA | #122E1C |
| danger | #B3261E | #B3261E | #E4B3AE | #FBEAE9 | #B3261E |
| warning | #8A6D1B | #8A6D1B | #E8D9A0 | #FBF3DC | #C9A227 |
| success | #1B7A43 | #1B7A43 | #A9DABF | #E7F7EE | #1B7A43 |
| information | #1B5FA8 | #1B5FA8 | #A9C9E8 | #E9F1FB | #1B5FA8 |
| selected | #122E1C(text/border) | — | — | #E8F0EA | — |

### Accent ramps (장식 전용)
gold · teal · plum · terracotta · sand · slate 6색상, 각각 subtlest/subtler/subtle/bolder 4단 배경 + text/icon/border 토큰 보유. 장식용 태그, 카테고리 라벨, 일러스트 배경에만 사용한다.

### Chart
chart-categorical-1~6 (브랜드 그린, 골드, 틸, 테라코타, 플럼, 블루 순서로 배치해 브랜드색을 항상 첫 번째 계열로 노출) + chart-brand/danger/warning/success/neutral.

### 페어링 규칙
- `text` 계열은 **MUST** `surfaces.default` 또는 `surfaces.sunken` 위에서만 사용해야 하며, `background-neutral-bold` 위에서는 **MUST** `text-inverse`로 전환해야 한다. 그렇지 않으면 관찰된 명도 대비 기준(≥4.5:1)을 위반한다.
- `background-brand-bold` 위 텍스트는 **MUST** `text-inverse`(#FFFFFF)만 사용한다. 계산된 명도 대비가 15:1 이상으로 검증되었기 때문에 이 조합만이 안전하다.
- accent 램프는 **MUST NOT** semantic 역할(성공/경고/위험/정보)의 대체재로 사용되어서는 안 된다. accent는 순수 장식 목적이며 의미 전달용 색이 아니기 때문에, 혼용 시 사용자가 상태를 오인할 위험이 있다.
- 골드(`background-accent-gold-bolder`)와 `background-warning-bold`는 시각적으로 유사하지만 **MUST** 서로 다른 토큰 경로로 참조해야 한다. 전자는 순수 장식, 후자는 경고 상태 전달용이라는 의미적 분리가 필요하기 때문이다.

## Typography
- heading-1~3은 **SHOULD** `family-heading`(세리프)을 사용해 로고타입과 동일한 클래식 인상을 유지해야 한다. 반면 heading-4~5, body 계열은 **MUST** `family-body`(고딕 산세리프)를 사용해 국문 가독성을 확보해야 한다.
- 모든 굵기는 **MUST** `weight-regular`/`weight-medium`/`weight-bold` 토큰만 사용해야 하며 임의의 450, 550 같은 중간값은 **MUST NOT** 허용되지 않는다. 폰트 렌더링 일관성이 깨지기 때문이다.
- 브랜드명과 전화번호는 **SHOULD** 전각 대문자/숫자 그대로 표기하고, 국문 카피는 **MUST NOT** 전체 대문자(강제 대문자 변환)를 적용하지 않는다 — 한글에는 대소문자 개념이 없으며 라틴 태그라인("Lectio Libera")만 타이틀 케이스를 유지한다.
- body-small은 **SHOULD** 표/캡션/보조 라벨에만 사용하고 본문 문단에는 **MUST NOT** 사용하지 않는다. 가독성 저하로 학습 콘텐츠 브랜드 신뢰도를 해치기 때문이다.

## Layout
- 베이스 단위는 8px이며 모든 간격은 **MUST** `spacing-1`(8px)의 배수여야 한다. 임의의 5px, 13px 같은 off-grid 값은 **MUST NOT** 사용되지 않는다. 간판·도어 사이니지에서 관찰된 대칭적이고 정제된 여백감을 디지털에서도 재현하기 위함이다.
- 컴포넌트 내부 패딩은 **SHOULD** `spacing-2`~`spacing-3` 범위를, 섹션 간 큰 간격은 `spacing-5`~`spacing-8`을 사용해야 한다.
- 카드/폼 그룹 선택 시 **MAY** `spacing-4`를 기본값으로 채택할 수 있으나, 밀도 높은 표/리스트에서는 `spacing-2`로 축소해야 한다.

## Elevation & Depth
| surface | shadow | 용도 |
|---|---|---|
| default | 없음 | 페이지 기본 캔버스 |
| sunken | 없음 | 배경 강조, 사이드 패널 |
| raised | 0 1px 2px rgba(18,46,28,0.08), 0 4px 12px rgba(18,46,28,0.06) | 카드, 리스트 아이템 |
| overlay | 0 12px 32px rgba(18,46,28,0.18), 0 4px 10px rgba(18,46,28,0.10) | 모달, 드롭다운 |

- 페이지 캔버스는 **MUST** `surfaces.default`(#FFFFFF)를 기본으로 하고, 브랜드 강조 섹션에서만 `surfaces.sunken`(크림)을 사용해야 한다.
- 상승 평면(raised, overlay)은 **MUST** 각각 지정된 shadow 문자열과 짝을 이뤄야 하며, 그림자 없이 배경색만 바꿔 입체감을 흉내내는 방식은 **MUST NOT** 허용되지 않는다.

## Shapes
| radius | 값 | 적용 컴포넌트 |
|---|---|---|
| xsmall | 4px | 입력 필드 |
| small | 8px | 버튼, 뱃지 코너 |
| medium | 12px | 카드 |
| large | 16px | 모달 |
| xlarge | 24px | 히어로 배너, 프로모 카드 |
| full | pill | 뱃지/로젠지 |

- 포커스 링은 **MUST** 2px 두께(`borders.width-focused`), 색상 `border-focused`(#C9A227), offset 2px를 계약값으로 고정해야 한다. 골드는 그린 배경/크림 배경 양쪽에서 시인성이 높기 때문에 유일한 포커스 색으로 채택했다.
- border 3단(`width-default` 1px, `width-selected` 2px, `width-focused` 2px)은 **SHOULD** 서로 다른 의미(기본 구분/선택 상태/포커스 상태)로만 구분되어야 하며 임의로 혼용해선 안 된다.

## Components
- **button-default**: 중립 배경, hover/pressed/disabled 4상태 필수. 텍스트는 `text`, 비활성 시 `text-disabled`로 전환. 안티패턴: 그린 텍스트를 중립 버튼에 직접 쓰는 것은 **MUST NOT** — 브랜드색은 primary 버튼 전용이다.
- **button-primary**: `background-brand-bold` 기반. hover 시 더 어두운 그린으로 전환해야 하며 골드로 hover 처리하는 것은 **MUST NOT** — 브랜드 그린의 권위감을 흐린다.
- **button-danger**: 위험 작업(수강 취소, 계정 삭제) 전용. 아이콘 없이 텍스트만으로도 의미가 전달되도록 레이블은 **MUST** 명확한 동사를 포함해야 한다.
- **textfield-standard**: 포커스/invalid 상태 필수. invalid 시 테두리 색만으로 오류를 표시하는 것은 **MUST NOT** — 반드시 오류 텍스트를 동반해야 한다(접근성 참조).
- **card**: raised surface + shadow 필수 짝. 그림자 없는 카드에 border만 적용하는 방식은 **SHOULD NOT** 지양한다.
- **badge/lozenge**: subtlest 배경 + role 텍스트 조합만 사용. accent 램프를 상태 뱃지에 쓰는 것은 **MUST NOT**.
- **modal-dialog**: overlay surface + shadow, radius large. 배경 스크림 없이 모달만 띄우는 것은 **MUST NOT** — 포커스 트랩 및 시각적 계층 분리가 깨진다.
- **table-head-cell/table-cell**: 헤더는 `text-subtle`로 낮춘 위계, 바디는 `text` 기본 위계 유지.

## Do's and Don'ts
| # | Do | Don't (실제 발생 가능한 drift) |
|---|---|---|
| 1 | 골드는 전화번호·구분선·CTA 강조에만 사용한다 | 골드를 본문 텍스트나 표 배경 전체에 칠해 "화려하게" 만드는 것 |
| 2 | 그린은 항상 브랜드 주인공 색으로 유지한다 | 마케팅 배너에서 트렌디하다는 이유로 그린 대신 파스텔톤으로 교체하는 것 |
| 3 | 세리프+고딕 이중 표기를 유지한다 | 앱 헤더에서 국문만 쓰고 영문 세리프 로고타입을 생략하는 것 |
| 4 | 로고 심볼은 그린-골드 2색 원본 비율을 지킨다 | 다크모드 대응한다며 심볼을 흰색 단색으로 임의 변경하는 것 |
| 5 | 포커스 링은 항상 골드 2px로 고정한다 | 버튼별로 포커스 색을 브랜드 그린, 파랑 등으로 제각각 적용하는 것 |
| 6 | 카드는 raised surface + 지정 shadow를 함께 쓴다 | 그림자를 끄고 border만 남겨 "미니멀하게" 바꾸는 것 |
| 7 | accent 램프는 카테고리 라벨/일러스트에만 쓴다 | accent-teal을 success 상태 뱃지에 재활용하는 것 |
| 8 | spacing은 8px 배수를 지킨다 | 디자이너 개인 취향으로 10px, 14px 임의 여백을 섞는 것 |
| 9 | 에러 메시지는 이유+해결책을 함께 제공한다 | "오류가 발생했습니다"처럼 원인 없는 메시지만 노출하는 것 |
| 10 | CTA는 학습 행동 동사(신청하다/진단받다/시작하다)로 시작한다 | "확인", "예"처럼 맥락 없는 범용 버튼 텍스트를 쓰는 것 |
| 11 | 라틴 태그라인은 원문 그대로 유지한다 | "Lectio Libera"를 임의로 한글 음역해 병기하는 것 |
| 12 | 텍스트 대비는 항상 계산해 확인한다 | subtle 텍스트를 크림 배경에 얹어 대비가 낮아진 채 방치하는 것 |

## Icons
- 아이콘은 **SHOULD** 1.5px 스트로크의 아웃라인 스타일을 기본으로 하며, 브랜드 심볼(책 모양 마크)과 시각적으로 경쟁하지 않도록 **MUST NOT** 필오브젝트(filled) 스타일과 혼용하지 않는다.
- 색상은 **MUST** `icon`, `icon-subtle`, `icon-brand` 등 지정 토큰만 사용해야 하며 임의의 hex를 아이콘에 직접 지정하는 것은 금지된다.
- 상태 아이콘(성공/경고/위험)은 **MUST** 색상과 함께 형태(체크/느낌표/엑스)로도 구분되어야 한다(접근성 참조).

## Motion
> 참고: 아래 duration/easing 값은 스크린샷에서 관찰 불가능하여 브랜드의 차분하고 신뢰감 있는 톤에 맞춰 관행값으로 생성했다.
- 마이크로 인터랙션(버튼 hover 등)은 **SHOULD** `duration-fast`(120ms) + `easing-standard`를 사용한다.
- 모달/드로어 진입은 **SHOULD** `duration-moderate`(320ms) + `easing-entrance`, 퇴장은 `easing-exit`를 사용해야 한다.
- 브랜드 톤상 통통 튀는(bounce) 이징은 **MUST NOT** 사용하지 않는다. 전통적이고 신뢰감 있는 학원 브랜드 정체성과 충돌하기 때문이다.

## Voice and tone
- CTA 동사는 **SHOULD** "상담 신청하기", "무료 진단받기", "학습 시작하기"처럼 구체적 학습 행동을 지시해야 한다. 범용 "확인/제출" 동사는 **MUST NOT** 단독으로 사용되지 않는다.
- 에러 메시지는 **MUST** 원인과 해결 방법을 함께 제공해야 한다. 예: "전화번호 형식이 올바르지 않습니다. 010-0000-0000 형식으로 입력해 주세요."
- 이 브랜드 특유의 보이스 결정 3가지: ① 라틴어 태그라인("Lectio Libera")을 국문 번역과 항상 병기해 학문적 권위를 강조한다. ② 아이콘보다 책 모양 심볼 자체를 신뢰의 상징으로 반복 노출한다. ③ 전화번호는 항상 골드로 강조해 "상담 연결"이라는 행동 유도점을 시각적으로 고정한다.

## Accessibility
- 모든 텍스트/배경 조합은 **MUST** WCAG AA(일반 텍스트 4.5:1, 큰 텍스트 3:1) 기준을 충족해야 한다. `text`↔`surfaces.default`, `text-subtle`↔`surfaces.default`, `text-inverse`↔`background-brand-bold` 조합은 계산상 각각 약 15:1, 7.7:1, 15:1로 검증되었다.
- 상태 정보(성공/경고/위험)는 **MUST NOT** 색상만으로 전달되지 않는다. 아이콘 형태 또는 텍스트 레이블을 항상 동반해야 한다.
- 포커스 상태는 **MUST** 키보드 탐색 시에도 골드 2px 링으로 시각적으로 드러나야 한다.

## Responsive behaviour
- 세로형 돌출 간판의 대칭적 프레이밍(중앙 로고 → 중앙 텍스트 → 하단 강조 바) 구조는 **SHOULD** 모바일 히어로 섹션에서도 동일한 수직 중앙 정렬 리듬으로 재현되어야 한다.
- 데스크톱에서 좌우 대칭인 도어 사이니지형 레이아웃은 **MAY** 태블릿 이하에서 단일 컬럼으로 스택되지만, 중앙 정렬 원칙은 **MUST** 유지되어야 한다.
- 브레이크포인트 전환 시 골드 강조선과 다이아몬드 구분자 같은 장식 요소는 **SHOULD** 작은 화면에서 단순화(선만 유지, 다이아몬드 생략)될 수 있으나 완전히 제거되어서는 **MUST NOT** 안 된다 — 브랜드 인지 요소이기 때문이다.
