import friendListModel from '../models/friendListModel';

const friendListController = function (req, res) {
  friendListModel(req.params.userId, (err, result ) => {
    if (err) { console.log(err); }
    res.send(result);
  });
};    

export default friendListController;