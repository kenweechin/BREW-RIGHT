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
        price: 7.00,
        insideCart: 0
    },
    {
        name: "IBRIK",
        price: 8.00,
        insideCart: 0
    },
    {
        name: "MOKAPOT",
        price: 8.00,
        insideCart: 0
    },
    {
        name: "POUROVER",
        price: 5.00,
        insideCart: 0
    }
];

for (let i = 0; i < cart.length; i++) {
    cart[i].addEventListener("click", function () {
        cartQuantity(items[i]);
        costTotal(items[i]);
    });
}

function cartQuantity(items, action) {

    let cartNumber = localStorage.getItem("cartQuantity");

    cartNumber = parseInt(cartNumber);

    let cartProduct = localStorage.getItem("coffeeInCart");
    cartProduct = JSON.parse(cartProduct);

    if (action == "decrement") {
        localStorage.setItem("cartQuantity", cartNumber - 1);
        document.querySelector(".cart-number").textContent = cartNumber - 1;
    } else if (cartNumber) {
        localStorage.setItem("cartQuantity", cartNumber + 1);
        document.querySelector(".cart-number").textContent = cartNumber + 1;
    } else {
        localStorage.setItem("cartQuantity", 1);
        document.querySelector(".cart-number").textContent = 1;
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

function costTotal(items, action) {
    let productTotal = localStorage.getItem("costTotal", items.price);

    if (action == "decrement") {
        productTotal = parseInt(productTotal);
        localStorage.setItem("costTotal", productTotal - items.price)
    } else if (productTotal !== null) {
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
    let productTotal = localStorage.getItem("costTotal", items.price);
    if (cartProduct && itemsContainer) {
        itemsContainer.innerHTML = '';
        Object.values(cartProduct).map(product => {
            itemsContainer.innerHTML += `  
                <tr> 
                    <td><span>${product.name}</span><i class="fas fa-trash-alt" id="deleteBin"></i></td>
                    <td>€${product.price}</td>
                    <td><i class="cartDecrement fas fa-minus-square"></i>&nbsp;<span>${product.insideCart}</span>&nbsp;<i class="cartIncrement fas fa-plus-square"></i></td>
                    <td>€${product.insideCart * product.price}</td>        
                </tr>    
            `;
        });

        itemsContainer.innerHTML += `
        <tr>
            <p class="cartTotalTitle">
                Total Cost  
            </p>
            <p class="cartTotalAmount">
                €${productTotal}
            </p>
        </tr>
    `;
    }
    deleteButton();
    adjustQuantity();
}


function deleteButton() {
    let deleteButton = document.querySelectorAll(".items-added #deleteBin");
    let itemName;
    let itemNumber = localStorage.getItem("cartQuantity");
    let cartProduct = localStorage.getItem("coffeeInCart");
    let cartCost = localStorage.getItem("costTotal");

    cartProduct = JSON.parse(cartProduct);

    for (let i = 0; i < deleteButton.length; i++) {
        deleteButton[i].addEventListener("click", () => {
            itemName = deleteButton[i].parentElement.textContent;

            localStorage.setItem("cartQuantity", itemNumber - cartProduct[itemName].insideCart);

            localStorage.setItem("costTotal", cartCost - (cartProduct[itemName].price * cartProduct[itemName].insideCart));

            delete cartProduct[itemName];
            localStorage.setItem("coffeeInCart", JSON.stringify(cartProduct));

            cartDisplay();
            loadedCart();
        });
    }
}

function adjustQuantity() {
    let incrementButton = document.querySelectorAll(".cartIncrement");
    let decrementButton = document.querySelectorAll(".cartDecrement");
    let cartProduct = localStorage.getItem("coffeeInCart");
    let currentQuantity = 0;
    let currentItem = "";

    cartProduct = JSON.parse(cartProduct);


    for (let i = 0; i < incrementButton.length; i++) {
        incrementButton[i].addEventListener("click", () => {
            currentQuantity = incrementButton[i].parentElement.querySelector("span").textContent;
            currentItem = incrementButton[i].parentElement.previousElementSibling.previousElementSibling.querySelector("span").textContent;
            cartProduct[currentItem].insideCart += 1;
            cartQuantity(cartProduct[currentItem]);
            costTotal(cartProduct[currentItem]);
            localStorage.setItem("coffeeInCart", JSON.stringify(cartProduct));
            cartDisplay();
        });
    }

    for (let i = 0; i < decrementButton.length; i++) {
        decrementButton[i].addEventListener("click", () => {
            currentQuantity = decrementButton[i].parentElement.querySelector("span").textContent;
            currentItem = decrementButton[i].parentElement.previousElementSibling.previousElementSibling.querySelector("span").textContent;

            if (cartProduct[currentItem].insideCart > 1) {
            cartProduct[currentItem].insideCart -= 1;
            cartQuantity(cartProduct[currentItem], "decrement");
                costTotal(cartProduct[currentItem], "decrement");
                localStorage.setItem("coffeeInCart", JSON.stringify(cartProduct));
                cartDisplay();
            }
        });
    }
}

function loadedCart() {
    let cartNumber = localStorage.getItem("cartQuantity");

    if (cartNumber)
        document.querySelector(".cart-number").innerHTML = cartNumber;
}

loadedCart();
cartDisplay();