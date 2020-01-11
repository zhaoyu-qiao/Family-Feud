// Sequelize (capital) references the standard library
let Sequelize = require("sequelize");
// sequelize (lowercase) references my connection to the DB.
let sequelize = require("../config/connection.js");

// Creates a "user" model that matches up with DB
let User = sequelize.define("user", {
  user_email: Sequelize.STRING,
  user_pw: Sequelize.STRING,
  user_name: Sequelize.STRING,
  already_user: Sequelize.BOOLEAN
});


// Syncs with DB
User.sync();

// Makes the User Model available for other files (will also create a table)
module.exports = User;