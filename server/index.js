import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import http from 'http';
import SocketIO from 'socket.io';

import router from './router';
import './db/';

const app = express();
const server = http.createServer(app);
const io = SocketIO(server);

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

io.on('connection', client => {
  client.on('messages', (payload) => {
    client.emit('messages', payload)
  })
})


server.listen(3000, () =>{ 
  console.log('listening on port 3000...');
});


// const Server = require('socket.io');
// const io = new Server();