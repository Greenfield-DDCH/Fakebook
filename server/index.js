import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import router from './router';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import './db/';

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


// const Server = require('socket.io');
// const io = new Server();

// const server = require('http').createServer();

// const io = require('socket.io')(server, {
//   path : '/test',
//   serveClient : false,
//   pingInterval: 10000,
//   pingTimeout: 5000,
//   cookie: false
// });

// server.listen(8080);