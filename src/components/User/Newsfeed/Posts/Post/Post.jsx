import React, { useState } from "react";

import Comment from "./Comment";

import _avatar from "../../../../../images/avatar.jpg";

import { Avatar, Carousel, Badge } from "antd";
import { CommentOutlined, HeartOutlined, HeartFilled } from "@ant-design/icons";

const Post = React.memo((props) => {
  const {
    id,
    likes,
    isLike,
    comments,
    handleLike,
    description,
    picture,
  } = props;
  const [openComment, setOpenComment] = useState(false);
  const handleOpenComment = () => {
    setOpenComment(true);
  };

  return (
    <div className="mt-4 border bg-white">
      <div className="flex items-center gap-4 mb-2 pt-4 pl-4">
        <button className="focus:outline-none">
          <Avatar size={32} src={_avatar} />
        </button>
        <span className="font-bold">hai_dang1928</span>
      </div>
      <span className="pl-4 mb-4">{description}</span>
      <div className="mt-2">
        <Carousel>
          {picture.map((item) => {
            return <img src={item} alt="" />;
          })}
        </Carousel>
      </div>

      <div className="flex gap-2 p-2 mx-2 py-4">
        <button onClick={handleLike} className="focus:outline-none">
          {isLike ? (
            <Badge style={{ backgroundColor: "orange" }} count={likes}>
              <HeartFilled style={{ fontSize: "24px", color: "#f50057" }} />
            </Badge>
          ) : (
            <Badge style={{ backgroundColor: "orange" }} showZero count={likes}>
              <HeartOutlined style={{ fontSize: "24px" }} />
            </Badge>
          )}
        </button>
        <button className="focus:outline-none" onClick={handleOpenComment}>
          <Badge
            style={{ backgroundColor: "blue" }}
            showZero
            count={comments.length}
          >
            <CommentOutlined style={{ fontSize: "24px" }} />
          </Badge>
        </button>
      </div>

      <Comment
        id={id}
        openComment={openComment}
        setOpenComment={setOpenComment}
      />
    </div>
  );
});

export default Post;
