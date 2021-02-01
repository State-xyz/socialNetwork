import React  from "react";

import { Avatar, Badge, Card, Tabs, Image } from "antd";
import { WechatOutlined, HeartFilled } from "@ant-design/icons";

import { useSelector } from "react-redux";

import Sidebar from "../../Sidebar/Sidebar";

import _avatar from "../../../images/avatar.jpg";

const Profile = React.memo((props) => {
  const { TabPane } = Tabs;
  const postContent = useSelector((state) => state.statusForm.posts);
  let posts = [];
  postContent.map((item) => (posts = posts.concat(item.picture)));
  return (
    <div>
      <Sidebar />
      {/* Profile */}
      <div className="flex items-start gap-4 w-5/6 mx-auto mt-24">
        <Card size="small">
          <Avatar size={256} src={_avatar} />
          <p className="text-2xl mt-2">hai_dang1928</p>
            <Badge.Ribbon text="Biography">
              <Card>
                Coding is like a pretty girl - cryptic and complicated, but I
                like it.
              </Card>
            </Badge.Ribbon>
        </Card>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Posts" key="1">
            <div className="flex flex-wrap gap-4 w-full">
              {posts.map((item) => {
                return (
                  <Image
                    key={new Date()/Math.random()}
                    preview={{
                      src: item,
                      visible: false,
                      mask: (
                        <div className="flex gap-4 text-lg">
                          <span className="flex items-center gap-1 text-white font-bold">
                            {Math.floor(Math.random() * (100 - 1 + 1)) + 1}
                            <HeartFilled />
                          </span>
                          <span className="flex items-center gap-1 text-white font-bold">
                            {Math.floor(Math.random() * (100 - 1 + 1)) + 1}
                            <WechatOutlined />
                          </span>
                        </div>
                      ),
                      maskClassName: "text-lg",
                    }}
                    width={256}
                    src={item}
                  />
                );
              })}
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
});

export default Profile;
