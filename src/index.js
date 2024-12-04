
import './styles.css';

// Product Data
const data = {
  products: [
    {
      productId: 'P001',
      productName: 'Wireless Mouse',
      brand: 'Zebronics',
      price: 15.99,
      stockQuantity: 120,
      image: './src/images/sample-product-image.jpg',
    },
    {
      productId: 'P002',
      productName: 'Bluetooth Headphones',
      brand: 'Zebronics',
      price: 455,
      stockQuantity: 80,
      image: './src/images/sample-product-image.jpg',
    },
    {
      productId: 'P003',
      productName: 'Gaming Keyboard',
      brand: 'Zebronics',
      price: 700,
      stockQuantity: 50,
      image: './src/images/sample-product-image.jpg',
    },
    {
      productId: 'P004',
      productName: 'Desk Chair',
      brand: 'Damro',
      price: 12075,
      stockQuantity: 30,
      image: './src/images/sample-product-image.jpg',
    },
  ],
  cart: {},
};


// Elements
const productList = document.getElementById('product-list');
const cartCount = document.getElementById('cart-count');
const modal = document.getElementById('product-modal');
const modalImage = document.getElementById('modal-image');
const modalProductName = document.getElementById('modal-product-name');
const modalBrandName = document.getElementById('modal-brand-name');
const modalPrice = document.getElementById('modal-price');
const quantityInput = document.getElementById('quantity-input');
const closeModal = document.querySelector('.close-modal');
const addToCartButton = document.getElementById('add-to-cart-modal');
const cartSidebar = document.createElement('div');
cartSidebar.id = 'cart-sidebar';
document.body.appendChild(cartSidebar);

// Populate Product List
data.products.forEach(product => {
  const productCard = document.createElement('div');
  productCard.classList.add('product-card');
  productCard.innerHTML = `
    <img src="${product.image}" class="product-image" alt="${product.productName}">
    <h3 class="brand-name">${product.brand}</h3>
    <h3 class="product-name">${product.productName}</h3>
    <p class="price"><span>₹</span>${product.price}</p>
    <button class="add-to-cart">Add to cart</button>
  `;
  productCard.dataset.id = product.productId;
  productList.appendChild(productCard);
});

// Modal Logic
productList.addEventListener('click', e => {
  const productCard = e.target.closest('.product-card');
  if (productCard) {
    const productId = productCard.dataset.id;
    const product = data.products.find(p => p.productId === productId);
    if (product) {
      modalImage.src = product.image;
      modalProductName.textContent = product.productName;
      modalBrandName.textContent = product.brand;
      modalPrice.textContent = `₹${product.price}`;
      quantityInput.value = 1;

      modal.classList.remove('hidden');
    }
  }
});

// Increment/Decrement Quantity
document.getElementById('increase-quantity').addEventListener('click', () => {
  quantityInput.value = parseInt(quantityInput.value, 10) + 1;
});
document.getElementById('decrease-quantity').addEventListener('click', () => {
  const currentQuantity = parseInt(quantityInput.value, 10);
  if (currentQuantity > 1) {
    quantityInput.value = currentQuantity - 1;
  }
});

// Add to Cart
function addToCart(productId, quantity) {
  const product = data.products.find(p => p.productId === productId);
  if (!product) return;

  if (!data.cart[productId]) {
    data.cart[productId] = { ...product, quantity: 0 };
  }
  data.cart[productId].quantity += quantity;

  cartCount.textContent = Object.values(data.cart).reduce((total, item) => total + item.quantity, 0);
  updateCartSidebar();
}

addToCartButton.addEventListener('click', () => {
  const productId = data.products.find(p => p.productName === modalProductName.textContent).productId;
  const quantity = parseInt(quantityInput.value, 10);
  addToCart(productId, quantity);

  modal.classList.add('hidden');
});

// Close Modal
closeModal.addEventListener('click', () => {
  modal.classList.add('hidden');
});

// Update Cart Sidebar
function updateCartSidebar() {
  cartSidebar.innerHTML = '<h3>Shopping Cart</h3>';
  Object.values(data.cart).forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <img src="${item.image}" class="cart-item-image" alt="${item.productName}">
      <div>
        <h4>${item.productName}</h4>
        <p>Quantity: ${item.quantity}</p>
        <p>Total: ₹${item.price * item.quantity}</p>
      </div>
    `;
    cartSidebar.appendChild(cartItem);
  });
}

// Toggle Cart Sidebar
document.querySelector('.shopping-cart').addEventListener('click', () => {
  cartSidebar.classList.toggle('visible');
});
