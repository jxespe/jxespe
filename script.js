// Mock Product Data (simulating an API response)
const products = [
    {
        id: 1,
        name: "iPhone 16",
        price: 999,
        colors: ["Space Black", "Silver", "Blue"],
        imageUrl: "https://www.apple.com/v/iphone-16/f/images/overview/hero/iphone-16-pro_max_hero__ehuinlgkoyi6_large.jpg"
    },
    {
        id: 2,
        name: "iPhone 16 Pro",
        price: 1099,
        colors: ["Space Black", "Silver", "Titanium Blue", "Purple"],
        imageUrl: "https://www.apple.com/v/iphone-16/f/images/overview/hero/iphone-16-pro_hero__ehuinlgkoyi6_large.jpg"
    },
    {
        id: 3,
        name: "iPhone 16 Ultra",
        price: 1199,
        colors: ["Space Black", "Silver", "Gold", "Sapphire Blue"],
        imageUrl: "https://www.apple.com/v/iphone-16/f/images/overview/hero/iphone-16-ultra_hero__ehuinlgkoyi6_large.jpg"
    }
];

// Initialize the page with product data
function fetchProductData() {
    displayProducts(products);
}

// Display the products on the page
function displayProducts(products) {
    const productContainer = document.getElementById("product-list");

    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");

        productDiv.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}" />
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <p>Select Color:</p>
            <select class="color-select" data-id="${product.id}">
                ${product.colors.map(color => `<option value="${color}">${color}</option>`).join('')}
            </select>
            <button class="add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">Add to Cart</button>
        `;

        productContainer.appendChild(productDiv);
    });
}

// Event listener for adding items to the cart
document.addEventListener('click', function (event) {
    if (event.target && event.target.classList.contains('add-to-cart')) {
        const productId = event.target.dataset.id;
        const productName = event.target.dataset.name;
        const productPrice = parseFloat(event.target.dataset.price);
        addToCart(productId, productName, productPrice);
    }
});

// Add product to cart
function addToCart(id, name, price) {
    // Get cart from localStorage or create an empty cart if not available
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if product already exists in the cart
    const existingProduct = cart.find(item => item.id === id);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update cart count in the header
    updateCartCount();
}

// Update the cart count in the header
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    document.getElementById("cart-link").textContent = `Cart (${totalItems})`;
}

// Initialize the cart count when the page loads
window.onload = function() {
    updateCartCount();
    fetchProductData(); // Display products when page loads
};
