import dbConnection from '../db';

const editpictureModel = function (picture, userId, callback) {
  dbConnection.query(`UPDATE users SET picture = "${picture}" WHERE id=${userId}`, function (err, result, fields) {
    if (err) { throw err; } 
    callback(err, {picture : picture, userId : userId});
  });    
}


export default editpictureModel;