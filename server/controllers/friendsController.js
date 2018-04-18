import friendsModel from '../models/friendsModel';

const friendsController = function (req, res) {
  friendsModel(req.body.UserA, req.body.UserB, (err, result ) => {
    if (err) { console.log(err); }
    res.json(result);
  });
};    

export default friendsController;