import axios from "axios";
import { apilist } from "../api/config";

export const loginAction = (data) => async (dispatch) => {
  let params = {
    email: data.email,
    password: data.password
  };

  try {
    const loginResponse = await axios.post(apilist.login,params);
    
    // Dispatch specific data from the response like loginResponse.data if available
    dispatch({
      type: "LOGIN_ACTION",
      payload: loginResponse.data // Adjust payload with specific data from the response
    });
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized access. Please check your credentials.');
      dispatch({
        type: "LOGIN_ERROR",
        payload: "Unauthorized access. Please check your credentials."
      });
    } else {
      console.error('Error occurred during login:', error);
      dispatch({
        type: "LOGIN_ERROR",
        payload: error.message // Pass error message or handle it accordingly
      });
    }
  }
};
