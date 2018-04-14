import profileModel from '../models/profileModel.js';
import editpictureModel from '../models/editpictureModel.js';

const profileController = {
  EditStatus : (req, res) => {
    console.log('this is statusss', req.body)
    

    
  },

  EditPicture : (req, res) => {
    console.log('this is the edit picture: req.body', req.body)
    editpictureModel(req.body.data, req.body.userId, function (err, result, fields) {
      console.log('this is the result ', result);
      
    })

  }
}
export default profileController;