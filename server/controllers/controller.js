import {getPosts as gP, postToPost as pTP, getComments as gC, getFriend} from '../models/model'

export function getPosts(req, res){
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

export function findFriend(req,res){
  // console.log("inside controller", req.params);
  getFriend(req.params, function(result){
    if(result.length !== 0){
      res.send(true);
    }else{
      res.send(false);
    }
  });
}
