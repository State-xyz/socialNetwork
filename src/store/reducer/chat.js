const INITIAL_STATE = {
    isChatStarted: false,
    receiver: '',
    receiverMessage: [],
    senderMessage: [],
}

const chatRed = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case "GET_RECEIVER_NAME":
        return {
          ...state,
          isChatStarted: true,
          receiver: action.payload,
        };
      default:
        return state;
    }
}

export default chatRed;