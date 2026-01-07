/*
  app.js = 동작(로직) 담당

  이 파일에서 하는 일:
  1) 상품 목록을 화면에 그린다(renderProducts)
  2) 검색/카테고리 필터를 적용한다
  3) 장바구니에 담고 수량을 바꾼다(renderCart)
  4) 주문(가짜)을 저장하고 보여준다(renderOrders)

  초보 팁:
  - "상태(state)"는 지금 프로그램이 기억하는 데이터예요.
  - 우리는 cart(장바구니), orders(주문내역)를 state로 사용합니다.
  - 새로고침해도 남게 하려면 localStorage에 저장합니다.
*/

// ===== 1) 샘플 상품 데이터(보통은 서버에서 오지만, 지금은 배열로) =====
const PRODUCTS = [
  { id: 'p1', name: '사과 1kg', price: 5900, category: 'FRUIT', emoji: '🍎' },
  { id: 'p2', name: '바나나 한 송이', price: 4500, category: 'FRUIT', emoji: '🍌' },
  { id: 'p3', name: '오렌지 6개', price: 7200, category: 'FRUIT', emoji: '🍊' },
  { id: 'p4', name: '콜라 500ml', price: 1800, category: 'DRINK', emoji: '🥤' },
  { id: 'p5', name: '생수 2L', price: 1200, category: 'DRINK', emoji: '💧' },
  { id: 'p6', name: '감자칩', price: 2500, category: 'SNACK', emoji: '🥔' },
  { id: 'p7', name: '초코바', price: 1500, category: 'SNACK', emoji: '🍫' },
  { id: 'p8', name: '휴지(롤)', price: 8900, category: 'DAILY', emoji: '🧻' }
];

// ===== 2) 화면 요소(DOM) 가져오기 =====
// id는 index.html에 있는 것과 정확히 같아야 합니다.
const productGrid = document.getElementById('productGrid');
const searchInput = document.getElementById('searchInput');
const categorySelect = document.getElementById('categorySelect');

const openCartBtn = document.getElementById('openCartBtn');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartDrawer = document.getElementById('cartDrawer');

const cartCount = document.getElementById('cartCount');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');

const checkoutBtn = document.getElementById('checkoutBtn');
const clearCartBtn = document.getElementById('clearCartBtn');

const ordersList = document.getElementById('ordersList');
const clearOrdersBtn = document.getElementById('clearOrdersBtn');

const toast = document.getElementById('toast');

// ===== 3) localStorage 키(저장할 때 이름표) =====
const CART_KEY = 'mini_market_cart_v1';
const ORDERS_KEY = 'mini_market_orders_v1';

// ===== 4) 상태(state) =====
// cart 구조 예시: [{ productId: 'p1', qty: 2 }, ...]
let cart = loadFromStorage(CART_KEY, []);
let orders = loadFromStorage(ORDERS_KEY, []);

// ===== 5) 유틸(도우미 함수) =====
function formatWon(num) {
  // 5900 -> "5,900원"
  return num.toLocaleString('ko-KR') + '원';
}

function categoryName(code) {
  if (code === 'FRUIT') return '과일';
  if (code === 'DRINK') return '음료';
  if (code === 'SNACK') return '과자';
  if (code === 'DAILY') return '생활';
  return '기타';
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 1200);
}

function openCart() {
  cartDrawer.classList.remove('hidden');
}

function closeCart() {
  cartDrawer.classList.add('hidden');
}

function loadFromStorage(key, fallback) {
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;

  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// ===== 6) 상품 렌더링 =====
function getFilteredProducts() {
  const keyword = searchInput.value.trim().toLowerCase();
  const category = categorySelect.value;

  return PRODUCTS.filter((p) => {
    const okKeyword = p.name.toLowerCase().includes(keyword);
    const okCategory = category === 'ALL' ? true : p.category === category;
    return okKeyword && okCategory;
  });
}

function renderProducts() {
  const list = getFilteredProducts();
  productGrid.innerHTML = '';

  if (list.length === 0) {
    const div = document.createElement('div');
    div.className = 'desc';
    div.textContent = '검색 결과가 없어요.';
    productGrid.appendChild(div);
    return;
  }

  for (const p of list) {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <div class="thumb">${p.emoji}</div>
      <div class="card-body">
        <h3 class="card-title">${p.name}</h3>
        <div class="meta">
          <span>${categoryName(p.category)}</span>
          <span class="price">${formatWon(p.price)}</span>
        </div>
        <div style="margin-top:10px; display:flex; gap:8px;">
          <button class="btn primary" data-add="${p.id}">장바구니 담기</button>
        </div>
      </div>
    `;

    productGrid.appendChild(card);
  }

  // "담기" 버튼 이벤트 연결
  productGrid.querySelectorAll('[data-add]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const productId = btn.getAttribute('data-add');
      addToCart(productId, 1);
    });
  });
}

// ===== 7) 장바구니 로직 =====
function findProduct(productId) {
  return PRODUCTS.find((p) => p.id === productId);
}

function updateCartCountBadge() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  cartCount.textContent = String(count);
}

function addToCart(productId, qty) {
  const existing = cart.find((item) => item.productId === productId);

  if (existing) {
    cart = cart.map((item) => {
      if (item.productId !== productId) return item;
      return { ...item, qty: item.qty + qty };
    });
  } else {
    cart = [...cart, { productId, qty }];
  }

  saveToStorage(CART_KEY, cart);
  renderCart();
  showToast('장바구니에 담았어요!');
}

function changeQty(productId, delta) {
  cart = cart
    .map((item) => {
      if (item.productId !== productId) return item;
      return { ...item, qty: item.qty + delta };
    })
    .filter((item) => item.qty > 0);

  saveToStorage(CART_KEY, cart);
  renderCart();
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.productId !== productId);
  saveToStorage(CART_KEY, cart);
  renderCart();
}

function clearCart() {
  cart = [];
  saveToStorage(CART_KEY, cart);
  renderCart();
}

function calcCartTotal() {
  return cart.reduce((sum, item) => {
    const p = findProduct(item.productId);
    if (!p) return sum;
    return sum + p.price * item.qty;
  }, 0);
}

function renderCart() {
  cartItems.innerHTML = '';
  updateCartCountBadge();

  if (cart.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'desc';
    empty.textContent = '장바구니가 비어 있어요.';
    cartItems.appendChild(empty);

    cartTotal.textContent = formatWon(0);
    return;
  }

  for (const item of cart) {
    const p = findProduct(item.productId);
    if (!p) continue;

    const row = document.createElement('div');
    row.className = 'cart-row';

    row.innerHTML = `
      <div class="cart-row-top">
        <div>
          <div class="cart-name">${p.emoji} ${p.name}</div>
          <div class="desc" style="margin:4px 0 0;">${formatWon(p.price)} / 개</div>
        </div>
        <div class="desc">x ${item.qty}</div>
      </div>

      <div class="cart-actions">
        <button class="smallbtn" data-minus="${p.id}">-</button>
        <button class="smallbtn" data-plus="${p.id}">+</button>
        <button class="smallbtn danger" data-remove="${p.id}">삭제</button>
      </div>
    `;

    cartItems.appendChild(row);
  }

  // 이벤트 연결
  cartItems.querySelectorAll('[data-minus]').forEach((btn) => {
    btn.addEventListener('click', () => changeQty(btn.getAttribute('data-minus'), -1));
  });
  cartItems.querySelectorAll('[data-plus]').forEach((btn) => {
    btn.addEventListener('click', () => changeQty(btn.getAttribute('data-plus'), +1));
  });
  cartItems.querySelectorAll('[data-remove]').forEach((btn) => {
    btn.addEventListener('click', () => removeFromCart(btn.getAttribute('data-remove')));
  });

  cartTotal.textContent = formatWon(calcCartTotal());
}

// ===== 8) 주문(가짜 결제) =====
function checkout() {
  if (cart.length === 0) {
    showToast('장바구니가 비어 있어요!');
    return;
  }

  const total = calcCartTotal();
  const order = {
    id: 'o_' + Date.now(),
    createdAt: new Date().toISOString(),
    items: cart.map((x) => ({ ...x })),
    total
  };

  orders = [order, ...orders];
  saveToStorage(ORDERS_KEY, orders);

  clearCart();
  renderOrders();
  showToast('주문 완료(가짜)!');
}

function clearOrders() {
  orders = [];
  saveToStorage(ORDERS_KEY, orders);
  renderOrders();
  showToast('주문 내역을 지웠어요.');
}

function renderOrders() {
  ordersList.innerHTML = '';

  if (orders.length === 0) {
    const div = document.createElement('div');
    div.className = 'desc';
    div.textContent = '아직 주문 내역이 없어요.';
    ordersList.appendChild(div);
    return;
  }

  // 최근 5개만 보여주기(학습용)
  for (const o of orders.slice(0, 5)) {
    const div = document.createElement('div');
    div.className = 'order-item';

    const lines = o.items.map((it) => {
      const p = findProduct(it.productId);
      const name = p ? p.name : it.productId;
      return `${name} x ${it.qty}`;
    });

    const when = new Date(o.createdAt).toLocaleString('ko-KR');

    div.innerHTML = `
      <div style="display:flex; justify-content:space-between; gap:10px;">
        <strong>주문 #${o.id}</strong>
        <span class="small">${when}</span>
      </div>
      <div class="small" style="margin-top:6px;">${lines.join(', ')}</div>
      <div style="margin-top:8px; font-weight:800;">총액: ${formatWon(o.total)}</div>
    `;

    ordersList.appendChild(div);
  }
}

// ===== 9) 이벤트 연결 =====
searchInput.addEventListener('input', renderProducts);
categorySelect.addEventListener('change', renderProducts);

openCartBtn.addEventListener('click', openCart);
closeCartBtn.addEventListener('click', closeCart);

clearCartBtn.addEventListener('click', () => {
  clearCart();
  showToast('장바구니를 비웠어요.');
});

checkoutBtn.addEventListener('click', checkout);
clearOrdersBtn.addEventListener('click', clearOrders);

// ===== 10) 첫 화면 그리기 =====
renderProducts();
renderCart();
renderOrders();
// Issue C 기능 구현 확인 완료
