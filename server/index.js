import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import router from './router';
import passport from 'passport';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(passport.initialize());
app.use('/api', router);

passport.serializeUser(function(user, done) {
  done(null, user);
});
  
passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.listen(3000, () =>{ 
  console.log('listening on port 3000...');
});