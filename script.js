// =========================
// AL SAYYED - SCRIPT
// =========================

// Banner Slider
const banners = [
  "banner1.jpg",
  "images/banner2.jpg",
  "images/banner3.jpg"
];

let bannerIndex = 0;

function startSlider() {
  const img = document.getElementById("slider-img");

  if (!img) return;

  setInterval(() => {
    bannerIndex = (bannerIndex + 1) % banners.length;
    img.src = banners[bannerIndex];
  }, 3000);
}

// Cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const count = document.getElementById("cart-count");
  if (!count) return;

  let total = 0;
  cart.forEach(item => total += item.quantity);

  count.textContent = total;
}

function addToCart(name, price) {

  const item = cart.find(p => p.name === name);

  if (item) {
    item.quantity++;
  } else {
    cart.push({
      name,
      price,
      quantity: 1
    });
  }

  saveCart();
  alert(name + " added to cart");
}

// Search
function searchProduct() {

  const input = document.getElementById("searchInput");

  if (!input) return;

  const text = input.value.toLowerCase();

  if (text.includes("champion"))
    location.href = "products.html#champion";

  else if (text.includes("rose"))
    location.href = "products.html#rose";

  else if (text.includes("solid"))
    location.href = "products.html#solid";

  else if (text.includes("bakhoor"))
    location.href = "products.html#bakhoor";

  else
    alert("Product not found");
}

document.addEventListener("DOMContentLoaded", () => {
  startSlider();
  updateCartCount();
});
// =========================
// AL SAYYED - SCRIPT PART 2
// =========================

// Load Cart
function loadCart() {

  const cartBox = document.getElementById("cartItems");
  const totalBox = document.getElementById("totalPrice");

  if (!cartBox) return;

  cart = JSON.parse(localStorage.getItem("cart")) || [];

  let html = "";
  let total = 0;

  cart.forEach((item, index) => {

    total += item.price * item.quantity;

    html += `
      <div class="product-card">
        <h3>${item.name}</h3>

        <p>₹${item.price}</p>

        <div class="qty">

          <button onclick="changeQty(${index},-1)">-</button>

          <span>${item.quantity}</span>

          <button onclick="changeQty(${index},1)">+</button>

        </div>

        <p><b>Total ₹${item.price * item.quantity}</b></p>

        <button class="btn"
        onclick="removeItem(${index})">

        Remove

        </button>

      </div>
    `;

  });

  cartBox.innerHTML = html;

  if (totalBox) {
    totalBox.innerHTML = "Grand Total : ₹" + total;
  }

}

function changeQty(index, value) {

  cart[index].quantity += value;

  if (cart[index].quantity <= 0) {
    cart.splice(index,1);
  }

  saveCart();
  loadCart();

}

function removeItem(index){

  cart.splice(index,1);

  saveCart();
  loadCart();

}

document.addEventListener("DOMContentLoaded", () => {

  loadCart();

});
// =========================
// AL SAYYED - SCRIPT PART 3
// =========================

// Checkout
function loadCheckout() {

  const orderSummary = document.getElementById("orderSummary");
  const checkoutTotal = document.getElementById("checkoutTotal");

  if (!orderSummary) return;

  cart = JSON.parse(localStorage.getItem("cart")) || [];

  let html = "";
  let total = 0;

  cart.forEach(item => {

    html += `
      <p>
        ${item.name} × ${item.quantity}
        = ₹${item.price * item.quantity}
      </p>
    `;

    total += item.price * item.quantity;

  });

  orderSummary.innerHTML =
    html || "<p>Your cart is empty.</p>";

  checkoutTotal.textContent =
    "Total : ₹" + total;
}

// WhatsApp Order
function placeOrder() {

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();

  if (!name || !phone || !address) {
    alert("Please fill all details.");
    return;
  }

  let products = "";
  let total = 0;

  cart.forEach(item => {
    products +=
      `${item.name} x${item.quantity} - ₹${item.price * item.quantity}\n`;

    total += item.price * item.quantity;
  });

  const message =
`🛍️ AL SAYYED ORDER

Name: ${name}
Phone: ${phone}
Address: ${address}

Products:
${products}

Total: ₹${total}`;

  const url =
    "https://wa.me/918433660173?text=" +
    encodeURIComponent(message);

  window.open(url, "_blank");
}

document.addEventListener("DOMContentLoaded", () => {
  loadCheckout();
});