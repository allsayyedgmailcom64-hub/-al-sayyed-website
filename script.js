// AL SAYYED Website

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
  const count = document.getElementById("cart-count");
  if (count) {
    count.innerText = cart.reduce((t, i) => t + (i.quantity || 1), 0);
  }
}

function loadFeaturedProducts() {
  const container = document.getElementById("featuredProducts");
  if (!container) return;

  container.innerHTML = "";

  products.forEach(product => {
    container.innerHTML += `
      <div class="card">
        <img src="${product.image}" alt="${product.name}">
        <div class="card-content">
          <h3>${product.name}</h3>
          <p class="price">₹${product.price}</p>
          <button onclick="addToCart(${product.id})">
            Add to Cart
          </button>
        </div>
      </div>
    `;
  });
}

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

  alert(product.name + " added to cart.");
}
// Banner Slider

const banners = [
  "banner1.jpg",
  "banner2.jpg",
  "banner3.jpg"
];

let bannerIndex = 0;

function startBannerSlider() {
  const banner = document.getElementById("banner");
  if (!banner) return;

  setInterval(() => {
    bannerIndex = (bannerIndex + 1) % banners.length;
    banner.src = banners[bannerIndex];
  }, 3000);
}

// Search

function searchProducts() {
  const input = document
    .getElementById("search")
    .value
    .toLowerCase();

  if (!input) {
    loadFeaturedProducts();
    return;
  }

  const container = document.getElementById("featuredProducts");

  container.innerHTML = "";

  products
    .filter(product =>
      product.name.toLowerCase().includes(input)
    )
    .forEach(product => {

      container.innerHTML += `
      <div class="card">
      <img src="${product.image}">
      <div class="card-content">
      <h3>${product.name}</h3>
      <p class="price">₹${product.price}</p>

      <button onclick="addToCart(${product.id})">
      Add to Cart
      </button>

      </div>
      </div>
      `;

    });
}

// Load Website

document.addEventListener("DOMContentLoaded", () => {

  updateCartCount();

  loadFeaturedProducts();

  startBannerSlider();

});