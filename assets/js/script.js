//Mouseover event for the Order Now button in the home page
document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByClassName("orderButton");

    for (let orderButton of buttons) {
        orderButton.addEventListener("mouseover", function () {
            orderButton.textContent = "Good Choice!";
        })
        orderButton.addEventListener("click", function () {
            alert("Your choice has been added to the cart!");
        })
        orderButton.addEventListener("mouseout", function () {
            orderButton.textContent = "Order Now";
        })
    } 
})