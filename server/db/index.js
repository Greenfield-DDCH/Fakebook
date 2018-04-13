import { createConnection } from 'mysql';


const dbConnection = createConnection({
  user: 'student',
  password: 'student',
  database: 'facebook'
});

dbConnection.connect();

export default dbConnection;