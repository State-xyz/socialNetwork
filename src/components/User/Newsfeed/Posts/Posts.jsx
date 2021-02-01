import React from "react";

import Post from './Post/Post';

import { useSelector, useDispatch } from "react-redux";


const Posts = React.memo(props => {
    const dispatch = useDispatch();

  const postContent = useSelector((state) => state.statusForm.posts);
  const handleLike = (id) => {
    dispatch({
      type: "HANDLE_LIKE",
      id,
    });
  };
    return (
      <div className="">
        {
          postContent ? postContent.map((item, index) => {
            return (
              <Post
                key={index}
                name={item.name}
                likes={item.likes}
                isLike={item.isLike}
                comments={item.comments}
                description={item.description}
                picture={item.picture}
                handleLike={() => handleLike(item.id)}
                id={item.id}
              />
            );
          }) : (<div className="flex flex-col items-center text-gray-400">
              <span className="text-lg">No posts yet</span>
              <span>Just share your feelings with me!</span>
          </div>)
        }
      </div>
    );
})

export default Posts;