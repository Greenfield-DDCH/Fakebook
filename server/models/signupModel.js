import dbConnection from '../db';

const signupModel = function (body, callback) {
  dbConnection.query(
    `INSERT INTO users (username, password, picture) 
    VALUES('${body.username}', '${body.password}', 'thisisasamplepicture')`,
    function (err, result, fields) {
      if (err) { throw err; } 
      console.log('this is in the model', result);
      callback(err, {results: result});
    });    
};


export default signupModel;