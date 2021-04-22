import axios from 'axios';

const userApi = axios.create({
  baseURL: process.env.USER_API_URL
});

export default userApi;