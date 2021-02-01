const INITIAL_STATE = {
    uid: '',
    name: '',
    email: '',
    password: '',
    isSignedUp: false,
    isSignedInWithProvider: false,
    isLoggedIn: false,
    error: null
}

const auth_user = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case "SIGN_UP":
        return {
          ...state,
          ...action.payload,
          isSignedUp: true,
        };
      case "SIGN_IN_WITH_PROVIDER":
        return {
          ...state,
          ...action.payload,
          isSignedInWithProvider: true,
          isLoggedIn: true
        };
      case "LOGIN_SUCCESS":
        return {
          ...state,
          ...action.payload,
          isLoggedIn: true,
        };
      case "LOGIN_FAILURE":
        return {
          ...state,
          error: action.payload.error,
        };
      case "LOGOUT_SUCCESS":
        return {
          ...state,
          isLoggedIn: false,
          isSignedInWithProvider: false,
        };
      case "LOGOUT_FAILURE":
        return {
          ...state,
          error: action.payload.error,
        };
      default:
        return state;
    }
}

export default auth_user;

