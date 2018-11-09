const moment = require('moment');

const timedMessage = (from, text) => {
  return {
    from,
    text,
    time: moment().valueOf()
  };
};

module.exports = { timedMessage };
