import loginModel from '../models/loginModel';

const loginController = function (req, res) {
  console.log('this is login req.params', req.params);
  loginModel(req.params.username, (err, result )=>{
    if (err) { console.log(err); }
    console.log('this is in login controller', result);
    res.json(result);
  });
};    

export default loginController;