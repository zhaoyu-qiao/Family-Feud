// Dependencies for various node packages
let mysql = require("mysql");
let inquirer = require("inquirer");
let http = require("http");
let fs = require("fs");

// create connection to the sql database
let connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // DK's username (from my SQL workbench)
  user: "root",

  // PW workbench to access DB schema & seed info from mySQL
  password: "847Fellsway",
  database: "familyfeud_db"
});