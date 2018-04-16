import {getPosts as gP, postToPost as pTP, getComments as gC} from '../models/model'

export function getPosts(req, res){
  console.log("inside controller");
  gP(req.params.userId, function(posts){
    console.log("sending response",posts)
    res.send(posts);
  });
}

export function postToPosts(req, res){
  pTP(req.body, function(posted){
    res.send(posted);
  })
}

export function getComments(req,res){
  gC(req.params.parentId, req.params.userId, function(comments){
    res.send(comments);
  });
}
