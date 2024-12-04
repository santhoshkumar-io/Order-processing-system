import { data } from './index.js';

const cartItemList = document.getElementById('cart-item-list');
const subtotalElement = document.getElementById('subtotal');
const discountElement = document.getElementById('discount');
const totalElement = document.getElementById('total');
const applyCouponButton = document.getElementById('apply-coupon');
const couponCodeInput = document.getElementById('coupon-code');
const placeOrderButton = document.getElementById('place-order');
const orderPlacedModal = document.getElementById('order-placed');
const cancelOrderButton = document.getElementById('cancel-order');

const renderCart = () => {
    cartItemList.innerHTML = '';
    let subtotal = 0;
    Object.values(data.cart).forEach(item => {
        subtotal += item.price * item.quantity;
        cartItemList.innerHTML += `
            <li>
                <img src="${item.image}" alt="${item.productName}" class="cart-item-image">
                <div>
                    <p>${item.productName}</p>
                    <p>Quantity: ${item.quantity}</p>
                    <p>Price: ₹${item.price}</p>
                </div>
            </li>
        `;
    });

    subtotalElement.textContent = subtotal;
    totalElement.textContent = subtotal;
};

applyCouponButton.addEventListener('click', () => {
    const couponCode = couponCodeInput.value.trim();
    let subtotal = parseFloat(subtotalElement.textContent);
    if (couponCode === 'FREEDEAL') {
        const discount = subtotal * 0.1;
        discountElement.textContent = discount.toFixed(2);
        totalElement.textContent = (subtotal - discount).toFixed(2);
    } else {
        discountElement.textContent = '0';
        totalElement.textContent = subtotal.toFixed(2);
    }
});

placeOrderButton.addEventListener('click', () => {
    orderPlacedModal.classList.remove('hidden');
    setTimeout(() => {
        window.location.href = './index.html';
    }, 5000);
});

cancelOrderButton.addEventListener('click', () => {
    orderPlacedModal.classList.add('hidden');
    clearTimeout();
});

renderCart();
