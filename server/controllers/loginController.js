import loginModel from '../models/loginModel';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';


const loginController = function (req, res) {
  loginModel(req.params.username, (err, result )=>{
    if (err) { console.log(err); }
    var data = result.results[0];
    if (req.params.password === data.password) {
      delete data.password;
      res.status(202).json(data);        
    } else {
      res.status(200).send('incorrect password');
    }
  });
};    

export default loginController;



passport.use(new LocalStrategy(
  function(username, password, done) {
    // User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));