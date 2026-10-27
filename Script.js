let cart = [];

function addToCart(name, price) {
    const item = cart.find(product => product.name === name);

    if (item) {
        item.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    displayCart();
}

function displayCart() {
    const container = document.getElementById("cart-items");
    const totalDisplay = document.getElementById("cart-total");

    container.innerHTML = "";

    if (cart.length === 0) {
        container.textContent = "Your cart is empty.";
        totalDisplay.textContent = "0";
        return;
    }

    let total = 0;

    cart.forEach((item, index) => {
        const subtotal = item.price * item.quantity;
        total += subtotal;

        const row = document.createElement("div");
        row.className = "cart-row";

        const details = document.createElement("span");
        details.textContent =
            `${item.name} x ${item.quantity} = K${subtotal}`;

        const remove = document.createElement("button");
        remove.textContent = "Remove";

        remove.onclick = function () {
            cart.splice(index, 1);
            displayCart();
        };

        row.appendChild(details);
        row.appendChild(remove);

        container.appendChild(row);
    });

    totalDisplay.textContent = total;
}

function checkout() {
    if (cart.length === 0) {
        alert("Please add a product to your cart.");
        return;
    }

    let message = "Hello Fashion House! I want to order:\n\n";
    let total = 0;

    cart.forEach(item => {
        const subtotal = item.price * item.quantity;

        message += `${item.name} x ${item.quantity} = K${subtotal}\n`;
        total += subtotal;
    });

    message += `\nTotal: K${total}`;
    message += "\nPlease confirm my order.";

    // Replace with the store's real WhatsApp number.
    const phone = "260770000000";

    const url =
        "https://wa.me/" + phone +
        "?text=" + encodeURIComponent(message);

    window.open(url, "_blank");
}