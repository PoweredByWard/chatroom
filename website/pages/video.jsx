import { useEffect, useReducer, useRef, useState } from "react";
import CamSpace from "../components/chatroom/CamSpace";
import ChatSpace from "../components/chatroom/ChatSpace";
import TextBoxSpace from "../components/chatroom/TextBoxSpace";
import Webcam from "../components/Webcam";
import webSocket from "../components/websocket/websocket";

const Video = () => {
  const [searching, setSearching] = useState(false);
  const [connected, setConnected] = useState(false);
  const [lastFrame, setLastFrame] = useState("");
  const strangerWebcam = useRef();
  const socketCon = webSocket();

  const [socket, setSocket] = useState();

  const input = useRef();

  const [strangerWebcamSrc, dispatchWebcam] = useReducer((state, action) => {
    if (action.message) action.message.id = state.length + 1;
    switch (action.type) {
      case "SEND_WEBCAM":
        socket?.emit("webcam", { content: action.dataURL });
        return lastFrame;
      case "RECEIVE_WEBCAM":
        if (action.videoDataUrl) {
          setLastFrame(action.videoDataUrl);
          return action.videoDataUrl;
        } else {
          return lastFrame;
        }
      case "RESET_WEBCAM":
        return "";
      default:
        new Error("Unknown action type");
        return state;
    }
  }, "");

  const [messages, dispatchMsg] = useReducer((state, action) => {
    if (action.message) action.message.id = state.length + 1;
    switch (action.type) {
      case "SEND_MESSAGE":
        console.log(action);


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
        dispatchMsg({ type: "RESET_MESSAGES" });
      });
      socketCon.on("message", (message) => {
        dispatchMsg({ type: "RECEIVE_MESSAGE", message });
      });
      socketCon.on("webcam_stream", (props) => {
        const videoDataUrl = props.content;
        dispatchWebcam({ type: "RECEIVE_WEBCAM", videoDataUrl });
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
      dispatchMsg({
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
    dispatchMsg({ type: "RESET_MESSAGES" });
    socketCon.emit("leave_room");
  }

  async function searchRoom() {
    setSearching(true);
    socketCon.emit("find_room", "webcam");
  }

  const streamCamera = async function (video) {
    if (!video) return;
    const canvas = document.createElement("canvas");
    // scale the canvas accordingly
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    // draw the video at that frame
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    // convert it to a usable data URL
    const dataURL = canvas.toDataURL("image/jpeg");
    if (dataURL != "") dispatchWebcam({ type: "SEND_WEBCAM", dataURL });
  };

  return (
    <div className="flex h-full">
      <div className="w-96  rounded-md m-4 mr-0 min-w-min flex flex-col justify-items-stretch">
        <div className="bg-gray-400 h-1/2 rounded-md mb-2 p-2">
          <Webcam camStream={streamCamera} connected={connected} />
        </div>
        <div className="bg-gray-400 h-1/2 rounded-md mt-2 p-2">
          <img
            className="w-full"
            src={strangerWebcamSrc}
            useRef={strangerWebcam}
          />
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
