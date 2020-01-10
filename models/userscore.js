// // Dependencies for various node packages
// let mysql = require("mysql");
// let inquirer = require("inquirer");
// let http = require("http");
// let fs = require("fs");

// // create connection to the sql database
// let connection = mysql.createConnection({
//   host: "localhost",
//   port: 3306,

//   // DK's username (from my SQL workbench)
//   user: "root",

//   // PW workbench to access DB schema & seed info from mySQL
//   password: "847Fellsway",
//   database: "familyfeud_db"
// });

//user model

// module.exports = function(sequelize, DataTypes) {
//     let Burger = sequelize.define("Burger", {
//         id: {
//             type: DataTypes.INTEGER,
//             autoIncrement: true,
//             primaryKey: true
//         },
//         burger_name: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             validate: { // if empty, do not insert new record into table
//                 len: [1]
//             }
//         },
//         devoured: {
//             type: DataTypes.BOOLEAN,
//             defaultValue: false, // newly entered burger is automatically uneaten
//         },
//         date: DataTypes.DATE
//     }, {
//         timestamps: false // use existing date field for timestamp
//     });
//     Burger.sync();
//     return Burger;
// };