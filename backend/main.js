const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server, Socket } = require("socket.io");
const io = new Server(server, { cors: "*" });

const eventHandler = require("./events");
const actionHandler = require("./actions")

server.listen(4000, async () => {
  console.log("listening to request on port 4000");
  await eventHandler.reloadEvents();
  setInterval(async () => {
    await eventHandler.reloadEvents();
  }, 1000 * 60 * 60);
});

io.on("connection", async (socket) => {
  actionHandler.connectSocket(socket)
  await eventHandler.connectSocket(socket);
});
