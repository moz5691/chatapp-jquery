const path = require('path');

module.exports = function(app) {
  app.get('/chat', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/chat.html'));
  });
};
