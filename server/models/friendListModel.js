import dbConnection from '../db';

const friendListModel = function (userId, callback) {
  dbConnection.query(`SELECT * FROM users u inner join friends f on (u.id = f.user_id_b) where f.user_id_a = ${userId}`, function (err, result, fields) {
    if (err) { console.log("ERROR FRIENDSLIST MODEL: ", err); } 
    let res = [];
    for(let i = 0; i < result.length; i++){
      res.push({id: result[i].id, username: result[i].username, picture: result[i].picture});
    }

    callback(err, {friends: res});
  });    
};



export default friendListModel;