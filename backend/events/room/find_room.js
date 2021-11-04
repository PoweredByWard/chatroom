const actionhandler = require("../../actions");
module.exports = {
  name: "find_room",
  event: async (socket, props) => {
    await actionhandler.searchRoom(socket, props);
  },
};
