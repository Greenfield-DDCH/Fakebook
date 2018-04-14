import loginModel from '../models/loginModel';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import jws from 'jsonwebtoken';


const loginController = function (req, res) {
  loginModel(req.params.username, (err, result )=>{
    if (err) { console.log(err); }
    var data = result.results[0];
    if (req.params.password === data.password) {
      delete data.password;
      const payload = {
        userId: data.id 
      };
      var token = jwt.sign(payload, 'superSecret', {
        expiresInMinutes: 60 
      });
      // res.headers.authorization = token;
      // res.set({'Authorization': token});
      res.status(202).json(data);        
    } else {
      res.status(200).send('incorrect password');
    }
  });
};    


// var token = req.body.token || req.query.token || req.headers['x-access-token'];

// // decode token
// if (token) {

//   // verifies secret and checks exp
//   jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
//     if (err) {
//       return res.json({ success: false, message: 'Failed to authenticate token.' });    
//     } else {
//       // if everything is good, save to request for use in other routes
//       req.decoded = decoded;    
//       next();
//     }

// const loginController = (req, res) => {
//   var username = req.params.username;
//   var password = req.params.password;
//   passport.use(new LocalStrategy(
//     (username, password, done) => {
//       loginModel(username, (err, user) => {
//         if (err) { return done(err); }
//         if (!user) {
//           return done(null, false, { message: 'Incorrect username.' });
//         }
//         if (!user.validPassword(password)) {
//           return done(null, false, { message: 'Incorrect password.' });
//         }
//         return done(null, user);
//       });
//     }
//   ));
// };

export default loginController;


