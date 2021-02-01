import React from "react";
import Sidebar from "../../Sidebar/Sidebar";

import Chat from "./Chat/Chat";
import Contact from "./Contact/Contact";

const Message = React.memo((props) => {
  return (
    <div className="h-full overflow-hidden">
    <Sidebar/>
      <div className="grid grid-cols-10 mt-20 w-5/6 h-screen mx-auto">
        <Contact />
        <Chat />
      </div>
    </div>
  );
});

export default Message;
