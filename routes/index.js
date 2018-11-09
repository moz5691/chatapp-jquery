const mongoose = require('mongoose');
const Message = mongoose.model('messages');

module.exports = function(app) {
  app.get('/api', (req, res) => {
    console.log('get message');
    // Message.find({}).then(message => res.render('chat', { message: message }));
    Message.find({}).then(message => res.send(message));
  });

  // app.post('/api', (req, res) => {
  //   console.log(req.body);
  //   const newMessage = {
  //     from: req.body.from,
  //     text: req.body.text
  //   };
  //   new Message(newMessage).save().then(message => res.send(message));
  // });
  app.post('/api', async (req, res) => {
    try {
      const message = new Message(req.body);
      await message.save();
      res.sendStatus(200);
    } catch (error) {
      res.sendStatus(500);
      console.error(error);
    }
  });
};
