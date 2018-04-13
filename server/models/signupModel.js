import dbConnection from '../db';

const signupModel = function (body, callback) {
  dbConnection.query(`SELECT * FROM users WHERE username = "${body.username}"`, function (err, result, fields) {
    if (err) { throw err; } 
    if (!result.length) {
      console.log('this is the data from a query for user', result);
      dbConnection.query(
        `INSERT INTO users (username, password, picture) 
        VALUES('${body.username}', '${body.password}', 'thisisasamplepicture')`,
        function (err, result, fields) {
          if (err) { throw err; } 
          console.log('this is in the model', result);
          callback(err, {results: result});
        }); 
    } else {
      callback(err, {results: null});
    }
  });  
};


export default signupModel;