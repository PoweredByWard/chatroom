const cuid = require("cuid");
const room = require("../classes/room");

let rooms = {};
let sockets = {};

module.exports = {
  getRooms: async () => {
    return rooms;
  },
  createRoom: async (members,roomType) => {
    let id = cuid();
    console.log(room);
    rooms[id] = new room(id, [],roomType);
    members.forEach((member) => {
      module.exports.joinRoom(id, member);
    });
    return room;
  },
  deleteRoom: async (room) => {
    delete rooms[room.id];
  },
  disconnectSocket: async (socket) => {
    let socketRooms = await module.exports.getSocketRooms(socket.id);
    socketRooms.forEach((room) => {
      module.exports.leaveRoom(room, socket.id);
    });
    delete sockets[socket.id];
  },
  connectSocket: async (socket) => {
    sockets[socket.id] = socket;
  },
  joinRoom: async (roomId, socketId) => {
    rooms[roomId].members.push(socketId);
    sockets[socketId].join(roomId);
  },
  getSocketRooms: async (socketId) => {
    return Array.from(sockets[socketId].rooms).slice(1);
  },
  leaveRoom: async (roomId, socketId, room_ended) => {
    //remove member from room
    if (!roomId) {
      let socketRooms = await module.exports.getSocketRooms(socketId);
      if (socketRooms.length != 0) roomId = socketRooms[0];
      console.log("sockets:", sockets);
      console.log("rooms:", rooms);
      console.log("socketRooms:", socketRooms);
      console.log("socketId:", socketId);
    }
    if (!rooms[roomId]) return;
    rooms[roomId].members = rooms[roomId].members.filter(
      (member) => member != socketId
    );

    sockets[socketId].leave(roomId);
    if (room_ended) sockets[socketId].emit("room_ended");

    //if there is only one person in the room remove that user and delete the room
    if (rooms[roomId].members.length <= 1) {
      rooms[roomId].members.forEach((member) => {
        module.exports.leaveRoom(roomId, member, true);
      });
      delete rooms[roomId];
    }
  },
  searchRoom: async (socket, roomType) => {
    //gets a list of all possible matching rooms
    idealRooms = Object.values(rooms).filter(
      (room) => room.members.length < room.maxSize && roomType == room.type
    );
    idealRooms.sort((a, b) => a.created > b.created);
    if (idealRooms.length > 0) {
      const room = idealRooms[0].id;
      await module.exports.joinRoom(room, socket.id);
      await socket.to(room).emit("member_joined", socket.id);
      await socket.emit("member_joined", socket.id);
    } else {
      await module.exports.createRoom([socket.id],roomType);
      console.log(rooms);
      console.log(Object.values(sockets).length);
    }
  },
  sendMessage: async (socketId, roomId, message) => {
    if (!roomId) {
      let socketRooms = await module.exports.getSocketRooms(socketId);
      roomId = socketRooms[1];
    }
    console.log({ sender: socketId, content: message });
    sockets[socketId]
      .to(roomId)
      .emit("message", { sender: socketId, content: message });
  },
};
