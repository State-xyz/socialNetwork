import React, { useState, useEffect } from "react";

import Picker from "emoji-picker-react";

import { useDispatch, useSelector } from "react-redux";

import _avatar from "../../../../../images/avatar.jpg";

import {
  SmileOutlined,
} from "@ant-design/icons";
import { Popover, Modal, Button, Comment as Cmt, Avatar } from "antd";

const Comment = React.memo((props) => {
  const { id, openComment, setOpenComment } = props;
  const [commentContainer, setCommentContainer] = useState([]);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const onEmojiClick = (e, emojiObj) => {
    let emoji = emojiObj.emoji;
    setComment(comment + emoji);
  };
  const handleChangeComment = (e) => {
    setComment(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setCommentContainer([...commentContainer, comment]);
    setComment("");
  };
  useEffect(() => {
    dispatch({
      type: "HANDLE_COMMENT",
      payload: {
        comments: commentContainer,
        id: id,
      },
    });
  }, [commentContainer, id, dispatch]);
  const posts = useSelector((state) => state.statusForm.posts);
  const handleCloseComment = () => {
    setOpenComment(false);
  };

  return (
    <>
      <Modal
        closable={false}
        footer={
          <Button danger onClick={handleCloseComment}>
            Close
          </Button>
        }
        visible={openComment}
      >
        <div className="flex w-full">
          {/* handle emoji */}
          <div className="border-t border-b border-l p-2">
            <Popover placement="bottom" content={<Picker onEmojiClick={onEmojiClick} />}>
              <button>
                <SmileOutlined style={{ fontSize: "24px" }} />
              </button>
            </Popover>
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-full border-t border-b border-r mr-0 p-2 focus:outline-none text-lg"
          >
            <input
              autoComplete="off"
              className="w-full focus:outline-none"
              onChange={handleChangeComment}
              value={comment}
              name="comment"
              type="text"
              placeholder="Write a comment..."
            />
          </form>
          <div className="ml-2 p-2">
            <Button onClick={handleSubmit} type="primary">Post</Button>
          </div>
        </div>

        {posts ? posts.map(item => {
          return item.id === id ?
          (item.comments.map(cmt => {
            return (
              <Cmt
                avatar={<Avatar src={_avatar} alt="Hai Dang" />}
                key={new Date() / Math.random()}
                author={<span>hai_dang1928</span>}
                content={<p>{cmt}</p>}
              />
            );
          })) : null 
        }) : null}
      </Modal>
    </>
  );
});

export default Comment;
