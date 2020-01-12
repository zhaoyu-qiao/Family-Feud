$(document).ready(function () {

    // *** Animation toggle between sign up and sign in form ***
    // Cited: http://www.css3transition.com/toggle-animation-login-sign-form/ 

    $(".info-item .btn").click(function () {
        $(".container").toggleClass("log-in");
    });
    $(".container-form .btn").click(function () {
        $(".container").addClass("active");
    });



    // *** Email Validation ***
    //Cited: https://www.w3resource.com/javascript/form/email-validation.php

    function validateEmail() {
        let emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let inputText = document.getElementById("email-input");

        if (inputText.value.match(emailFormat)) {
            $(".missmatch").html("");
            $("#email-input").focus();
            return true;
        } else {
            // alert("You have entered an invalid email address!");
            $(".missmatch").html("Invalid Email!!");
            $("#email-input").focus();
            return false;
        }
    }

    $("#email-input").keyup(function () {
        validateEmail();
    });

    // // When the user clicks on the password field, show the message box
    // inputText.onfocus = function () {
    //     document.getElementById("missmatch").style.display = "block";
    // }
    // // When the user clicks outside of the email field, hide the message 
    // inputText.onblur = function () {
    //     document.getElementById("missmatch").style.display = "none";
    // }




    // *** Password Validation ***
    // Cited: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_password_val
    let myInput = document.getElementById("password-input");
    let letter = document.getElementById("letter");
    let capital = document.getElementById("capital");
    let number = document.getElementById("number");
    let length = document.getElementById("length");

    // When the user clicks on the password field, show the message box
    myInput.onfocus = function () {
        document.getElementById("message").style.display = "block";
    }

    // When the user clicks outside of the password field, hide the message box
    myInput.onblur = function () {
        document.getElementById("message").style.display = "none";
    }

    // When the user starts to type something inside the password field
    myInput.onkeyup = function () {
        // Validate lowercase letters
        let lowerCaseLetters = /[a-z]/g;
        if (myInput.value.match(lowerCaseLetters)) {
            letter.classList.remove("invalid");
            letter.classList.add("valid");
        } else {
            letter.classList.remove("valid");
            letter.classList.add("invalid");
        }

        // Validate capital letters
        let upperCaseLetters = /[A-Z]/g;
        if (myInput.value.match(upperCaseLetters)) {
            capital.classList.remove("invalid");
            capital.classList.add("valid");
        } else {
            capital.classList.remove("valid");
            capital.classList.add("invalid");
        }

        // Validate numbers
        let numbers = /[0-9]/g;
        if (myInput.value.match(numbers)) {
            number.classList.remove("invalid");
            number.classList.add("valid");
        } else {
            number.classList.remove("valid");
            number.classList.add("invalid");
        }

        // Validate length
        if (myInput.value.length >= 10) {
            length.classList.remove("invalid");
            length.classList.add("valid");
        } else {
            length.classList.remove("valid");
            length.classList.add("invalid");
        }
    }




    // *** SIGN UP FORM PASSPORT.JS AUTHENTICATION***
    //Cited:https://dev.to/gm456742/building-a-nodejs-web-app-using-passportjs-for-authentication-3ge2
    // Getting references to our form and input
    let signUpForm = $(".registerbtn");
    let usernameInput = $("#username-input")
    let emailInput = $("#email-input");
    let passwordInput = $("#password-input");

    console.log(emailInput)
    console.log(passwordInput)

    // When the signup button is clicked, we validate the email and password are not blank
    signUpForm.on("click", function (event) {
        event.preventDefault();
        let userData = {
            username: usernameInput.val().trim(),
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        };

        if (!userData.username || !userData.email || !userData.password) {
            return;
        }
        // If we have a username, email and password, run the signUpUser function
        signUpUser(userData.username, userData.email, userData.password);
        usernameInput.val("");
        emailInput.val("");
        passwordInput.val("");
    });

    // Does a post to the signup route. If succesful, we are redirected to the game page
    // Otherwise we log any errors
    function signUpUser(username, email, password) {
        $.post("/api/signUp", {
            username: username,
            email: email,
            password: password
        }).then(function (data) {
            // console.log("hi", data)
            if (data.success) {
                window.location.href = "/game";
                return false;
            }

            // If there's an error, handle it by throwing up a boostrap alert
        }).catch(handleLoginErr);
    }

    function signInUser(username, email, password) {
        $.post("/api/signIn", {
            username: username,
            email: email,
            password: password
        }).then(function (data) {
            if (data.success) {
                window.location.replace("/game");
            }

            if (data.data.error) {
                window.location.replace("/signUp")
            }

            // If there's an error, handle it by throwing up a boostrap alert
        }).catch(handleLoginErr);
    }

    function handleLoginErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }


    // **** LOG IN FORM PASSPORT.JS AUTHENTICATION ***
    //Cited:https://dev.to/gm456742/building-a-nodejs-web-app-using-passportjs-for-authentication-3ge2
    // Getting references to our form and inputs
    let loginForm = $(".signIn-btn");
    let loginUsernameInput = $("#sign-in-username-input");
    //    let loginEmailInput = $("#sign-in-email-input");
    let loginPasswordInput = $("#sign-in-password-input");

    // When the form is submitted, we validate there's an email and password entered
    loginForm.on("click", function (event) {
        console.log("Sign In Clicked")
        event.preventDefault();
        let userData = {
            username: loginUsernameInput.val().trim(),
            password: loginPasswordInput.val().trim()
        };

        console.log("Username & Password:", userData)


        if (!userData.username || !userData.password) {
            return;
        }

        // If we have an email and password we run the loginUser function and clear the form
        loginUser(userData.username, userData.password);
        loginUsernameInput.val("");
        loginPasswordInput.val("");
    });

    // loginUser does a post to our "api/signIn" route and if successful, redirects us the the game page
    function loginUser(username, password) {
        $.post("/api/signIn", {
            username: username,
            password: password
        }).then(function (data) {
            if (data.success) {
                window.location.replace("/game");
                // window.location.href = "/game";
                // return false;
            }
            // window.location.replace("/game");
            // If there's an error, log the error
        }).catch(function (err) {
            console.log(err);
        });
    }


    // ******This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    // $.get("/api/user_data").then(function (data) {
    //     $(".member-name").text(data.username);
    //     console.log(data.username)
    // });


})