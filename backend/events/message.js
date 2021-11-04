const actionhandler = require("../actions");

module.exports = {
  name: "message",
  event: async function (socket, props) {
    actionhandler.sendMessage(socket.id, props.room, props.content);
  },
};
