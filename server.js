// Dependencies
// =============================================================
let express = require("express");
let bodyParser = require("body-parser");
let methodOverride = require("method-override");

let port = 3000;

let app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + "/public"));

app.use(bodyParser.urlencoded({ extended: false }));

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Import routes and give the server access to them.
// let routes = require("./controllers/burgers_controller.js");

require("./routes/familyfeud_controller.js")(app);

app.listen(port);