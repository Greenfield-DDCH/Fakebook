import {getPosts as gP, postToPost as pTP} from './model'

export function getPosts(req, res){
  gP(req.params.userId, function(posts){
    res.send(posts);
  });
}

export function postToPosts(req, res){
  pTP(req.body, function(posted){
    console.log("posted",posted);
    res.send(posted);
  })
}

// export function postPost(req, res){
//   models.posts.post(function(){

//   });
// }