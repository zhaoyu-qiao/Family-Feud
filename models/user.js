// Sequelize (capital) references the standard library
let Sequelize = require("sequelize");
let config = require('../config/config.json');
// sequelize (lowercase) references my connection to the DB.
let sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
  host: config.host,
  dialect: 'mysql'
});
let UserScore = require('./user_score.js');
// .sequelize.sync({force: true});
// Creates a "User" model that matches up with DB
let User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    field: 'id',
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    field: 'name'
  },
  password: {
    type: Sequelize.STRING,
    field: 'password'
  },
  email: {
    type: Sequelize.STRING,
    field: 'email'
  },
}, {
  tableName: 'users',
  timestamps: false
});
User.hasMany(UserScore, {
  foreignKey: 'user_id'
});
// Syncs with DB
User.sync();
// Makes the QUestion Model available for other files (will also create a table)
module.exports = User;
//http://localhost:3000/api/users