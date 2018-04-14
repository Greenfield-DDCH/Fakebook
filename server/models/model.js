import dbConnection from '../db';

export function getPosts(profileId,callback){
  dbConnection.query(`select u.username, p.post, p.type, p.id from users u inner join posts p on (u.id = p.user_id) where p.profile_id = ${profileId} and type = 0`, function(err, result){
    if(err){
      console.log('err',err);
    }else{
      callback(result);
    }
  });
}// may need to look for posts of type 0 

export function getComments(parentId, profileId, callback){
  dbConnection.query(`select u.username, p.post, p.type, p.id from users u inner join posts p on (u.id = p.user_id) where p.parent_id = ${parentId} and p.profile_id = ${profileId}`, function(err, result){
    if(err){
      console.log('err', err);
    }else{
      callback(result);
    }
  });
}

export function postToPost(data, callback){
  console.log("post data",data);
  if(data.type === 0){
    dbConnection.query(`insert into posts (user_id, profile_id, post, type) values (${data.owner}, ${data.whoseProfile}, '${data.postText}', ${data.type})`);
  }else if(data.type === 1){
    dbConnection.query(`insert into posts (user_id, profile_id, post, type, parent_id) values (${data.owner}, ${data.whoseProfile}, '${data.commentText}', ${data.type}, ${data.parentId})`);
  }
  callback(true);
}