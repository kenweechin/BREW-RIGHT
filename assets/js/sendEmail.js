function sendMail(contactForm) {
    emailjs.send("service_44tf1cv", "brewright", {
            "from_name": contactForm.name.value,
            "from_email": contactForm.emailaddress.value,
            "order_request": contactForm.coffeerequest.value
        })
        .then(
            function (response) {
                console.log("SUCCESS", response);
            },
            function (error) {
                console.log("FAILED", error);
            }
        );
    return false; // To block from loading a new page
}

//alert method for the contact page after user has submitted request.
let button = document.getElementsByClassName("submitButton");
    
    for (let submitButton of button){
        submitButton.addEventListener("click", function () {
            alert("You had submitted your request. We will get back to you soon!");
        })
    }
    
