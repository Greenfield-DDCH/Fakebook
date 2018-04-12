import mysql from 'mysql';

const dbConnection = mysql.createConnection({
    user: 'student',
    password: 'student',
    database: 'facebook'
});

dbConnection.connect();

export default dbConnection;