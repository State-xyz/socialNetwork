import React from "react";

import { useDispatch } from "react-redux";

import { Badge, Avatar } from "antd";

const Contact = React.memo((props) => {
  const dispatch = useDispatch();
  const contacts = [
    {
      name: "Jaren Hammer",
      photo:
        "https://images.pexels.com/photos/247917/pexels-photo-247917.jpeg?crop=faces&fit=crop&h=200&w=200&amp;auto=compress&amp;cs=tinysrgb",
    },
    {
      name: "Sara Koivisto",
      photo: "https://randomuser.me/api/portraits/women/42.jpg",
    },
    {
      name: "Kai Wanschura",
      photo: "https://uifaces.co/our-content/donated/Te-0H20q.png",
    },
    {
      name: "Heitor",
      photo: "https://uifaces.co/our-content/donated/W9V6aXAc.jpg",
    },
    {
      name: "River Sutherland",
      photo:
        "https://images.generated.photos/eQZv39suCtpaVsql9cHM_yTexyaihuXgPYMZk5xOpbg/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yy/XzA5MzEzOTIuanBn.jpg",
    },
  ];
  const getReceiverName = (receiver) => {
    dispatch({
      type: "GET_RECEIVER_NAME",
      payload: receiver,
    });
  };
  return (
    <div className="col-span-3 flex flex-col h-5/6 border overflow-auto bg-white">
      <div className="text-lg border-b w-full p-4 text-center font-semibold">
        <span>Hai Dang</span>
      </div>
      {/* list friends */}
      <div className="h-full overflow-auto">
        {contacts.map((item) => {
          return (
            <button
              onClick={() => getReceiverName(item.name)}
              key={new Date().valueOf() / Math.random()}
              className="flex justify-start items-center p-4 w-full focus:outline-none focus:bg-gray-100 hover:bg-gray-100"
            >
              {/* <span className="w-12 h-12 rounded-full overflow-hidden mr-4"> */}
              {/* <Avatar src={item.photo} alt="" /> */}
              {/* </span> */}
              <Badge color="green" status="success" offset={[-5, 30]}>
                <Avatar src={item.photo} />
              </Badge>

              <span className="ml-2 text-lg font-bold">{item.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
});

export default Contact;
