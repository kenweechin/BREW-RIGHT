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
    let productTotal = localStorage.getItem("costTotal", items.price);
    if (cartProduct && itemsContainer) {
        itemsContainer.innerHTML = '';
        Object.values(cartProduct).map(product => {
            itemsContainer.innerHTML += `  
                <tr> 
                    <td>${product.name}<i class="fas fa-trash-alt" id="deleteBin"></i></td>
                    <td>€${product.price}</td>
                    <td><i class="fas fa-minus-square"></i>&nbsp;${product.insideCart}&nbsp;<i class="fas fa-plus-square"></i></td>
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
    deleteButton ();  
}

cartDisplay();

function deleteButton() {
    let deleteButton = document.querySelectorAll(".items-added #deleteBin");
    let itemName;
    let itemNumber = localStorage.getItem("cartQuantity");
    let cartItem = localStorage.getItem("coffeeInCart");
    let cartCost = localStorage.getItem("costTotal");

    cartItem = JSON.parse(cartItem);
    console.log(cartItem);

    for(let i = 0; i < deleteButton.length; i++){
        deleteButton[i].addEventListener("click", () => {
            itemName = deleteButton[i].parentElement.textContent;
            console.log(itemName);
            
            localStorage.setItem("cartQuantity", itemNumber - cartItem[itemName].insideCart);

            localStorage.setItem("costTotal", cartCost - (cartItem[itemName].price *cartItem[itemName].insideCart));

            delete cartItem[itemName];
            localStorage.setItem("coffeeInCart" , JSON.stringify(cartItem));

            cartDisplay();
            loadedCart();
        });
    }
}



function loadedCart() {
    let cartNumber = localStorage.getItem("cartQuantity");

    if (cartNumber)
        document.querySelector(".cart-number").innerHTML = cartNumber;
}

loadedCart();
