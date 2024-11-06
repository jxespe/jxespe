// Load cart from localStorage
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const cartListContainer = document.getElementById('cart-list');
    const cartTotalContainer = document.getElementById('cart-total');

    if (cart.length === 0) {
        cartListContainer.innerHTML = "<p>Your cart is empty.</p>";
        cartTotalContainer.textContent = "";
        return;
    }

    let totalPrice = 0;

    // Generate cart items dynamically
    cartListContainer.innerHTML = cart.map(item => {
        totalPrice += item.price * item.quantity;

        return `
            <div class="cart-item">
                <p><strong>${item.name}</strong></p>
                <p>Price: $${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
                <p>Total: $${(item.price * item.quantity).toFixed(2)}</p>
            </div>
        `;
    }).join('');

    // Display total price
    cartTotalContainer.textContent = `Total: $${totalPrice.toFixed(2)}`;
}

// Initialize the cart page when it loads
window.onload = function() {
    loadCart();
};
