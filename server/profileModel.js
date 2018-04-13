import  dbConnection  from './db';

const statusModel = function (username, callback) {
  dbConnection.query(`INSERT INTO users WHERE status = "${status}"`, function (err, result, fields) {
    if (err) { throw err; } 
    console.log('this is in the model', result);
    callback(err, {results: result});
  });    
}
export default statusModel;