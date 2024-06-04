import axios from 'axios';

const instance = axios.create({
  withCredentials: true, // send cookies with requests
  baseURL: process.env.REACT_APP_SERVER_URL, // should make this an environment variable
});

export default instance;