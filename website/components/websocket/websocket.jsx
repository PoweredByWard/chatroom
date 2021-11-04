import { useState, useEffect } from "react";
import { io } from "socket.io-client";
const webSocket = () => {
  const [webSocket, setSocket] = useState();
  useEffect(() => {
    // connect to socket server
    const socket = io("ws://localhost:4000", {
      autoConnect: true,
    });
    setSocket(socket);
    // log socket connection

    // socket disconnet onUnmount if exists
    if (socket)
      return () => {
        console.log("closing")
        socket.disconnect();
      };
  }, []);
  return webSocket;
};

export default webSocket;
