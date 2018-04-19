import { createConnection } from 'mysql';

const dbConnection = createConnection({

    user: 'root',
    password: 'Saskechaos1!',
    database: 'facebook',
    server: 'localhost',
    port: 3306

});

dbConnection.connect(function(err) {
  if (err) { throw err; }
  console.log('Connected to db!');
});

export default dbConnection;