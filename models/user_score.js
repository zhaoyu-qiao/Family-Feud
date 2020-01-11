// Sequelize (capital) references the standard library
let Sequelize = require("sequelize");
// sequelize (lowercase) references my connection to the DB.
let sequelize = require("../config/connection.js");

// Creates a "User_score" model that matches up with DB
let User_score = sequelize.define("user_score", {
  user_name: Sequelize.STRING,
  user_score: Sequelize.INTEGER
});


// Syncs with DB
User_score.sync();

// Makes the User_score Model available for other files (will also create a table)
module.exports = User_score;