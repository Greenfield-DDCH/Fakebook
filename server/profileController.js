import profileModel from './profileModel.js';

// const profileController = function (req, res) {
//   console.log('this is req.params', req.params);
//  EditStatus : 

//   }

const profileController = {
  EditStatus : (req, res) => {
    console.log('this is status', req.body.status)
    
  }
}
export default profileController;