# Funnel 기반 회원가입 UI 구현

## 구현 내용

### 1. app/page.tsx 수정

**useFunnel 훅 설정:**

- `@use-funnel/browser`에서 `useFunnel` import
- funnel id: 'signup-funnel'
- initial step: 'idInput'
- context에 폼 데이터 저장

**8단계 Funnel 구성:**

1. **idInput** - 아이디 입력
2. **passwordInput** - 비밀번호 입력
3. **passwordConfirm** - 비밀번호 확인 (새로 추가)
4. **nameInput** - 이름 입력
5. **emailInput** - 이메일 입력
6. **phoneInput** - 전화번호 입력
7. **birthdayInput** - 생년월일 입력
8. **genderInput** - 성별 선택

**각 단계 구성:**

- HeroUI Input/Select 컴포넌트 사용
- Glassmorphism 스타일 유지
- 각 단계에서 입력값을 로컬 state로 관리
- zod를 사용한 개별 필드 검증
- 검증 통과 시 history.push로 다음 단계 이동하며 context에 데이터 저장
- "이전" 버튼으로 이전 단계로 돌아가기 (history.back())

**최종 단계:**

- 모든 입력 데이터를 context에서 가져와 console.log 출력
- 성공 메시지 표시

**스타일링:**

- 현재의 glassmorphism 배경 유지
- 각 단계 카드는 애니메이션 효과 (fade-in)
- 진행률 표시 (1/8, 2/8, ...)

### 2. schemas/signup.ts 활용

- 기존 signupSchema에서 개별 필드 검증 로직 추출
- 각 단계에서 해당 필드만 검증

### 주요 변경사항

- react-hook-form의 전체 폼 방식에서 funnel 기반 단계별 입력으로 전환
- 각 단계는 독립적인 검증과 상태 관리
- context를 통한 데이터 공유