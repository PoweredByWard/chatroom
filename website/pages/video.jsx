import { useEffect, useReducer, useRef, useState } from "react";
import CamSpace from "../components/chatroom/CamSpace";
import ChatSpace from "../components/chatroom/ChatSpace";
import TextBoxSpace from "../components/chatroom/TextBoxSpace";
import Webcam from "../components/Webcam";
import webSocket from "../components/websocket/websocket";

const Video = () => {
  const [searching, setSearching] = useState(false);
  const [connected, setConnected] = useState(false);
  const strangerCam = useRef();
  const socketCon = webSocket();

  const [socket, setSocket] = useState();

  const input = useRef();
  const [messages, dispatch] = useReducer((state, action) => {
    if (action.message) action.message.id = state.length + 1;
    switch (action.type) {
      case "SEND_MESSAGE":
        socket.emit("message", action.message);
        return [...state, action.message];

      case "RECEIVE_MESSAGE":
        console.log(action.message);
        return [...state, action.message];
      case "RESET_MESSAGES":
        return [];
      default:
        new Error("Unknown action type");
        return state;
    }
  }, []);

  useEffect(() => {
    if (socketCon) {
      socketCon.on("connect", () => {
        searchRoom();
        setSocket(socketCon);
      });
      socketCon.on("disconnect", () => {
        stopChat();
        console.log("SOCKET Disconnected!", socketCon.id);
        setSocket(socketCon);
      });
      socketCon.on("member_joined", () => {
        setSearching(false);
        setConnected(true);
        input.current?.focus();
      });
      socketCon.on("room_ended", () => {
        setConnected(false);
        setSearching(false);
        dispatch({ type: "RESET_MESSAGES" });
      });
      socketCon.on("message", (message) => {
        dispatch({ type: "RECEIVE_MESSAGE", message });
      });
    }
  }, [socketCon]);

  String.prototype.replaceAll = function (str1, str2, ignore) {
    return this.replace(
      new RegExp(
        str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"),
        ignore ? "gi" : "g"
      ),
      typeof str2 == "string" ? str2.replace(/\$/g, "$$$$") : str2
    );
  };

  function sendMessage() {
    let content = input.current.value;
    if (socket?.connected && content.replaceAll(" ", "") != "") {
      dispatch({
        type: "SEND_MESSAGE",
        message: { sender: null, content: content },
      });
      input.current.value = "";
      return true;
    }
    return false;
  }

  async function stopChat() {
    setConnected(false);
    setSearching(false);
    dispatch({ type: "RESET_MESSAGES" });
    socketCon.emit("leave_room");
  }

  async function searchRoom() {
    setSearching(true);
    socketCon.emit("find_room", "webcam");
  }

  const streamCamera = function (stream) {
    if (!connected) return;
    console.log(stream);
    socketCon.emit("webcam", stream);
  };

  return (
    <div className="flex h-full">
      <div className="w-96  rounded-md m-4 mr-0 min-w-min flex flex-col justify-items-stretch">
        <div className="bg-gray-400 h-1/2 rounded-md mb-2 p-2">
          <Webcam camStream={streamCamera} connected={connected} />
        </div>
        <div className="bg-gray-400 h-1/2 rounded-md mt-2 p-2">
          <video className="w-full h-full bg-gray-800" useRef={strangerCam} />
        </div>
      </div>
      <div class="flex flex-col flex-auto h-full flex-grow right-0 left-0 p-4">
        <div class="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-400 h-full p-4">
          <ChatSpace
            messages={messages}
            searching={searching}
            connected={connected}
          ></ChatSpace>
          <TextBoxSpace
            sendMessage={sendMessage}
            stop={stopChat}
            search={searchRoom}
            searching={searching}
            connected={connected}
          >
            <input
              type="text"
              class="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 pr-10 h-10"
              disabled={!socket?.connected}
              ref={input}
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  sendMessage();
                }
              }}
              disabled={!connected}
            />
          </TextBoxSpace>
        </div>
      </div>
    </div>
  );
};

export default Video;
