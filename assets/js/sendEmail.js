//to prevent the submit to be executed before the input to the form 
document.getElementById("submitButton").addEventListener("submit", function(event){
    event.preventDefault();
});

function sendMail(contactForm) {
    emailjs.send("service_44tf1cv", "brewright", {
            "from_name": contactForm.name.value,
            "from_email": contactForm.emailaddress.value,
            "order_request": contactForm.coffeerequest.value
        })
        .then(
            function (response) {
                alert("You had submitted your request. We will get back to you soon!", response);
            },
            function (error) {
                alert("Please retry again", error);
            }
        );
    return false; // To block from loading a new page
}


