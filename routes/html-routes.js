// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
let path = require("path");

// Requiring our custom middleware for checking if a user is logged in
let isAuthenticated = require("../config/middleware/isAuthenticated");

// Routes
// =============================================================
module.exports = function (app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/index", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/signUp", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/signUp.html"));
  });


  app.get("/game", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/game.html"));
  });

  app.get("/updateGame", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/updateGame.html"));
  });

  // *** Passport.js Authentication ***
  // Cited: https://dev.to/gm456742/building-a-nodejs-web-app-using-passportjs-for-authentication-3ge2

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route, they will be 
  //redirected to the signup page
  app.get("/game", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/game.html"));
  });

};