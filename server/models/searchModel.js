import dbConnection from '../db';

const searchModel = function (username, callback) {
  // console.log("inside model**************",username);
  dbConnection.query(`SELECT * FROM users WHERE username = "${username}"`, function (err, result, fields) {
    if (err) { throw err; } 
    // console.log("result of Search",result)
    callback(err, {results: result});
  });    
}


export default searchModel;


