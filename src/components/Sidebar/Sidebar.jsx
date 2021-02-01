import React from "react";

import { NavLink } from "react-router-dom";

import HomeIcon from "@material-ui/icons/Home";
import TelegramIcon from "@material-ui/icons/Telegram";

import { Avatar, Popover, Button } from "antd";

import { signOut } from "../../Auth/auth";

import { useSelector, useDispatch } from "react-redux";

import _avatar from "../../images/avatar.jpg";

const Sidebar = React.memo((props) => {
  const auth = useSelector((state) => state.auth_user);
  const dispatch = useDispatch();
  return (
    <div className="w-screen border-b fixed top-0 bg-white z-10">
      <div className="flex items-center justify-between w-5/6 mx-auto px-4">
        <a
          href="/#"
          style={{ fontFamily: "Satisfy, cursive" }}
          className="text-3xl font-bold cursor-pointer"
        >
          homeCoffee
        </a>
        <ul className="list-none flex justify-end items-center bg-white">
          <li>
            <NavLink exact to="/dashboard">
              <button className="text-lg p-4 rounded-md w-full text-left font-bold focus:text-blue-600 focus:outline-none">
                <HomeIcon className="-mr-2" />
              </button>
            </NavLink>
          </li>
          <li>
            <NavLink to="/message">
              <button className="text-lg p-4 rounded-md w-full text-left font-bold focus:text-blue-600 focus:outline-none">
                <TelegramIcon className="mr-2" />
              </button>
            </NavLink>
          </li>
          <li>
            <Popover
              content={
                <div className="flex flex-col gap-2">
                  <NavLink to="/profile">
                    <Button type="primary">Profile</Button>
                  </NavLink>

                  <Button
                    danger
                    onClick={() => {
                      dispatch(signOut(auth.uid));
                    }}
                  >
                    Logout
                  </Button>
                </div>
              }
            >
              <Avatar src={_avatar} />
            </Popover>
          </li>
        </ul>
      </div>
    </div>
  );
});

export default Sidebar;
