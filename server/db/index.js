import { createConnection } from 'mysql';


const dbConnection = createConnection({
  user: 'root',
  password: '',
  database: 'facebook'
});

dbConnection.connect();

export default dbConnection;