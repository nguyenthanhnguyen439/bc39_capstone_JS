function addItem(e) {
  let t = e.parentElement.parentElement.parentElement.parentElement.parentElement;
  if ("flex" == t.getElementsByClassName("out-of-stock-cover")[0].style.display) return;
  let n = t.getElementsByClassName("product-name")[0].innerText,
    a = parseFloat(t.getElementsByClassName("product-price")[0].innerText.replace("$ ", "")),
    s = t.getElementsByClassName("product-img")[0].src;
  SwitchBtns(t);
  let i = { name: n, price: a, imgSrc: s, id: t.getAttribute('data-product-id'), qty: 1 };
  CartItems(i), cartDetails.push(i), RenderCart(), CartItemsTotal();
  addStorage();
}
function removeItem(e) {
  let t = e.parentElement.getElementsByClassName("name")[0].innerText,
    n = document.getElementsByClassName("product-name");
  cartDetails.forEach((e, a) => {
    if (t == e.name) {
      cartDetails.splice(a, 1);
      for (let e of n)
        if (t == e.innerText) {
          SwitchBtns(e.parentElement.parentElement);
        }
    }
  }),
    RenderCart(),
    CartIsEmpty(),
    CartItemsTotal();
  addStorage();
}
function addStorage() {
  localStorage.setItem('carts', JSON.stringify(cartDetails));
}
function clearStorage() {
  localStorage.clear();
}
function clearCart() {
  ToggleBackBtns(), (cartDetails.length = 0), RenderCart(), CartIsEmpty(), CartItemsTotal(), clearStorage();
}
function qtyChange(e, t) {
  let n = e.parentElement.parentElement,
    a = n.classList.contains("btn-add") ? n.parentElement.parentElement.getElementsByClassName("product-name")[0].innerText : n.parentElement.getElementsByClassName("name")[0].innerText,
    s = document.getElementsByClassName("product-name");
  for (let e of s)
    if (a == e.innerText) {
      let s = e.parentElement.parentElement.getElementsByClassName("qty-change")[0];
      cartDetails.forEach((e, i) => {
        a == e.name &&
        ("add" == t && e.qty < 10
          ? ((e.qty += 1), (n.innerHTML = QtyBtn(e.qty)), (s.innerHTML = QtyBtn(e.qty)))
          : "sub" == t
            ? ((e.qty -= 1), (n.innerHTML = QtyBtn(e.qty)), (s.innerHTML = QtyBtn(e.qty)), e.qty < 1 && (cartDetails.splice(i, 1), (s.innerHTML = AddBtn()), s.classList.toggle("qty-change")))
            : ((document.getElementsByClassName("purchase-cover")[0].style.display = "block"), (document.getElementsByClassName("stock-limit")[0].style.display = "flex"), sideNav(0)));
      });
    }
  RenderCart(), CartIsEmpty(), CartItemsTotal();
}
function limitPurchase(e) {
  (document.getElementsByClassName("purchase-cover")[0].style.display = "none"), (e.parentElement.style.display = "none"), sideNav(1);
}
function sideNav(e) {
  let t = document.getElementsByClassName("side-nav")[0],
    n = document.getElementsByClassName("cover")[0];
  (t.style.right = e ? "0" : "-100%"), (n.style.display = e ? "block" : "none"), CartIsEmpty();
}
function buy(e) {
  0 != cartDetails.length && (sideNav(!e), (document.getElementsByClassName("purchase-cover")[0].style.display = e ? "block" : "none"), (document.getElementsByClassName("order-now")[0].innerHTML = e ? Purchase() : ""));
}
function order() {
  let e = document.getElementsByClassName("invoice")[0];
  (e.style.height = "500px"), (e.style.width = "400px"), (e.innerHTML = OrderConfirm()), ToggleBackBtns(), Stocks(), clearCart();
}
function okay(e) {
  let t = document.getElementsByClassName("invoice")[0];
  "continue" == e.target.innerText
    ? ((t.style.display = "none"), (document.getElementsByClassName("purchase-cover")[0].style.display = "none"))
    : ((e.target.innerText = "continue"), (e.target.parentElement.getElementsByClassName("order-details")[0].innerHTML = "<em class='thanks'>Thanks for shopping with us</em>"), (t.style.height = "180px"));
}
function AddBtn() {
  return "\n  <div>\n    <button onclick='addItem(this)' class='add-btn'>Add <i class='fas fa-chevron-right'></i></button>\n  </div>";
}
function QtyBtn(e = 1) {
  return 0 == e
    ? AddBtn()
    : `\n  <div>\n    <button class='btn-qty' onclick="qtyChange(this,'sub')"><i class='fas fa-chevron-left'></i></button>\n    <p class='qty'>${e}</p>\n    <button class='btn-qty' onclick="qtyChange(this,'add')"><i class='fas fa-chevron-right'></i></button>\n  </div>`;
}
function Product(e = {}) {
  let { name: t, price: n, imageUrl: a, screen: s, des: i, backCamera: b, frontCamera: f } = e;
  return `<div class='card' data-product-id='${e.id}'>
  <div class='top-bar'>
    <i class='fab fa-apple'></i>
    <em class="stocks">In Stock</em>
  </div>
  <div class='img-container'>
    <img class='product-img' src='${a}' alt='' />
    <div class='out-of-stock-cover'>
      <span>Out Of Stock</span>
    </div>
  </div>
  <div class='details'>
    <div class='name-fav'>
      <strong class='product-name'>${t}</strong>
      <button onclick='this.classList.toggle("fav")' class='heart'>
        <i class='fas fa-heart'></i>
      </button>
    </div>
    <div class='wrapper'>
      <p>Màn hình: ${s}</p>
      <p>Camera sau: ${b}</p>
      <p>Camera trước: ${f}</p>
      <p>${i}</p>
    </div>
    <div class='purchase'>
      <p class='product-price'>$ ${n}</p>
      <span class='btn-add'>${AddBtn()}</span>
    </div>
  </div>
</div>`;
}
function CartItems(e = {}) {
  let { name: t, price: n, imgSrc: a, qty: s } = e;
  return `\n  <div class='cart-item'>\n    <div class='cart-img'>\n      <img src='${a}' alt='' />\n    </div>\n    <strong class='name'>${t}</strong>\n    <span class='qty-change'>${QtyBtn(s)}</span>\n    <p class='price'>$ ${
    n * s
  }</p>\n    <button onclick='removeItem(this)'><i class='fas fa-trash'></i></button>\n  </div>`;
}
function Banner() {
  return `\n  <div class='banner'>\n  <div class="filter w-100">${ApplyFilter()}</div>  \n    <div class='main-cart'>${DisplayProducts()}</div>\n  \n    <div class='nav'>\n      <button onclick='sideNav(1)'><i class='fas fa-shopping-cart' style='font-size:2rem;'></i></button>\n      <span class= 'total-qty'>0</span>\n    </div>\n    <div onclick='sideNav(0)' class='cover'></div>\n    <div class='cover purchase-cover'></div>\n    <div class='cart'>${CartSideNav()}</div>\n    <div class='stock-limit'>\n      <em>You Can Only Buy 10 Items For Each Product</em>\n      <button class='btn-ok' onclick='limitPurchase(this)'>Okay</button>\n    </div>\n  <div  class='order-now'></div>\n  </div>`;
}
function CartSideNav() {
  return "\n  <div class='side-nav'>\n    <button onclick='sideNav(0)'><i class='fas fa-times'></i></button>\n    <h2>Cart</h2>\n    <div class='cart-items'></div>\n    <div class='final'>\n      <strong>Total: $ <span class='total'>0</span></strong>\n      <div class='action'>\n        <button onclick='buy(1)' class='btn buy'>Purchase <i class='fas fa-credit-card' style='color:#6665dd;'></i></button>\n        <button onclick='clearCart()' class='btn clear'>Clear Cart <i class='fas fa-trash' style='color:#bb342f;'></i></button>\n      </div>\n    </div>\n  </div>";
}
function Purchase() {
  let e = document.getElementsByClassName("total")[0].innerText,
    t = cartDetails.map((e) => `<span>${e.qty} x ${e.name}</span>`),
    n = cartDetails.map((e) => `<span>$ ${e.price * e.qty}</span>`);
  return `\n  <div class='invoice'>\n    <div class='shipping-items'>\n      <div class='item-names'>${t.join("")}</div>\n      <div class='items-price'>${n.join(
    "+"
  )}</div>\n    </div>\n  <hr>\n    <div class='payment'>\n      <em>payment</em>\n      <div>\n        <p>total amount to be paid:</p><span class='pay'>$ ${e}</span>\n      </div>\n    </div>\n    <div class='order'>\n      <button onclick='order()' class='btn-order btn'>Order Now</button>\n      <button onclick='buy(0)' class='btn-cancel btn'>Cancel</button>\n    </div>\n  </div>`;
}
function OrderConfirm() {
  return `\n  <div>\n    <div class='order-details'>\n      <em>your order has been placed</em>\n      <p>Your order-id is : <span>${Math.round(
    1e3 * Math.random()
  )}</span></p>\n      <p>your order will be delivered to you in 3-5 working days</p>\n      <p>you can pay <span>$ ${
    document.getElementsByClassName("total")[0].innerText
  }</span> by card or any online transaction method after the products have been dilivered to you</p>\n    </div>\n    <button onclick='okay(event)' class='btn-ok'>okay</button>\n  </div>`;
}
function DisplayProducts() {
  return productDetails.map((e) => Product(e)).join("");
}
function DisplayCartItems() {
  return cartDetails.map((e) => CartItems(e)).join("");
}
function RenderCart() {
  document.getElementsByClassName("cart-items")[0].innerHTML = DisplayCartItems();
}
function SwitchBtns(e) {
  let t = e.getElementsByClassName("btn-add")[0];
  t.classList.toggle("qty-change");
  let n = t.classList.contains("qty-change");
  e.getElementsByClassName("btn-add")[0].innerHTML = n ? QtyBtn() : AddBtn();
}
function ToggleBackBtns() {
  let e = document.getElementsByClassName("btn-add");
  for (let t of e) t.classList.contains("qty-change") && t.classList.toggle("qty-change"), (t.innerHTML = AddBtn());
}
function CartIsEmpty() {
  0 == cartDetails.length && (document.getElementsByClassName("cart-items")[0].innerHTML = "<span class='empty-cart'>Looks Like You Haven't Added Any Product In The Cart</span>");
}
function CartItemsTotal() {
  let e = cartDetails.reduce((e, t) => e + t.price * t.qty, 0),
    t = cartDetails.reduce((e, t) => e + t.qty, 0);
  (document.getElementsByClassName("total")[0].innerText = e), (document.getElementsByClassName("total-qty")[0].innerText = t);
}
function Stocks() {
  cartDetails.forEach((e) => {
    productDetails.forEach((t) => {
      e.name == t.name &&
      t.qty >= 0 &&
      ((t.qty -= e.qty),
        t.qty < 0
          ? ((t.qty += e.qty), (document.getElementsByClassName("invoice")[0].style.height = "180px"), (document.getElementsByClassName("order-details")[0].innerHTML = "<em class='thanks'>Stocks Limit Exceeded</em>"))
          : 0 == t.qty
            ? OutOfStock(t, 1)
            : t.qty <= 5 && OutOfStock(t, 0));
    });
  });
}
function OutOfStock(e, t) {
  let n = document.getElementsByClassName("card");
  for (let a of n) {
    let n = a.getElementsByClassName("stocks")[0],
      s = a.getElementsByClassName("product-name")[0].innerText;
    e.name == s && (t ? ((a.getElementsByClassName("out-of-stock-cover")[0].style.display = "flex"), (n.style.display = "none")) : ((n.innerText = "Only Few Left"), (n.style.color = "orange")));
  }
}

function ApplyFilter() {
  return `<div class="container">
    <form class="flex-grow-1">
      <div class="form-group">
        <label for="filter">Filter theo sản phẩm</label>
        <select class="form-control" onchange='renderView.onFilterChange(this)' id="filter">
          <option value="">Tất cả</option>
          <option value="iphone">Iphone</option>
          <option value="samsung">Samsung</option>
        </select>
      </div>
    </form>
  </div>`;
}

function loadCarts() {
  let carts = localStorage.getItem('carts');
  if (carts) {
    carts = JSON.parse(carts);
    cartDetails = carts;
    cartDetails.map(i => {
      SwitchBtns(document.querySelector('[data-product-id="'+i.id+'"]'));
      CartItems(i);
    }), RenderCart() ,CartItemsTotal();
  }
}

function App() {
  return `\n  <div>\n    ${Banner()}\n  </div>`;
}
let productDetails = [],
  cartDetails = [];
// document.getElementById("app").innerHTML = App();
