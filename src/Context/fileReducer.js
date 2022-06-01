// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch (action.type) {
      case "LOGIN":
        return {
          ...state,
          isLogin: true,
        };
      case "LOGOUT":
        return {
          ...state,
          isLogin: false,
        };
      case "SET_USER_DATA":
        return {
          ...state,
          userData: action.payload,
        };
      default:
        return state;
    }
  };
  