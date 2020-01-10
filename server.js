// Dependencies
// =============================================================
let express = require("express");
let bodyParser = require("body-parser");
let methodOverride = require("method-override");

let PORT = process.env.PORT || 3000;

let app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + "/public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Import routes and give the server access to them.
//let routes = require("./routes/familyfeud_controller.js")(app);
//app.use(routes);

app.listen(PORT, function(){
    console.log('server listening on: http://localhost:' + PORT);
});