// Navbar toggle
const menuBtn = document.querySelector(".dropdownimg");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// hero-image-change
const hero = document.querySelector(".product-hero");

const heroImages = [
  "product2.jfif",
  "hm.webp",
  "product6.jfif",
  "product1.png",
];

let currentImage = 0;

setInterval(() => {
  currentImage++;

  if (currentImage >= heroImages.length) {
    currentImage = 0;
  }

  hero.style.backgroundImage = `url(${heroImages[currentImage]})`;
}, 6000);

// PRODUCT DATA
const products = [
  {
    id: 1,
    name: "Dr.Rashel Vitamin C Serum",
    category: "Serum",
    price: 18000,
    image: "serum.jpg",
    description: "Deep nourishment for radiant glowing skin.",
  },

  {
    id: 2,
    name: "Cerave Hydrating Cleanser",
    category: "Cleanser",
    price: 15000,
    image: "ce3.avif",
    description: "Removes impurities while keeping skin hydrated.",
  },

  {
    id: 3,
    name: "Simple Daily Moisturizer",
    category: "Moisturizer",
    price: 22000,
    image: "simple.jpg",
    description: "Lightweight moisture for soft healthy skin.",
  },

  {
    id: 4,
    name: "BioAqua Face Mask",
    category: "Mask",
    price: 20000,
    image: "facemask1.jpg",
    description: "Refresh and revive tired dull skin.",
  },

  {
    id: 5,
    name: "Nivea Sunscreen SPF 50",
    category: "Sunscreen",
    price: 25000,
    image: "sunscreen1.webp",
    description: "Broad spectrum protection for all skin types.",
  },

  {
    id: 6,
    name: "Botany Fruit Face Mask",
    category: "Mask",
    price: 5000,
    image: "facemask3.jpeg",
    description: "Refresh and revive tired dull skin.",
  },

  {
    id: 7,
    name: "Clean Clear Hydrating Cleanser",
    category: "Cleanser",
    price: 15000,
    image: "cleanser.jfif",
    description: "Removes impurities while keeping skin hydrated.",
  },

  {
    id: 8,
    name: "The Odinary facial serum",
    category: "Serum",
    price: 18000,
    image: "faciaoil1.jpg",
    description: "Deep nourishment for radiant glowing face.",
  },

  {
    id: 5,
    name: "Cerva Sunscreen SPF 50",
    category: "Sunscreen",
    price: 18000,
    image: "cerave4.jpg",
    description: "Broad spectrum protection for all skin types.",
  },

  {
    id: 3,
    name: "Sadoer Daily Moisturizer",
    category: "Moisturizer",
    price: 12000,
    image: "moisturizer2.avif",
    description: "Lightweight moisture for soft healthy skin.",
  },
];

// RENDER PRODUCTS
const productsGrid = document.getElementById("productsGrid");

function renderProducts(productArray) {
  productsGrid.innerHTML = "";

  productArray.forEach((product) => {
    productsGrid.innerHTML += `

      <article class="product-card">

        <div class="product-image">
          <img src="${product.image}" alt="${product.name}">
        </div>

        <span class="product-category">
          ${product.category}
        </span>

        <h3>${product.name}</h3>

        <p>${product.description}</p>

        <div class="product-bottom">

          <span class="price">
            ₦${product.price.toLocaleString()}
          </span>

          <button
            class="add-cart-btn"
            onclick="addToCart(${product.id})"
          >
            Add to Cart
          </button>

        </div>

      </article>

    `;
  });
}

renderProducts(products);

// CATEGORY FILTER
const categoryBtns = document.querySelectorAll(".category-btn");

categoryBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    categoryBtns.forEach((button) => {
      button.classList.remove("active");
    });

    btn.classList.add("active");

    const category = btn.dataset.category;

    if (category === "All") {
      renderProducts(products);
    } else {
      const filteredProducts = products.filter((product) => {
        return product.category === category;
      });

      renderProducts(filteredProducts);
    }
  });
});

// CART
let cart = [];

const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");
const cartFooter = document.querySelector(".cart-footer");
const toast = document.getElementById("toast");

// OPEN CART
document.getElementById("cartIcon").addEventListener("click", () => {
  cartDrawer.classList.add("active");
  cartOverlay.classList.add("active");
});

// CLOSE CART
document.getElementById("closeCart").addEventListener("click", closeCart);

cartOverlay.addEventListener("click", closeCart);

function closeCart() {
  cartDrawer.classList.remove("active");
  cartOverlay.classList.remove("active");
}

// ADD TO CART
function addToCart(id) {
  const existingItem = cart.find((item) => item.id === id);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    const product = products.find((item) => item.id === id);

    cart.push({
      ...product,
      quantity: 1,
    });
  }

  updateCart();
  showToast();
}

// UPDATE CART
const emptyCart = document.getElementById("emptyCart");

function updateCart() {
  cartItems.innerHTML = "";

  let total = 0;
  let totalItems = 0;

  if (cart.length === 0) {
    emptyCart.style.display = "flex";
    cartItems.style.display = "none";
    cartFooter.style.display = "none";
  } else {
    emptyCart.style.display = "none";
    cartItems.style.display = "block";
    cartFooter.style.display = "block";

    cart.forEach((item) => {
      total += item.price * item.quantity;
      totalItems += item.quantity;

      cartItems.innerHTML += `
        <div class="cart-item">

          <img src="${item.image}" />

          <div class="cart-item-info">
            <h4>${item.name}</h4>
            <p>₦${item.price.toLocaleString()}</p>

            <div class="quantity-controls">
              <button onclick="changeQuantity(${item.id}, -1)">-</button>
              <span>${item.quantity}</span>
              <button onclick="changeQuantity(${item.id}, 1)">+</button>
            </div>

            <div class="remove-btn" onclick="removeItem(${item.id})">
              Remove
            </div>

          </div>

        </div>
      `;
    });
  }

  cartTotal.textContent = `₦${total.toLocaleString()}`;
  cartCount.textContent = totalItems;
}

// CHANGE QUANTITY
function changeQuantity(id, amount) {
  const item = cart.find((product) => product.id === id);

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter((product) => product.id !== id);
  }

  updateCart();
}

// REMOVE ITEM
function removeItem(id) {
  cart = cart.filter((item) => item.id !== id);

  updateCart();
}

// WHATSAPP CHECKOUT
whatsappBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    return; // do nothing
  }

  let message = "Hello, I would like to place an order for:%0A%0A";

  cart.forEach((item) => {
    message += `${item.quantity}x ${item.name} - ₦${(
      item.price * item.quantity
    ).toLocaleString()}%0A`;
  });

  const total = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  message += `%0ATotal: ₦${total.toLocaleString()}`;

  window.open(`https://wa.me/2349012345678?text=${message}`, "_blank");
});

// TOAST NOTIFICATION
function showToast() {
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

updateCart();
