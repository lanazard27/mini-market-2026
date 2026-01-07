# AGENT_RULES (에이전트/AI 작업 규칙)

이 규칙은 "AI가 여러 개의 PR을 만들어도" 충돌이 안 나게 하기 위한 규칙이다.

## 1) 작업 규칙(충돌 방지)
1) 한 PR은 한 Issue만 해결한다.
2) 한 Issue는 지정된 파일 1개만 수정한다.
   - HTML: src/index.html
   - CSS: src/styles.css
   - JS: src/app.js
3) 모르면 추측하지 말고, Issue에 질문 코멘트를 남긴다.

## 2) 코드 규칙(학습용)
- 중학생도 이해할 주석을 충분히 단다.
- 변수/함수 이름은 쉬운 영어로 짓는다.
- 콘솔 에러 0개를 목표로 한다.

## 3) PR 규칙(테스트/설명)
- PR 설명에 아래를 꼭 포함한다:
  - 변경 요약(1~3줄)
  - 테스트 방법(체크리스트)
  - 스크린샷(가능하면)

## 4) 자동화 규칙(GitHub Actions)
- PR이 올라오면 CI가 자동 실행된다.
- 포맷(줄바꿈/정렬)은 AutoFix가 자동으로 커밋할 수 있다.
- CI가 빨간불이면 Fixer가 로그를 보고 고쳐서 초록불을 만든다.

## 5) 에이전트 역할 정의
- **Planner**: PRD/TODO 기반으로 Issue 생성
- **Builder**: Issue 하나 해결하는 PR 생성
- **Fixer**: CI가 실패한 PR을 찾아서 로그 기반 수정 커밋
- **Reviewer**: PR 리뷰 후 머지 조건 확인

## 6) GitHub MCP 운영 가이드
- Planner Agent는 새로운 이슈 생성 시 TODO.md 기반으로 작업
- Builder Agent는 Issue에 할당된 파일만 수정하고 PR 생성
- Fixer Agent는 CI 실패 시 자동으로 수정 커밋
- Reviewer Agent는 PR이 모든 조건 만족 시 머지 승인

## 7) 충돌 방지 전략
- Issue 생성 시 반드시 다른 Issue와 겹치지 않는 시간 확인
- 동시 여러 PR 방지를 위해 Issue당 하나의 PR만 허용
- 실패한 PR은 자동으로 롤백 후 재시도
