import dbConnection from '../db';

const editpictureModel = function (picture, userId, callback) {
  dbConnection.query(`UPDATE users SET picture = "${picture}" WHERE id=${userId}`, function (err, result, fields) {
    if (err) { throw err; } 
    callback(err, {results: result});
  });    
}


export default editpictureModel;