import dbConnection from '../db';

const friendListModel = function (userId, callback) {
  dbConnection.query(`SELECT * FROM users`, function (err, result, fields) {
    if (err) { throw err; } 
    callback(err, {results: result});
  });    
};



export default friendListModel;