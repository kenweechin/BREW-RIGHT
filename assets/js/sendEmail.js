function sendMail(contactForm) {
    emailjs.send("service_44tf1cv", "brewright", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.emailaddress.value,
        "order_request": contactForm.coffeerequest.value
    })
    .then(
        function(response) {
            console.log("SUCCESS", response);
        },
        function(error) {
            console.log("FAILED", error);
        }
    );
    return false;  // To block from loading a new page
}

