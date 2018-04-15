import dbConnection from '../db';
import bcrypt from 'bcrypt';

const signupModel = function (body, callback) {
  dbConnection.query(`SELECT * FROM users WHERE username = "${body.username}"`, function (err, result, fields) {
    if (err) { throw err; } 

    if (!result.length) {
      console.log('this is the data from a query for user', result);
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(body.password, salt, function(err, hash) {
          dbConnection.query(
            `INSERT INTO users (username, password, picture) 
            VALUES('${body.username}', '${hash}', 'thisisasamplepicture')`,
            function (err, result, fields) {
              if (err) { throw err; } 
              console.log('this is in the model', result);
              callback(err, {results: result});
            }); 
          // Store hash in your password DB.
        });
      });
    
    } else {
      callback(err, {results: null});
    }
  });  
};


export default signupModel;