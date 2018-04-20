import  dbConnection  from '../db';

const statusModel = function (status, userId, callback) {
  dbConnection.query(`UPDATE statuses SET state = "${status}" WHERE userId = ${userId}`, function (err, result) {
    if (err) {  console.log("ERROR NUMBER 1",err); }

    if(result.changedRows === 0){
      dbConnection.query(`select * from statuses where userId = ${userId}`, function(err, res2){
        if(res2.length === 0){
          dbConnection.query(`insert into statuses (state, userId) values ('${status}', ${userId})`, function (err,res){
            if(err){
              console.log("error NUMBER 2",err);
            }else{
              callback({status, userId});
            }
          });
        }else{
          callback({status, userId});
        }
      });
    }else{
      console.log('result*********************',result);
      callback({status, userId});
    }
  });    
}
export default statusModel;
