import  dbConnection  from '../db';

const statusModel = function (status, userId, callback) {
  dbConnection.query(`UPDATE statuses SET mood = "${status}" WHERE userId = ${userId}`, function (err, result, fields) {
    console.log('this is the resulttttttttt for status', status)
    if (err) { throw err; } 
    // console.log('this is in the profile model ', result);
    callback(err, {status : status, userId : userId});
  });    
}
export default statusModel;

