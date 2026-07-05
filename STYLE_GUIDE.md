# 스타일 가이드

## 스타일 구조 개요

이 프로젝트는 **계층화된 스타일 구조**를 사용합니다.

```
src/styles/
├── tokens/               # 디자인 토큰 (색상, 폰트, 간격, breakpoint)
├── compositions/         # 도메인별 조합 스타일 (Card, Project, Section, Skill)
├── layout/               # 레이아웃 전용 스타일 (Header, Footer)
├── theme/                # styled-components ThemeProvider에 주입되는 테마
├── AnimationStyles.jsx   # 애니메이션 (ScrollAnimation, StarRating 등)
├── IconStyles.jsx        # 소셜 아이콘 버튼
├── ImageStyles.js        # 이미지 프리미티브 (RoundedImage, SquareImage)
├── constants.js          # 레이아웃/페이지네이션 상수
└── GlobalStyle.js        # 전역 스타일 (reset, 폰트, reduced-motion)
```

---

## 1. Tokens (디자인 토큰)

**목적**: 프로젝트 전체에서 사용되는 기본 디자인 값의 중앙 관리.

```
tokens/
├── colors.js         # 색상 팔레트
├── typography.js     # 폰트, 폰트 크기, 폰트 굵기
├── breakpoints.js    # 반응형 breakpoint
└── spacing.js        # 간격, border radius
```

모든 토큰(colors, fonts, fontSizes, fontWeights, breakpoints, spacing, radius)은
`theme/theme.js`를 통해 ThemeProvider에 주입되므로, 컴포넌트에서는
`theme`을 통해 사용합니다.

```javascript
const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.2rem;
  }
`;
```

---

## 2. Compositions (조합 스타일)

**목적**: 특정 도메인(카드, 프로젝트, 섹션, 스킬)에 특화된 복합 스타일.

```
compositions/
├── Card.styles.js       # HistoryCard, CardList 등 경력 카드 스타일
├── Project.styles.js    # ProjectCard, ProjectList, 이미지 컨테이너
├── Section.styles.js    # Section, SectionTitle, AboutContent
└── Skill.styles.js      # SkillCardList
```

---

## 3. 컴포넌트 내부 스타일

해당 컴포넌트에서만 사용되는 스타일은 컴포넌트 파일 내부에 정의합니다.

```javascript
// ProfileCard.jsx
const StyledProfileCard = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  /* ... */
`;
```

---

## 스타일 작성 규칙

### ✅ 좋은 예

```javascript
// 1. theme/토큰 사용
const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
`;

// 2. compositions로 도메인 스타일 재사용
import { ProjectCard, ProjectList } from '@styles/compositions/Project.styles';
```

### ❌ 나쁜 예

```javascript
// 1. 하드코딩된 색상/breakpoint
const Title = styled.h1`
  color: #333333; /* ❌ theme.colors.primary */

  @media (max-width: 480px) {
    /* ❌ theme.breakpoints.mobile */
  }
`;

// 2. 인라인 스타일 남발
<div
  style={{ display: 'flex', gap: '20px' }}
/>; /* ❌ styled-components 사용 */

// 3. 여러 파일에 중복된 스타일 정의 → compositions로 추출
```

---

## 새로운 스타일 추가 가이드

```
질문 1: 색상, 간격, 폰트 같은 디자인 값인가?
  → tokens/에 추가하고 theme을 통해 사용

질문 2: 특정 도메인(카드, 섹션 등)에 특화된 복합 스타일인가?
  → compositions/에 추가

질문 3: 하나의 컴포넌트에서만 사용되는가?
  → 컴포넌트 파일 내부에 정의
```

---

## 접근성/모션 규칙

- 전역적으로 `prefers-reduced-motion: reduce`를 지원합니다 (GlobalStyle).
  framer-motion 애니메이션은 `<MotionConfig reducedMotion="user">`로 감싸져 있습니다.
- 호버 전용 UI에는 `:focus-visible` / `focus-within` 대응을 함께 넣어
  키보드 사용자가 같은 기능에 접근할 수 있게 합니다.
- 인터랙션 트리거는 `<div onClick>`이 아니라 `<button>`/`<a>`를 사용합니다.
