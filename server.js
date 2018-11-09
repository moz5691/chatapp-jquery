const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const mongoose = require('mongoose');
require('./models/Message');

const PORT = process.env.PORT || 5000;
const public = path.join(__dirname, './public');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Load routes
// const index = require('./routes/index');

mongoose
  .connect(
    'mongodb://localhost/realTimeChat',
    // 'mongodb://chatbox:chatbox1@ds151753.mlab.com:51753/chatbox',
    { useNewUrlParser: true }
  )
  .then(() => console.log('mongoDB connected.'))
  .catch(err => console.log(err));

require('./routes/html-routes')(app);
require('./routes/index')(app);
require('./sockets/message-sockets')(io);
// app.use('/index', index);

server.listen(PORT, () => {
  console.log('Server is listenging PORT: ', PORT);
});
