// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
let path = require("path");

// Needed for Passport.JS Sign Up and Sign In Authentication
// Requiring our custom middleware for checking if a user is logged in
let isAuthenticated = require("../config/middleware/isAuthenticated");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
    // HTML GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases the user is shown an HTML page of content
    // ---------------------------------------------------------------------------

    app.get("/game", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/game.html"));
    });

    app.get("/reserve", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/reserve.html"));
    });

    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    app.get("/index", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    app.get("/signUp", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/signUp.html"));
    });

    app.get("/userSuggestions", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/userSuggestions.html"));
    });

    // If no matching route is found default to home
    // app.get("*", function (req, res) {
    //     res.sendFile(path.join(__dirname, "../public/game.html"));
    // });


    // *** Passport.js Authentication ***
    // Cited: https://dev.to/gm456742/building-a-nodejs-web-app-using-passportjs-for-authentication-3ge2

    // Here we've add our isAuthenticated middleware to this route.
    // If a user who is not logged in tries to access this route, they will be 
    //redirected to the signup page
    app.get("/game", isAuthenticated, function (req, res) {
        res.sendFile(path.join(__dirname, "../public/game.html"));
    });




};