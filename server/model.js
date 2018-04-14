import dbConnection from './db';

export function getPosts(profileId,callback){
  dbConnection.query(`select u.username, p.post, p.type from users u inner join posts p on (u.id = p.user_id) where p.profile_id = ${profileId}`, function(err, result){
    if(err){
      console.log('err',err);
    }else{
      callback(result);
    }
  });
}// may need to look for posts of type 0 

export function postToPost(data, callback){
  console.log("post data",data);
  dbConnection.query(`insert into posts (user_id, profile_id, post, type) values (${data.owner}, ${data.whoseProfile}, '${data.postText}', ${data.type})`);
  callback(true);
}