//Mouseover event for the Order Now button in the home page
document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByClassName("orderButton");
    for (let orderButton of buttons) {
        orderButton.addEventListener("mouseover", function () {
            orderButton.textContent = "Great Choice!";
        });
        orderButton.addEventListener("click", function () {
            alert("Your choice has been added to the cart!");
        });
        orderButton.addEventListener("mouseout", function () {
            orderButton.textContent = "Order Now";
        });
    }
});

//Carts section
let cart = document.querySelectorAll(".orderButton");

let items = [{
        name: "FRENCH PRESS",
        price: 7.99,
        insideCart: 0
    },
    {
        name: "IBRIK",
        price: 8.99,
        insideCart: 0
    },
    {
        name: "MOKAPOT",
        price: 8.99,
        insideCart: 0
    },
    {
        name: "POUROVER",
        price: 5.99,
        insideCart: 0
    }
];

for (let i = 0; i < cart.length; i++) {
    cart[i].addEventListener("click", function () {
        cartQuantity(items[i]);
        costTotal(items[i]);
    });
}

function cartQuantity(items) {

    let cartNumber = localStorage.getItem("cartQuantity");

    cartNumber = parseInt(cartNumber);

    if (cartNumber) {
        localStorage.setItem("cartQuantity", cartNumber + 1);
        document.querySelector(".cart-number").innerHTML = cartNumber + 1;
    } else {
        localStorage.setItem("cartQuantity", 1);
        document.querySelector(".cart-number").innerHTML = 1;
    }

    setCoffeeProducts(items);
}

function setCoffeeProducts(items) {
    let cartProduct = localStorage.getItem("coffeeInCart");

    cartProduct = JSON.parse(cartProduct);

    if (cartProduct !== null) {
        if (cartProduct[items.name] == undefined) {
            cartProduct = {
                ...cartProduct,
                [items.name]: items
            };
        }
        cartProduct[items.name].insideCart += 1;
    } else {
        items.insideCart = 1;

        cartProduct = {
            [items.name]: items
        };
    }

    localStorage.setItem("coffeeInCart", JSON.stringify(cartProduct));
}

function costTotal(items) {
    let productTotal = localStorage.getItem("costTotal", items.price);

    if (productTotal !== null) {
        productTotal = parseFloat(productTotal);
        localStorage.setItem("costTotal", +productTotal + items.price);
    } else {
        localStorage.setItem("costTotal", items.price);
    }
}

function cartDisplay() {
    let cartProduct = localStorage.getItem("coffeeInCart");
    cartProduct = JSON.parse(cartProduct);

    let itemsContainer = document.querySelector(".items-added");
    if (cartProduct && itemsContainer) {
        itemsContainer.innerHTML = '';
        Object.values(cartProduct).map(product => {
            itemsContainer.innerHTML += `
            <tr>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td><i class="fas fa-minus-square"></i>${product.insideCart}<i class="fas fa-plus-square"></i></td>
            <td>${product.insideCart * product.price}<i class="fas fa-trash-alt"></i></td>
            </tr>
            `
        });
    }
}

cartDisplay();

function loadedCart() {
    let cartNumber = localStorage.getItem("cartQuantity");

    if (cartNumber)
        document.querySelector(".cart-number").innerHTML = cartNumber;
}

loadedCart();