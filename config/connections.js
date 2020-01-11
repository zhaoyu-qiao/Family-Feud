let mysql = require('mysql');
conection = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '847Fellsway',
    database: 'familyfeud_db'
}); 
conection.connect(function(err){
    if(err) {
        console.error('error connecting: ' + err.stack); 
        return; 
    }
    console.log('connected as id' + connection.threadID);
});
module.exports = connection;