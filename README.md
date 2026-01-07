# Mini Market (학습용)

정적(HTML/CSS/JS) 미니 마켓 사이트입니다.

## 이 프로젝트로 배우는 것
- PRD → TODO(Issue)로 쪼개는 방법
- 한 Issue = 한 파일 / 한 PR = 한 Issue 규칙으로 충돌 줄이기
- GitHub Actions로 자동 검사(CI)
- GitHub Actions로 자동 포맷 수정(AutoFix)
- (선택) Claude Code + GitHub MCP로 이슈/PR/리뷰 자동화

---

## 1) 실행 방법(로컬)

### 방법 A: 바로 열기 (가장 간단)
- `src/index.html` 파일을 더블클릭하거나 브라우저로 드래그

### 방법 B: 로컬 서버로 열기 (권장)
```bash
# 프로젝트 루트에서
python -m http.server 8000 --directory src

# 또는 Node.js가 있다면
npx serve src
```
브라우저에서 접속:
- http://localhost:8000
- http://localhost:3000 (serve 사용 시)

### 방법 C: VS Code Live Server
- VS Code의 "Live Server" 확장프로그램 설치
- `src/index.html` 우클릭 → "Open with Live Server"

---

## 2) 개발 도구 설치(Node)
\`\`\`bash
npm install
\`\`\`

### 포맷 정리
\`\`\`bash
npm run format
\`\`\`

### 검사 + 스모크 테스트
\`\`\`bash
npm run ci
\`\`\`

---

## 3) 기능 체크리스트(완성 확인)
- [x] 상품이 보인다 (8개 샘플 상품 표시)
- [x] 검색하면 목록이 바뀐다 (실시간 검색 필터)
- [x] 카테고리 필터가 된다 (전체/과일/음료/과자/생활)
- [x] 장바구니 담기/수량 +/- /삭제가 된다 (완전한 장바구니 기능)
- [x] 총 합계가 맞다 (실시간 금액 계산)
- [x] 주문하기(가짜) 누르면 주문 내역이 생긴다 (localStorage 저장)
- [x] 새로고침해도 장바구니/주문 내역이 유지된다 (영속성 보장)

---

## 4) GitHub 작업 규칙(중요)
- 한 Issue는 한 파일만 수정
- 한 PR은 한 Issue만 해결
- PR 설명에 "테스트 방법(체크리스트)"를 적기

---

## 5) GitHub Actions(자동화)
- PR이 올라오면 자동으로:
  - CI: lint + smoke test
  - AutoFix: prettier로 포맷 정리 후 필요하면 PR 브랜치에 자동 커밋(chore: auto-format)

---

## 6) (선택) Claude Code + GitHub MCP로 운영하기
- Planner: PRD/TODO 기반으로 Issue 생성
- Builder: Issue 하나 해결하는 PR 생성
- Fixer: CI가 실패한 PR을 찾아서 로그 기반 수정 커밋
- Reviewer: PR 리뷰 후 머지 조건 확인

---

## 7) 프로젝트 구조
\`\`\`
mini-market-2026/
├── docs/                   # 문서
│   ├── PRD.md             # 제품 요구사항
│   ├── TODO.md            # 작업 계획
│   └── AGENT_RULES.md     # AI 작업 규칙
├── src/                   # 소스 코드
│   ├── index.html         # HTML 구조
│   ├── styles.css         # 스타일
│   └── app.js            # JavaScript 동작
├── .github/workflows/     # GitHub Actions
├── scripts/               # 빌드 스크립트
└── README.md             # 프로젝트 설명
\`\`\`

## 8) 기술 스택
- HTML5 (시맨틱 마크업)
- CSS3 (반응형 디자인)
- Vanilla JavaScript (ES6+)
- GitHub Actions (CI/CD)
- Prettier, ESLint, Stylelint

## 9) 저장소
https://github.com/lanazard27/mini-market-2026
