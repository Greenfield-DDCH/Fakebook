import {dbConnection as db} from './db/index';

export function getPosts(profileId,callback){
  console.log("profile id ", profileId);
  db.query(`select u.username, p.post, p.type from users u inner join posts p on (u.id = p.user_id) where p.profile_id = ${profileId}`, function(err, result){
    if(err){
      console.log('err',err);
    }else{
      console.log("inside db",result);
      callback(result);
    }
  });
}