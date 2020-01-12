// Need to require the keys.js file and .env wherever you need the keys
// .env need to be set up per environment.
console.log('keys.js is loaded');

exports.dbinfo = {
    db_host: process.env.DB_HOST,
    db_user: process.env.DB_USER,
    db_pass: process.env.DB_PASS,
};