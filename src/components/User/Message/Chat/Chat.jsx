import React, { useState } from "react";

import Picker from "emoji-picker-react";
import TelegramIcon from "@material-ui/icons/Telegram";

import { Popover } from "antd";
import {
  SmileOutlined,
} from "@ant-design/icons";

import { useSelector } from "react-redux";

const Chat = React.memo((props) => {
  const [text, setText] = useState("");
  const [textContainer, setTextContainer] = useState({
    isFromMe: true,
    myMessage: [],
    yourMessage: [],
  });
  const handleChangeText = (e) => {
    setText(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setTextContainer({
      ...textContainer,
      myMessage: [...textContainer.myMessage, text],
      yourMessage: ["a", "b"],
    });
    setText("");
  };
  const onEmojiClick = (e, emojiObj) => {
    let emoji = emojiObj.emoji;
    setText(text + emoji);
  };

  const receiver = useSelector((state) => state.chat.receiver);
  const isChatStarted = useSelector(state => state.chat.isChatStarted)
  return (
    <div className="col-span-7 h-5/6 border-r border-t border-b bg-white">
      {isChatStarted ? (
        <div className="relative h-full w-full">
          {/* friend */}
          <div className="text-lg border-b w-full p-4 text-center font-semibold">
            <span>{receiver}</span>
          </div>
          {/* Message */}
          <div className="relative h-5/6 w-full overflow-auto">
            <div
              id="scroll"
              className="absolute bottom-12 w-full flex flex-col gap-5 max-h-full overflow-auto py-4"
            >
              {
                /* My message */
                textContainer.isFromMe
                  ? textContainer.myMessage.map((item) => {
                      return (
                        <div className="text-right">
                          <span className="inline-block break-words p-4 border rounded-3xl mx-8 -mt-4 bg-blue-100 shadow-inner ">
                            {item}
                          </span>
                        </div>
                      );
                    })
                  : textContainer.yourMessage.map((item) => {
                      return (
                        /* Your message */
                        <div className="text-left gap-10">
                          <span className="p-4 border rounded-3xl ml-8 bg-red-100 shadow-inner">
                            {"aadsad"}
                          </span>
                        </div>
                      );
                    })
              }
            </div>
          </div>

          {/* Input */}
          <div className="absolute bottom-0 w-full flex justify-center items-center mb-4">
            <div className="border-t border-b border-l p-2 rounded-l-3xl">
              <Popover content={<Picker onEmojiClick={onEmojiClick} />}>
                <button>
                  <SmileOutlined style={{ fontSize: "28px" }} />
                </button>
              </Popover>
            </div>

            <form
              className="border-r border-t border-b pr-4 focus:outline-none w-5/6 rounded-r-3xl"
              onSubmit={handleSubmit}
            >
              <input
                className="focus:outline-none text-xl p-2 w-full"
                onChange={handleChangeText}
                type="text"
                placeholder="Enter your message here"
                value={text}
              />
            </form>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col justify-center items-center gap-4">
          <span className="p-4 border rounded-full border-black">
            <TelegramIcon />
          </span>
          <span className="text-2xl text-gray-500">Your Messages</span>
          <span className="text-lg">
            Select a friend in contacts to send private photos and messages
          </span>
        </div>
      )}
    </div>
  );
});

export default Chat;
