import './styles.css';

// // Data
const data = {
  products: [
    {
      productId: 'P001',
      productName: 'Wireless Mouse',
      brand: 'Zebronics',
      price: '₹1599',
      description: 'A premium wireless mouse with ergonomic design.',
      stockQuantity: 120,

      image: './src/images/sample-product-image.jpg',
    },
    {
      productId: 'P002',
      productName: 'Bluetooth Headphones',
      brand: 'Zebronics',
      price: '₹1599',
      description: 'A premium wireless mouse with ergonomic design.',
      stockQuantity: 80,
      image: './src/images/sample-product-image.jpg',
    },
    {
      productId: 'P003',
      productName: 'Gaming Keyboard',
      brand: 'Zebronics',
      price: '₹1599',
      description: 'A premium wireless mouse with ergonomic design.',
      stockQuantity: 50,
      image: './src/images/sample-product-image.jpg',
    },
    {
      productId: 'P004',
      productName: 'Desk Chair',
      brand: 'Damro',
      price: '₹1599',
      description: 'A premium wireless mouse with ergonomic design.',

      stockQuantity: 30,
      image: './src/images/sample-product-image.jpg',
    },
  ],
  cart: {},
};
document.getElementById('nav-toggle').addEventListener('click', function () {
  document.getElementById('nav-links').classList.toggle('active');
});
import './styles.css';

// Data

// Populate product list dynamically
const productList = document.getElementById('product-list');
data.products.forEach(product => {
  const productCard = document.createElement('div');
  productCard.classList.add('product-card');
  productCard.innerHTML = `
    <img src="${product.image}" class="product-image" alt="${product.productName}">
    <h3 class="brand-name">${product.brand}</h3>
    <h3 class="product-name">${product.productName}</h3>
    <p class="price">${product.price}</p>
    <button class="add-to-cart">Add to cart</button>
  `;
  productCard.dataset.id = product.productId;
  productList.appendChild(productCard);
});

// Modal logic
const modal = document.getElementById('product-modal');
const modalBrandName = document.getElementById('modal-brand-name');
const modalProductName = document.getElementById('modal-product-name');
const modalImage = document.getElementById('modal-image');
const modalPrice = document.getElementById('modal-price');
const modalDescription = document.getElementById('modal-description');
const closeModal = document.querySelector('.close-modal');

productList.addEventListener('click', e => {
  const productCard = e.target.closest('.product-card');
  if (productCard) {
    const productId = productCard.dataset.id;
    const product = data.products.find(p => p.productId === productId);
    if (product) {
      // Populate modal with product details
      modalBrandName.textContent = product.brand;
      modalProductName.textContent = product.productName;
      modalImage.src = product.image;
      modalPrice.textContent = product.price;
      modalDescription.textContent = product.description;

      // Show modal
      modal.classList.remove('hidden');
    }
  }
});

closeModal.addEventListener('click', () => {
  modal.classList.add('hidden');
});

window.addEventListener('click', e => {
  if (e.target === modal) {
    modal.classList.add('hidden');
  }
});
