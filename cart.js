

const CART_KEY = "KHYBER_DARBAR_CART";


function getCart() {
    try {
        let data = localStorage.getItem(CART_KEY) || localStorage.getItem("khyberCart") || localStorage.getItem("cart");
        let cart = data ? JSON.parse(data) : [];
        return Array.isArray(cart) ? cart.filter(item => item && item.name && !isNaN(item.price)) : [];
    } catch (e) {
        return [];
    }
}

function saveCart(cart) {
    let cleanCart = cart.filter(item => item && item.name && !isNaN(item.price));
    localStorage.setItem(CART_KEY, JSON.stringify(cleanCart));
    localStorage.setItem("khyberCart", JSON.stringify(cleanCart));
    localStorage.setItem("cart", JSON.stringify(cleanCart));
    updateFloatingBadge();
}

window.addToCart = function(productName, productPrice) {
    let currentCart = getCart();
    const exist = currentCart.find(x => x.name.trim().toLowerCase() === String(productName).trim().toLowerCase());
    
    if (exist) {
        exist.qty = parseInt(exist.qty) + 1;
    } else {
        currentCart.push({
            name: String(productName).trim(),
            price: parseInt(productPrice),
            qty: 1
        });
    }
    
    saveCart(currentCart);
    window.location.href = 'cart.html'; // Direct redirect to cart page
};


function changeQuantity(productName, amount) {
    let currentCart = getCart();
    const item = currentCart.find(x => x.name.toLowerCase() === productName.toLowerCase());
    
    if (item) {
        item.qty = parseInt(item.qty) + amount;
        if (item.qty <= 0) {
            currentCart = currentCart.filter(x => x.name.toLowerCase() !== productName.toLowerCase());
        }
        saveCart(currentCart);
        renderCartPage();
    }
}


function removeItem(productName) {
    let currentCart = getCart();
    currentCart = currentCart.filter(x => x.name.toLowerCase() !== productName.toLowerCase());
    saveCart(currentCart);
    renderCartPage();
}


function renderCartPage() {
    const tableBody = document.getElementById('cartTableBody');
    const totalElement = document.getElementById('cartGrandTotal');
    if (!tableBody) return; // Guard clause if not on cart.html

    let cart = getCart();
    tableBody.innerHTML = '';
    let grandTotal = 0;

    if (cart.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 3rem; font-size:1.2rem; color:#aaa;">Aapka Shahi Cart Khaali Hai! <br><br> <a href="menu.html" style="color: #D4AF37; text-decoration:underline;">Menu Dekhein</a></td></tr>`;
        if (totalElement) totalElement.innerText = "Rs. 0";
        return;
    }

    cart.forEach(item => {
        let subtotal = item.price * item.qty;
        grandTotal += subtotal;

        tableBody.innerHTML += `
            <tr>
                <td data-label="Dish">${item.name}</td>
                <td data-label="Price">Rs. ${item.price}</td>
                <td data-label="Quantity">
                    <div class="qty-control">
                        <button onclick="changeQuantity('${item.name}', -1)">-</button>
                        <span>${item.qty}</span>
                        <button onclick="changeQuantity('${item.name}', 1)">+</button>
                    </div>
                </td>
                <td data-label="Subtotal">Rs. ${subtotal}</td>
                <td data-label="Action">
                    <button class="remove-btn" onclick="removeItem('${item.name}')"><i class="fas fa-trash-alt"></i></button>
                </td>
            </tr>
        `;
    });

   
    let appliedPromo = localStorage.getItem('shahi_promo');
    if (appliedPromo === 'KHYBER10') {
        let discount = grandTotal * 0.10;
        grandTotal = grandTotal - discount;
        if (totalElement) {
            totalElement.innerHTML = `<span style="text-decoration: line-through; font-size: 1rem; color: #888; margin-right: 10px;">Rs. ${grandTotal + discount}</span> Rs. ${grandTotal} (10% Promo Applied)`;
        }
    } else {
        if (totalElement) totalElement.innerText = `Rs. ${grandTotal}`;
    }
}


function updateFloatingBadge() {
    // Optional utility feature
}


document.addEventListener('DOMContentLoaded', () => {
    renderCartPage();
});