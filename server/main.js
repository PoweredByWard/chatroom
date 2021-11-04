const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server, Socket } = require("socket.io");
const io = new Server(server, { cors: "*" });

let waitingRoom = [];
Socket.prototype.onclose = function (reason) {
  this.emit("disconnecting", reason);
  this.leaveAll();

  this.emit("disconnect", reason);
};
//app setup

server.listen(4000, async () => {
  console.log("listening to request on port 4000");
});

io.on("connection", async (socket) => {
  async function joinRoom() {
    if (waitingRoom.length > 0) {
      socket.join(`${socket.id}_room`);
      waitingRoom[0].join(`${socket.id}_room`);
      waitingRoom[0].emit("found_stranger");
      socket.emit("found_stranger");
      waitingRoom = waitingRoom.slice(1);
    } else {
      waitingRoom.push(socket);
    }
  }

  async function leaveRoom(room) {
    io.in(room).emit("room_ended");
    const clients = io.sockets.adapter.rooms.get(room);
    for (const clientId of clients) {
      try {
        const clientSocket = io.sockets.sockets.get(clientId);
        clientSocket.leave(room);
      } catch {}
    }
  }
  
  joinRoom();

  socket.on("disconnecting", () => {
    let rooms = socket.rooms;
    console.log(rooms);
    rooms.forEach(function (room) {
      leaveRoom(room);
    });
  });

  socket.on("find_room", joinRoom);

  socket.on("webcam", async (stream) => {
    let rooms = Array.from(socket.rooms);
    if (socket.rooms.size > 1) {
      console.log(stream)
      socket.broadcast.to(rooms[1]).emit("webcamStream", stream);
    }
  });

  socket.on("leave_room", async () => {
    let rooms = Array.from(socket.rooms);
    if (socket.rooms.size > 1) {
      leaveRoom(rooms[1]);
    }
  });

  socket.on("message", async (props) => {
    let rooms = Array.from(socket.rooms);
    if (socket.rooms.size > 1) {
      socket.broadcast
        .to(rooms[1])
        .emit("message", { sender: "stranger", content: props });
    }
  });
});
