const { timedMessage } = require('../utils/message');
const { Users } = require('../utils/users');
const _ = require('lodash');
const users = new Users();
//https://stackoverflow.com/questions/28238628/socket-io-1-x-use-websockets-only/28240802#28240802

module.exports = function(io) {
  io.set('transports', ['websocket']);

  io.on('connection', socket => {
    socket.on('join', params => {
      if (!params.name) console.log('empty params');
      console.log('params', params);
      socket.join(params.room);
      users.removeUser(socket.id);
      users.addUser(socket.id, params.name, params.room);
      // console.log('users', users);
      io.to(params.room).emit('userList', users.getUserList(params.room));
      socket.broadcast
        .to(params.room)
        .emit('emit-message', timedMessage('Admin', `${params.name} joined`));
    });

    socket.on('new-message', data => {
      const user = users.getUser(socket.id);
      console.log('user', user);
      io.to(..._.map(user, 'room')).emit(
        'emit-message',
        timedMessage(..._.map(user, 'name'), data.text)
      );
    });

    socket.on('disconnect', () => {
      console.log('Disconnect -- msg from server side');
    });
  });
};
