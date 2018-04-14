import statusModel from '../models/statusModel.js';
import editpictureModel from '../models/editpictureModel.js';

const profileController = {
  EditStatus : (req, res) => {
    console.log('this is statusss', req.body)
    statusModel(req.body.status, req.body.userId, function (err, result, fields) {
      if (err) {
        console.log('this is the error: ', err)
      }
      else {
        console.log('this is the result:  ', result);
        res.send(result);
      }
    })
    
  },

  EditPicture : (req, res) => {
    console.log('this is the edit picture: req.body', req.body)
    editpictureModel(req.body.data, req.body.userId, function (err, result, fields) {
      if(err) {
        console.log('this is the error ', err)
      }
      else {
        console.log('this is the result ', result);
        res.send(result);
      }
      
    })

  }
}
export default profileController;