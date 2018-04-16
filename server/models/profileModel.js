import  dbConnection  from '../db';

const profileModel = function (status, userId, callback) {
  dbConnection.query(`UPDATE statuses SET mood = "${status}" WHERE userId = ${userId}`, function (err, result, fields) {
    if (err) { throw err; } 
    console.log('this is in the profile model ', result);
    callback(err, {results: result});
  });    
}
export default profileModel;

