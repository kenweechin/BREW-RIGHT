//Mouseover event for the Order Now button in the home page
document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByClassName("orderButton");
    for (let orderButton of buttons) {
        orderButton.addEventListener("mouseover", function () {
            orderButton.textContent = "Great Choice!";
        })
        orderButton.addEventListener("click", function () {
            alert("Your choice has been added to the cart!");
        })
        orderButton.addEventListener("mouseout", function () {
            orderButton.textContent = "Order Now";
        })
    } 
})

//Carts section
let cart = document.querySelectorAll(".orderButton");

let product = [
    {
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
]

for (let i=0; i < cart.length; i++){
    cart[i].addEventListener("click", function(){
        cartQuantity() 
    })
}

function loadedCart() {
    let cartNumber = localStorage.getItem("cartQuantity");

    if (cartNumber) 
        document.querySelector(".cart-number").textContent = cartNumber;
}

function cartQuantity() {
    let cartNumber = localStorage.getItem("cartQuantity");

    cartNumber = parseInt(cartNumber);
    
    if (cartNumber) {
        localStorage.setItem("cartQuantity", cartNumber + 1);
        document.querySelector(".cart-number").textContent = cartNumber + 1;
    }
    else {
        localStorage.setItem("cartQuantity", 1);
        document.querySelector(".cart-number").textContent =1;
    } 
} 

loadedCart()


  