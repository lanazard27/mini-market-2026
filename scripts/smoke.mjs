/**
 * 스모크 테스트(smoke test) = "최소한의 필수 요소가 있는지" 빠르게 확인하는 테스트
 *
 * 여기서는 초보가 자주 하는 실수(HTML id 이름 틀림)를 자동으로 잡아줍니다.
 * - HTML에 필수 id가 없으면 실패
 * - JS가 그 id를 getElementById로 찾지 않으면 실패
 */

import fs from 'node:fs';

function mustInclude(text, needle) {
  if (!text.includes(needle)) {
    console.error(`❌ Missing in file: ${needle}`);
    process.exit(1);
  }
}

function mustMatch(text, regex, label) {
  if (!regex.test(text)) {
    console.error(`❌ Missing pattern: ${label}`);
    process.exit(1);
  }
}

const html = fs.readFileSync('src/index.html', 'utf8');
const js = fs.readFileSync('src/app.js', 'utf8');

// HTML에 있어야 하는 id들
[
  'id="searchInput"',
  'id="categorySelect"',
  'id="productGrid"',
  'id="openCartBtn"',
  'id="cartDrawer"',
  'id="closeCartBtn"',
  'id="ordersList"'
].forEach((x) => mustInclude(html, x));

// JS가 DOM을 제대로 찾고 있는지(따옴표 ' " 둘 다 허용)
['searchInput', 'categorySelect', 'productGrid'].forEach((id) => {
  const re = new RegExp(`getElementById\\((['"])${id}\\1\\)`);
  mustMatch(js, re, `getElementById('${id}')`);
});

console.log('✅ smoke test passed');
