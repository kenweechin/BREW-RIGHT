document.addEventListener("DOMContentLoaded", function(){
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("mouseover", function(){
            button.textContent = "Good Choice!";
        })

        button.addEventListener("mouseout", function(){
            button.textContent = "Order Now";
        })
    }
})
