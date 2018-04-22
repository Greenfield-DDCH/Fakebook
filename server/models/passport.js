import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import loginModel from './loginModel';
import bcrypt from 'bcryptjs';


passport.use(new LocalStrategy(
  (username, password, done) => {
    loginModel(username, (err, user) => {
      if (err) { return done(err); }
      if (!user || user.results.length === 0) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      bcrypt.compare(password, user.results[0].password, function(err, res) {
        if (err) { console.log("bcrypt compare error: ",err); }
        if (res) {
          console.log("response from comparing passwords",res);
        }
      });
      return done(null, user);
    });
  }
));

export default passport;