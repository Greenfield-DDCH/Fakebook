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

// io.on('connection', client => {
//   client.on('messages', (payload) => {
//     client.emit('messages', payload)
//   })
// })

io.on('connection', socket => {
  socket.on('chatmounted', user => {
    console.log('user socket id', socket.id)
  });
  socket.on('leave channel', channel => {
    var leaveChannel = JSON.stringify(channel);
    socket.leave(leaveChannel);
    socket.leave(channel);
  });
  socket.on('join channel', channel => {
    var channelid = JSON.stringify(channel.channelid);
    socketInfo[channel.userName] = {
      currentSocket : socket,
      currentChannel : channelId
    };
    socket.join(channelId);
  });
  socket.on('new message', msg => {
    var channelId = JSON.stringify(msg.eventId)
    socket.broadcast.to(channelId).emit('new message', msg);
  })
  socket.on('typing', data => {
    var channelId = JSON.stringify(data.channel);
    socket.broadcast.to(channelId).emit('typing', data.user)
  })
  socket.on('stop typing', data => {
    var channelId = JSON.stringify(data.channel);
    socket.broadcast.to(channelId).emit('stop typing', data.user)
  })
})


server.listen(3000, () =>{ 
  console.log('listening on port 3000...');
});


// const Server = require('socket.io');
// const io = new Server();