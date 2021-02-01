const INITIAL_STATE = {
  posts: [
    {
      id: new Date() / Math.random(),
      name: "River Sutherland",
      avatar:
        "https://images.generated.photos/eQZv39suCtpaVsql9cHM_yTexyaihuXgPYMZk5xOpbg/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yy/XzA5MzEzOTIuanBn.jpg",
      description: "",
      picture: [
        "https://static.toiimg.com/thumb/msid-80008080,width-800,height-600,resizemode-75,imgsize-86983,pt-32,y_pad-40/80008080.jpg",
      ],
      isLike: false,
      likes: 0,
      comments: [],
    },
    {
      id: new Date() / Math.random(),
      name: "Jaren Hammer",
      avatar:
        "https://images.pexels.com/photos/247917/pexels-photo-247917.jpeg?crop=faces&fit=crop&h=200&w=200&amp;auto=compress&amp;cs=tinysrgb",
      description: "",
      picture: [
        "https://i.pinimg.com/736x/50/f0/2c/50f02c0f8606f78ddecdb050a6e4b95f.jpg",
      ],
      isLike: false,
      likes: 0,
      comments: [],
    },
    {
      id: new Date() / Math.random(),
      name: "Sara Koivisto",
      avatar: "https://uifaces.co/our-content/donated/Te-0H20q.png",
      description: "",
      picture: [
        "https://static.thehoneycombers.com/wp-content/uploads/sites/4/2020/03/Best-funny-Coronavirus-memes-2020-Honeycombers-Bali-221.jpg",
      ],
      isLike: false,
      likes: 0,
      comments: [],
    },
  ],
};

const statusFormRed = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case "POST_STATUS":
        return {
          ...state,
          posts: [ action.payload, ...state.posts]
        };
      case "HANDLE_LIKE":
        return {
          ...state,
          posts: state.posts.slice().map((item) => {
            return item.id === action.id ? !item.isLike ? {
                  ...item,
                  isLike: !item.isLike,
                  likes: item.likes + 1,
                }
              : {
                  ...item,
                  isLike: !item.isLike,
                  likes: item.likes - 1,
                }
              : item
          }),
        };
      case "HANDLE_COMMENT":
        return {
          ...state,
          posts: state.posts.slice().map((item) => {
            return item.id === action.payload.id
              ? {
                  ...item,
                  comments: action.payload.comments,
                }
              : item;
          }),
        };
      // console.log(action.payload.id)
      // return state;
      default:
        return state;
    }
}

export default statusFormRed;