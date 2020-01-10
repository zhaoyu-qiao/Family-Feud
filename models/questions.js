//question model

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