import {getPosts as gP, postToPost as pTP, getComments as gC} from '../models/model'

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

export function getComments(req,res){
  console.log("here");
  gC(req.params.parentId, req.params.userId, function(comments){
    res.send(comments);
  });
}
