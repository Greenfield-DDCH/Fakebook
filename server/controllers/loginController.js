import loginModel from '../models/loginModel';
import jwt from 'jsonwebtoken';


const loginController = function (req, res) {
  loginModel(req.body.username, (err, result )=>{
    if (err) { console.log(err); }
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

// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     User.findOne({ username: username }, function (err, user) {
//       if (err) { return done(err); }
//       if (!user) {
//         return done(null, false, { message: 'Incorrect username.' });
//       }
//       if (!user.validPassword(password)) {
//         return done(null, false, { message: 'Incorrect password.' });
//       }
//       return done(null, user);
//     });
//   }
// ));

