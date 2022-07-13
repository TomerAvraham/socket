const moment = require("moment");

function createMessage(username, text) {
  return {
    username,
    text,
    time: moment().format("hh:mm"),
  };
}

module.exports = createMessage;
