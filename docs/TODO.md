# TODO (MVP) - Issue로 나눠서 작업하기

## 규칙(중요)
- 한 Issue는 한 파일만 수정한다.
- 한 PR은 한 Issue만 해결한다.
- PR 설명에 "테스트 방법(체크리스트)"를 적는다.

---

## Issue A: HTML 뼈대 (src/index.html만)
완료 기준:
- 아래 id가 HTML에 존재해야 함:
  - searchInput
  - categorySelect
  - productGrid
  - openCartBtn
  - cartDrawer
  - closeCartBtn
  - ordersList
- 장바구니 영역에 cartItems, cartTotal, cartCount도 포함

---

## Issue B: CSS 스타일 (src/styles.css만)
완료 기준:
- 헤더/그리드/드로어(장바구니) 기본 레이아웃이 보기 좋게
- 모바일에서 그리드 1열로(반응형)
- 버튼/카드가 기본적으로 읽기 편함

---

## Issue C: JS 동작 (src/app.js만)
완료 기준:
- PRODUCTS 배열(샘플 데이터)로 상품 카드 렌더링
- 검색/카테고리 필터 적용
- 장바구니:
  - 담기, 수량 +/-, 삭제
  - 총액 표시
  - localStorage 저장/불러오기
- 주문(가짜):
  - 주문하기 버튼 클릭 → 주문 내역 저장/표시
  - 장바구니 비우기
  - localStorage 저장/불러오기

---

## Issue D: 통합/문서/검수 (README.md + 작은 수정 가능)
완료 기준:
- README에 실행 방법 정리
- 스모크 테스트 통과 (npm test)
- CI(깃허브 액션) 초록불
- 기능 체크리스트 통과
