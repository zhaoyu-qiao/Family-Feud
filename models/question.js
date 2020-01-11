// Sequelize (capital) references the standard library
let Sequelize = require("sequelize");
// sequelize (lowercase) references my connection to the DB.
let sequelize = require("../config/connection.js");

// Creates a "Question" model that matches up with DB
let Question = sequelize.define("question", {
  question: Sequelize.STRING,
  answer_1: Sequelize.STRING,
  answer_score_1: Sequelize.INTEGER,
  answer_2: Sequelize.STRING,
  answer_score_2: Sequelize.INTEGER,
  answer_3: Sequelize.STRING,
  answer_score_3: Sequelize.INTEGER,
  answer_4: Sequelize.STRING,
  answer_score_4: Sequelize.INTEGER,
  answer_5: Sequelize.STRING,
  answer_score_5: Sequelize.INTEGER,
  answer_6: Sequelize.STRING,
  answer_score_6: Sequelize.INTEGER
});


// Syncs with DB
Question.sync();

// Makes the QUestion Model available for other files (will also create a table)
module.exports = Question;