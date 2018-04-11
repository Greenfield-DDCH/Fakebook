import mysql from 'mysql';

dbConnection = mysql.createConnection({
    user: 'student',
    password: 'student',
    database: 'facebook'
});

module.exports.dbConnection = dbConnection;