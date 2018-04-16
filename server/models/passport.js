import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import loginModel from './loginModel.js';
import bcrypt from 'bcryptjs';


passport.use(new LocalStrategy(
  (username, password, done) => {
    loginModel(username, (err, user) => {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      bcrypt.compare(password, user.results[0].password, function(err, res) {
        if (err) { console.log(err); }
        if (res) {
          return done(null, false, { message: 'Incorrect password.' });
        }
      });
      return done(null, user);
    });
  }
));

export default passport;