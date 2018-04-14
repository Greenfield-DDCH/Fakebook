import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import loginModel from './models/loginModel';


passport.use(new LocalStrategy(
  (username, password, done) => {
    loginModel(username, (err, user) => {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (user.results[0].password !== password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

export default passport;

