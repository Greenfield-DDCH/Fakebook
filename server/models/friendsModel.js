import dbConnection from '../db';

const friendsModel = function (userA, userB, callback) {
  dbConnection.query(`insert into friends (user_id_a, user_id_b) values (${userA}, ${userB})`), function (err, result, fields) {
    if (err) { console.log('this is error in friends Model', err); } 
    // console.log('result',result);
    callback(err, {result: result});
  };    
};

export default friendsModel;


