import React, { useState, useEffect } from "react";

import GifIcon from "@material-ui/icons/Gif";

import { Button, Modal, Avatar, Popover, Image } from "antd";
import {
  EditOutlined,
  SmileOutlined,
  FileImageOutlined,
} from "@ant-design/icons";

import Picker from "emoji-picker-react";

import _avatar from "../../../../images/avatar.jpg";

import axios from "axios";

import { useDispatch } from "react-redux";

const StatusForm = React.memo((props) => {
  const [text, setText] = useState("");
  const [gifSearch, setGifSearch] = useState("");
  const [gifContainer, setGifContainer] = useState([]);
  const dispatch = useDispatch();
  const [imgUrl, setImgUrl] = useState([]);

  const handleChangeText = (e) => {
    setText(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text && imgUrl.length === 0) {
      return;
    }
    dispatch({
      type: "POST_STATUS",
      payload: {
        id: new Date() / Math.random(),
        name: "Hai Dang",
        avatar: _avatar,
        description: text,
        picture: imgUrl,
        isLike: false,
        likes: 0,
        comments: [],
      },
    });
    setIsModalVisible(false);
    setText("");
    setImgUrl([]);
  };
  const onEmojiClick = (e, emojiObj) => {
    let emoji = emojiObj.emoji;
    setText(text + emoji);
  };

  const handleChangeGifSearch = (e) => {
    setGifSearch(e.target.value);
  };

  const handleOpenGif = (e) => {
    setOpenGif(true);
  };

  useEffect(() => {
    const url = "https://api.giphy.com/v1/gifs/search";
    const api_key = "4xIN38OUTkbfQoiCggnUGm74mo2mhuaN";
    const getRandomGif = async () => {
      const randomGif = await axios.get(url, {
        params: {
          q: gifSearch ? gifSearch : "smile",
          api_key: api_key,
          limit: "30",
        },
      });
      await setGifContainer(
        randomGif.data.data.map((item) => item.images.fixed_height.url)
      );
    };
    getRandomGif();
  });

  const handleCloseGif = (e) => {
    setOpenGif(false);
  };

  var loadImg = function (event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = function () {
        setImgUrl([...imgUrl, reader.result]);
        console.log(reader.result);
      };
    }
    reader.readAsDataURL(event.target.files[0]);
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [openGif, setOpenGif] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <div className="ml-4">
        <Button onClick={showModal} type="dashed" shape="round">
          <div className="flex gap-2 items-center">
            <EditOutlined />
            <span>Create post</span>
          </div>
        </Button>
      </div>
      <Modal
        okText="Post"
        width={1000}
        visible={isModalVisible}
        okButtonProps={{ disabled: text || imgUrl.length !== 0 ? false : true }}
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <div className="flex flex-col py-4 m-4 bg-white">
          <div className="flex justify-between content-center p-2 mx-2">
            {/* avatar */}
            <button className="focus:outline-none">
              <Avatar src={_avatar} />
            </button>

            {/* options of status form */}
            <div className="flex items-center w-full">
              <form
                onSubmit={handleSubmit}
                className="w-full ml-4 mr-0 p-2 focus:outline-none text-2xl"
              >
                <input
                  className="focus:outline-none w-full"
                  value={text}
                  onChange={handleChangeText}
                  type="text"
                  placeholder="How's your today?"
                />
              </form>
              {/* handle emoji */}
              <Popover content={<Picker onEmojiClick={onEmojiClick} />}>
                <Button type="text" icon={<SmileOutlined />} />
              </Popover>

              {/* button to open modal of gif */}
              <Button type="text" onClick={handleOpenGif} icon={<GifIcon />} />

              {/* modal of gif */}
              <Modal
                closable={false}
                footer={
                  <Button onClick={handleCloseGif} type="primary">
                    Close
                  </Button>
                }
                visible={openGif}
              >
                <div className="overflow-scroll">
                  <div className="flex items-center">
                    {/* search gif */}
                    <input
                      autofocus
                      value={gifSearch}
                      onChange={handleChangeGifSearch}
                      className="bg-gray-50 m-2 p-2 w-11/12 rounded-xl shadow-inner focus:outline-none text-xl"
                      type="text"
                      placeholder="Search gif..."
                    />
                    <Button shape="circle" danger onClick={handleCloseGif}>
                      X
                    </Button>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {gifContainer.length !== 0
                      ? gifContainer.map((item, index) => {
                          return (
                            <Image
                              key={index}
                              className="cursor-pointer"
                              src={item}
                              alt=""
                            />
                          );
                        }) : null
                      }
                  </div>
                </div>
              </Modal>

              <button className="rounded-r-3xl pr-6 pl-2 focus:outline-none focus:text-blue-600">
                <label className="cursor-pointer" for="photo">
                  <FileImageOutlined />
                </label>
              </button>
              <form enctype="multipart/form-data">
                <input
                  multiple
                  onChange={(e) => loadImg(e)}
                  style={{ display: "none" }}
                  id="photo"
                  name="photo"
                  type="file"
                />
              </form>
            </div>
          </div>

          <div className="grid grid-cols-2 p-4 gap-2">
            {imgUrl.length !== 0
              ? imgUrl.map((item) => {
                  return <Image src={item} alt="" />;
                })
              : null}
          </div>
        </div>
      </Modal>
    </div>
  );
});

export default StatusForm;
