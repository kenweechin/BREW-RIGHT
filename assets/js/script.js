//Mouseover event for the Order Now button in the home page
<<<<<<< HEAD
document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByClassName("orderButton");

    for (let orderButton of buttons) {
        orderButton.addEventListener("mouseover", function () {
            orderButton.textContent = "Good Choice!";
        })
        orderButton.addEventListener("click", function () {
            alert("You have added your choice to the cart!");
        })
        orderButton.addEventListener("mouseout", function () {
            orderButton.textContent = "Order Now";
        })
    } 

=======
document.addEventListener("DOMContentLoaded", function(){
    let buttons = document.getElementsByClassName("orderButton");

    for (let orderButton of buttons) {
        orderButton.addEventListener("mouseover", function(){
            orderButton.textContent = "Good Choice!";
        })

        orderButton.addEventListener("mouseout", function(){
            orderButton.textContent = "Order Now";
        })
    }
>>>>>>> 5ab37fb500262ad5111b37698ad01478a3fdfe93
})