import dbConnection from '../db';

const editpictureModel = function (picture, userId, callback) {
  dbConnection.query(`UPDATE users SET picture = "${picture}" WHERE id=${userId}`, function (err, result, fields) {
    // console.log('this is the resulttttttttttt', result)
    if (err) { throw err; } 
    callback(err, {picture : picture, userId : userId});
  });    
}


export default editpictureModel;