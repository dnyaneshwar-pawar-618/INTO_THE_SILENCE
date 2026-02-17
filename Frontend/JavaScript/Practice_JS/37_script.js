document.addEventListener('DOMContentLoaded', function() {
    const productList = document.getElementById('product-list');
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Sample product data (replace with actual data or fetch from an API)
    const products = [
        { id: 1, name: 'Product 1', price: 100, image: 'https://via.placeholder.com/250' },
        { id: 2, name: 'Product 2', price: 150, image: 'https://via.placeholder.com/250' },
        { id: 3, name: 'Product 3', price: 80, image: 'https://via.placeholder.com/250' },
        { id: 4, name: 'Product 4', price: 120, image: 'https://via.placeholder.com/250' }
    ];

    // Function to display products on the homepage or products page
    function displayProducts() {
        productList.innerHTML = ''; // Clear existing products
        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            `;
            productList.appendChild(productElement);
        });
    }

    // Function to add a product to the cart
    window.addToCart = function(productId) {
        const productToAdd = products.find(product => product.id === productId);
        const existingItem = cartItems.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cartItems.push({ ...productToAdd, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cartItems));
        updateCart();
    }

    // Function to update the cart UI
    function updateCart() {
        const cartPage = document.getElementById('cart');
        if (cartPage) {
            const cartItemsContainer = document.getElementById('cart-items');
            const cartTotalAmount = document.getElementById('cart-total-amount');
            let total = 0;

            cartItemsContainer.innerHTML = ''; // Clear existing cart items
            cartItems.forEach(item => {
                const cartItemElement = document.createElement('div');
                cartItemElement.classList.add('cart-item');
                cartItemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div>
                        <p>${item.name}</p>
                        <p>$${item.price}</p>
                        <div class="quantity">Quantity: ${item.quantity}</div>
                        <button onclick="removeFromCart(${item.id})">Remove</button>
                    </div>
                `;
                cartItemsContainer.appendChild(cartItemElement);
                total += item.price * item.quantity; // Calculate total price
            });

            cartTotalAmount.textContent = total.toFixed(2); // Update total amount in the cart
        }
    }

    // Function to remove a product from the cart
    window.removeFromCart = function(productId) {
        const updatedCart = cartItems.filter(item => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        cartItems = updatedCart;
        updateCart();
    }

    // Initialize the homepage with products when DOM content is loaded
    displayProducts();

    // Optional: Checkout functionality (redirects to a checkout page or just alerts)
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (cartItems.length > 0) {
                alert('Redirecting to checkout page...');
                // Implement redirect logic here or show a confirmation message
            } else {
                alert('Your cart is empty. Add some items first!');
            }
        });
    }
});
