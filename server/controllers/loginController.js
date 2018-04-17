import loginModel from '../models/loginModel';
import jwt from 'jsonwebtoken';

const loginController = function (req, res) {
  loginModel(req.body.username, (err, result )=>{
    if (err) { console.log("error found",err); }
    var data = result.results[0];
    delete data.password;
    const payload = {
      userId: data.id 
    };
    const token = jwt.sign(payload, 'superSecret', {
      expiresIn: 3600 
    });
    res.status(202)       
      .set({'Authorization': token})
      .set('Access-Control-Expose-Headers', 'Authorization')
      .json(data); 
  });
}; 

export default loginController;