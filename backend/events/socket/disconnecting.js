const actionHandler = require("../../actions");

module.exports = {
  name: "disconnecting",
  event: async (socket, props) => {
    await actionHandler.disconnectSocket(socket);
  },
};
