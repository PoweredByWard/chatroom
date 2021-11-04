const { leaveRoom } = require("../../actions");

module.exports = {
    name:"leave_room",
    event:async (socket,props)=>{
        leaveRoom(props,socket.id)
    }
};
