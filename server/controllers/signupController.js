import signupModel from '../models/signupModel';

const signupController = function (req, res) {
  console.log('this is signup req.body', req.body);
  signupModel(req.body, (err, result )=>{
    if (err) { console.log(err); }
    console.log('this is in signup controller', result);
    res.json(result);
  });
};    

export default signupController;