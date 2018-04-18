import dbConnection from '../db';

export function getPosts(profileId, callback) {
  dbConnection.query(`select u.username, p.post, p.type, p.id from users u inner join posts p on (u.id = p.user_id) where p.profile_id = ${profileId} and type = 0`, function(err, result) {
    if (err) {
      console.log('err', err);
    } else {
      let comments = [];

      let callback2 = function(results) {
        comments.push(results);
        if (comments.length === result.length) {
          callback(comments);
        }
      };// second callback needed in order to store comments from second query

      if (result.length >= 1) {
        result.forEach(function(post, i) {
          dbConnection.query(`select u.username, p.post, p.type, p.id from users u inner join posts p on (u.id = p.user_id) where p.parent_id = ${post.id} and p.profile_id = ${profileId}`, function(err, comments) {
            if (err) {
              console.log('err', err);
            } else {
              post.comments = comments;
              callback2(post);
            }
          });
      
        });
      } else {
        callback(result);
      }
    }// end else
  });
}

export function getComments(parentId, profileId, callback) {
  dbConnection.query(`select u.username, p.post, p.type, p.id from users u inner join posts p on (u.id = p.user_id) where p.parent_id = ${parentId} and p.profile_id = ${profileId}`, function(err, result) {
    if (err) {
      console.log('err', err);
    } else {
      callback(result);
    }
  });
}

export function postToPost(data, callback) {

  if (data.type === 0) {
    dbConnection.query(`insert into posts (user_id, profile_id, post, type) values (${data.owner}, ${data.whoseProfile}, '${data.postText}', ${data.type})`);
  } else if (data.type === 1) {
    dbConnection.query(`insert into posts (user_id, profile_id, post, type, parent_id) values (${data.owner}, ${data.whoseProfile}, '${data.commentText}', ${data.type}, ${data.parentId})`);
  }
  
  callback(true);
}

export function getFriend(users, callback) {
  dbConnection.query(`select * from friends where (user_id_a = ${users.currUserId} and user_id_b = ${users.loggedInAsId}) or (user_id_b = ${users.currUserId} and user_id_a = ${users.loggedInAsId})`, function(err, result) {
    if (err) {
      console.log('Error finding friends', err);
    } else {
      callback(result);
    }
  });
}