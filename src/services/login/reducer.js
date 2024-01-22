const initialState = {
    loginData: {},
    loginError: {}
  };
  
  export default function loginReducer(state = initialState, action) {
    switch (action.type) {
      case "LOGIN_ACTION":
        return {
          ...state,
          loginData: action.payload
        };
      case "LOGIN_ERROR":
        return {
          ...state,
          loginError: action.payload
        };
      default:
        return state;
    }
  }
  