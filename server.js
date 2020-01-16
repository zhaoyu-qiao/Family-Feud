//const db = require("../models");
// Dependencies
// =============================================================
let express = require("express");
let bodyParser = require("body-parser");
let methodOverride = require("method-override");

//Needed for Passport.JS Sign Up and Sign In Authentication
let bcrypt = require("bcrypt");
let session = require("express-session");
// Requiring passport as we've configured it
let passport = require("./config/passport");

let PORT = process.env.PORT || 3000;

let app = express();
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + "/public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));



// Needed for Passport.JS Sign Up and Sign In Authentication
app.use(bodyParser.urlencoded({
    extended: false
}));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

// We need to use sessions to keep track of our user's login status
app.use(session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


// Static directory
app.use(express.static("public"));


// Import routes and give the server access to them.
// let routes = require("./routes/familyfeud_controller.js")(app);
// app.use(routes);
app.listen(PORT, function () {
    console.log('server listening on: http://localhost:' + PORT);
});


// Syncing our sequelize models and then starting our Express app  **This one should be used instead the one directly above** KW
// =============================================================
// db.sequelize.sync().then(function () {
//     app.listen(PORT, function () {
//         console.log("App listening on PORT " + PORT);
//     });
// });



app.get("/api/questions", function (req, res) {
    let question = require('./models/question.js');
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Question
    question.findAll({
        atributes: ['name'] //not sure if answers should be in their on DB 
    }).then(function (question) {
        res.json(question);
    });
});
app.get("/api/users", function (req, res) {
    let user = require('./models/user.js');
    let userScore = require('./models/user_score.js');
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Question
    user.findAll({
        atributes: ['name', 'email'], //not sure if answers should be in their on DB
        include: {
            model: userScore
        },
    }).then(function (user) {
        res.json(user);
    });
});


// Routes
// =============================================================

require("./routes/html_routes")(app);
require("./routes/familyfued_controlers")(app);
require("./routes/api-routes_userSuggestions")(app);
require("./routes/api-routes_userSignUpSignIn")(app);