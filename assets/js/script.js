/*jshint esversion: 6 */
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
/*Declare variable and select all .orderButton class*/ 
let cart = document.querySelectorAll(".orderButton");

/**/ 
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

/*For loop to loop through all cartQuantity and costTotal of the items values*/ 
for (let i = 0; i < cart.length; i++) {
    cart[i].addEventListener("click", function () {
        cartQuantity(items[i]);
        costTotal(items[i]);
    });
}

/*This function yield features of adding and decreasing the cart quantity*/ 
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

/*This function yield features of updating the cart quantity which situated beside the shopping cart icon at the top right of all the pages*/ 
/*The cart quantity will have an increment of one as the order button has been clicked once.*/ 
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

/*This function yield features of updating the total cost of selected products*/ 
function costTotal(items, action) {
    let productTotal = localStorage.getItem("costTotal", items.price);

    if (action == "decrement") {
        productTotal = parseInt(productTotal);
        localStorage.setItem("costTotal", productTotal - items.price);
    } else if (productTotal !== null) {
        productTotal = parseFloat(productTotal);
        localStorage.setItem("costTotal", +productTotal + items.price);
    } else {
        localStorage.setItem("costTotal", items.price);
    }
}

/*This function display the products chosen in a table form in the cart page*/ 
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
                Total  
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

/*This function yield features of removing the products from the table in the cart page*/ 
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

/*This function yield features of increasing and decreasing the quantity of the chosen products*/ 
/*The total cost will change subject to the change of the quantity*/ 
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

/*This function sets the cart quantity to hold the value*/
/*The refresh and navigation to other page would not change the cart quantity*/  
function loadedCart() {
    let cartNumber = localStorage.getItem("cartQuantity");

    if (cartNumber)
        document.querySelector(".cart-number").innerHTML = cartNumber;
}

loadedCart();
cartDisplay();