// *** Passport.js Authentication ***
// Cited: https://dev.to/gm456742/building-a-nodejs-web-app-using-passportjs-for-authentication-3ge2

// Requiring bcrypt for password hashing. Using the bcryptjs version as 
//the regular bcrypt module sometimes causes errors on Windows machines
let bcrypt = require("bcryptjs");
let sequelize = require('sequelize');
let passportLocalSequelize = require('passport-local-sequelize');
//
// Creating our User model
//Set it as export because we will need it required on the server
module.exports = function (sequelize, DataTypes) {
    //return sequelize.define("User")...This is Justin's example
    let User = sequelize.define("User", {
        // The email cannot be null, and must be a proper email before creation
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        // already_user: {
        //     type: DataTypes.BOOLEAN,
        //     unique: boolean,
        //     allowNull: false,
        // },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        // The password cannot be null
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    // Creating a custom method for our User model. 
    //This will check if an unhashed password entered by the 
    //user can be compared to the hashed password stored in our database
    User.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };
    // Hooks are automatic methods that run during various phases of the User Model lifecycle
    // In this case, before a User is created, we will automatically hash their password

    // User.hook("beforeCreate", function (user) {
    //     user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    // });

    User.beforeCreate(user => {
        user.password = bcrypt.hashSync(
            user.password,
            bcrypt.genSaltSync(10),
            null
        );
    });
    return User;
};

//This is a fix by Samaila Philemon Bala in case you want to use ES6
//and the above is not working

//User.beforeCreate(user => {
//  user.password = bcrypt.hashSync(
//  user.password,
//bcrypt.genSaltSync(10),
//null
//);
//});
































//https://medium.com/@mridu.sh92/a-quick-guide-for-authentication-using-bcrypt-on-express-nodejs-1d8791bb418f
// User Model for Sequelize with functions to generate hash and check validity of password


// 'use strict';

// const fs = require('fs');
// const path = require('path');
// const sequelize = require('sequelize');
// let bcrypt = require('bcryptjs');
// const saltRounds = 10;


// module.exports = function (sequelize, DataTypes) {

//     let User = sequelize.define("User", {
//         userName: {
//             type: DataTypes.STRING,
//             is: ["^[a-z]+$", 'i'],
//             allowNull: false,
//             required: true
//         },
//         email: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             required: true

//         },
//         password: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             required: true,
//             len: [2, 10]

//         },
//         // return User;

//     });

//     return User;

// generating a hash
// User.generateHash = function (password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };

// Checking if password is valid
//     User.prototype.validPassword = function (password) {
//         return bcrypt.compareSync(password, this.localPassword);
//     };


// };

// let friendsArray = [{
//     "name": "Rachel",
//     "photo": "https://a57.foxnews.com/static.foxnews.com/foxnews.com/content/uploads/2019/09/931/524/jennifer-aniston-friends-getty.jpg",
//     "scores": [
//         5,
//         1,
//         4,
//         4,
//         5,
//         1,
//         2,
//         5,
//         4,
//         1
//     ]
// },





// ];

// Note how we export the array. This makes it accessible to other files using require.
// module.exports = friendsArray;