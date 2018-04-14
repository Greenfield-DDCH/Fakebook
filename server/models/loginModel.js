import dbConnection from '../db';

const loginModel = function (username, callback) {
  dbConnection.query(`SELECT * FROM users WHERE username = "${username}"`, function (err, result, fields) {
    if (err) { throw err; } 
    // console.log('result',result);
    callback(err, {results: result});
  });    
}


export default loginModel;