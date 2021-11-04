import Image from "next/image";
import { useEffect, useRef } from "react";
import logo from "../../public/logo.jpg";

const ChatSpace = (props) => {
  console.log(props.messages);
  const chat = useRef();
  useEffect(() => {
    scrollToBottom();
  }, [props.messages]);

  const scrollToBottom = () => {
    chat.current.scrollTop = chat.current.scrollHeight;
  };
  return (
    <>
      <div class="flex flex-col h-full overflow-x-auto mb-4" ref={chat}>
        <div class="flex flex-col h-full">
          <h2 className="text-gray-700 mb-3">
            {props.searching && "Looking for a stranger to chat with..."}
            {props.connected && "You're now chatting with a random stranger."}
            {!props.connected &&
              !props.searching &&
              "Click NEW to find a new stranger to talk to."}
          </h2>
          <div class="grid grid-cols-12 gap-y-0.5">
            {props.messages.map((msg) => {
              if (msg.sender == null) {
                console.log(msg.id);
                const previousMessage = props.messages[msg.id - 2]
                  ? props.messages[msg.id - 2]
                  : null;
                console.log(previousMessage);
                console.log(msg);
                return (
                  <div
                    key={msg.id.toString()}
                    class="col-start-6 col-end-13 rounded-lg"
                  >
                    <div class="flex items-center justify-start flex-row-reverse">
                      <>
                        <div className="h-10 w-10">
                          {(previousMessage == null ||
                            previousMessage?.sender != msg.sender) && (
                            <div class="flex items-center justify-center h-10 w-10 rounded-full text-gray-50 bg-indigo-500 flex-shrink-0">
                              YOU
                            </div>
                          )}
                        </div>
                        <div class="relative mr-1.5 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                          <div>{msg.content}</div>
                        </div>
                      </>
                    </div>
                  </div>
                );
              } else {
                console.log(msg)
                return (
                  <div
                    key={msg.id.toString()}
                    class="col-start-1 col-end-8 p-3 rounded-lg"
                  >
                    <div class="flex flex-row items-center">
                      <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                        <img
                          src="https://i.pinimg.com/736x/3e/aa/24/3eaa245d923949b6f662b8ba07b7a3b2.jpg"
                          className="rounded-full"
                        />
                      </div>
                      <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                        <div>{msg.content}</div>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatSpace;
