import {getPosts as gP,} from './model'

export function getPosts(req, res){
  gP(req.params.userId, function(posts){
    console.log("inside controller",posts);
    res.send(posts);
  });
}

// export function postPost(req, res){
//   models.posts.post(function(){

//   });
// }