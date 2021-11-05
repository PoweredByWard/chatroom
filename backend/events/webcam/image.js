const { streamWebcam } = require("../../actions");

module.exports = {
  name: "webcam",
  event: async (socket, props) => {
    await streamWebcam(socket.id, props.content, props.roomId);
  },
};
