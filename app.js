// ===== AL SAYYED APP =====

// Cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Cart Counter
function updateCartCount() {
  const counter = document.getElementById("cart-count");
  if (!counter) return;

  let total = 0;
  cart.forEach(item => {
    total += item.quantity;
  });

  counter.innerText = total;
}

// Load Products
function loadFeaturedProducts() {

  const container = document.getElementById("featuredProducts");

  if (!container) return;

  container.innerHTML = "";

  products.forEach(product => {

    container.innerHTML += `
      <div class="card">

        <img src="${product.image}" alt="${product.name}">

        <h3>${product.name}</h3>

        <p>₹${product.price}</p>

        <button onclick="addToCart(${product.id})">
        Add to Cart
        </button>

      </div>
    `;

  });

}

// Add To Cart
function addToCart(id){

  const product = products.find(p=>p.id===id);

  if(!product) return;

  const existing = cart.find(i=>i.id===id);

  if(existing){

    existing.quantity++;

  }else{

    cart.push({
      ...product,
      quantity:1
    });

  }

  localStorage.setItem("cart",JSON.stringify(cart));

  updateCartCount();

  alert(product.name+" added to cart");

}
// ===== Banner Slider =====

const banners = [
  "banner1.jpg",
  "banner2.jpg",
  "banner3.jpg"
];

let currentBanner = 0;

function startBannerSlider() {

  const banner = document.getElementById("banner");

  if (!banner) return;

  setInterval(() => {

    currentBanner++;

    if (currentBanner >= banners.length) {
      currentBanner = 0;
    }

    banner.src = banners[currentBanner];

  }, 3000);

}

// ===== Search =====

function searchProducts() {

  const input = document.getElementById("search");

  if (!input) return;

  const keyword = input.value.toLowerCase();

  const container = document.getElementById("featuredProducts");

  if (!container) return;

  container.innerHTML = "";

  products
    .filter(product =>
      product.name.toLowerCase().includes(keyword)
    )
    .forEach(product => {

      container.innerHTML += `
      <div class="card">

      <img src="${product.image}" alt="${product.name}">

      <h3>${product.name}</h3>

      <p>₹${product.price}</p>

      <button onclick="addToCart(${product.id})">
      Add to Cart
      </button>

      </div>
      `;

    });

}
// ===== CART =====

function loadCart() {

  const cartBox = document.getElementById("cartItems");
  const totalBox = document.getElementById("cartTotal");

  if (!cartBox || !totalBox) return;

  cartBox.innerHTML = "";

  if (cart.length === 0) {
    cartBox.innerHTML = "<p>Your cart is empty.</p>";
    totalBox.innerHTML = "Grand Total : ₹0";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {

    total += item.price * item.quantity;

    cartBox.innerHTML += `
      <div class="cart-item">

        <div>
          <h3>${item.name}</h3>
          <p>₹${item.price}</p>
        </div>

        <div>
          <button onclick="changeQty(${index},-1)">-</button>

          <strong>${item.quantity}</strong>

          <button onclick="changeQty(${index},1)">+</button>

          <button onclick="removeItem(${index})">
            Remove
          </button>
        </div>

      </div>
    `;

  });

  totalBox.innerHTML = "Grand Total : ₹" + total;

}

function changeQty(index, value) {

  cart[index].quantity += value;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();

  loadCart();

}

function removeItem(index) {

  cart.splice(index, 1);

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();

  loadCart();

}
// ===== CHECKOUT =====

function loadCheckout() {

  const itemsBox = document.getElementById("checkoutItems");
  const totalBox = document.getElementById("checkoutTotal");

  if (!itemsBox || !totalBox) return;

  itemsBox.innerHTML = "";

  let total = 0;

  cart.forEach(item => {

    total += item.price * item.quantity;

    itemsBox.innerHTML += `
      <p>
        ${item.name} × ${item.quantity}
        - ₹${item.price * item.quantity}
      </p>
    `;

  });

  totalBox.innerHTML = "Grand Total : ₹" + total;

}

function placeOrder() {

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();

  if (!name || !phone || !address) {
    alert("Please fill all details.");
    return;
  }

  let message = `🛍️ AL SAYYED ORDER

Name: ${name}
Phone: ${phone}
Address: ${address}

Products:
`;

  let total = 0;

  cart.forEach(item => {
    message += `${item.name} x${item.quantity} - ₹${item.price * item.quantity}\n`;
    total += item.price * item.quantity;
  });

  message += `\nTotal: ₹${total}`;

  const url =
    "https://wa.me/918433660173?text=" +
    encodeURIComponent(message);

  window.open(url, "_blank");

  localStorage.removeItem("cart");
  cart = [];

  updateCartCount();
}

document.addEventListener("DOMContentLoaded", () => {

  updateCartCount();

  loadFeaturedProducts();

  loadCart();

  loadCheckout();

  startBannerSlider();

});
function addToCart(id) {

    const product = products.find(p => p.id === id);

    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    alert(product.name + " added to cart!");
}
document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    loadFeaturedProducts();

    if (document.getElementById("cartItems")) {
        loadCart();
    }
});