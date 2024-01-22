import axios from 'axios';
import { apilist } from '../api/config';

export const newUser = async (users) => {
  try {
    const response = await axios.post(apilist.signup, users);
    const token = response.data.token;
    console.log('Token stored securely:', token);
    return response.data;
  } catch (error) {
    console.log('Error:', error);
    // Handle the error if needed
  }
};
