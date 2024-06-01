import axios from 'axios';

const instance = axios.create({
  withCredentials: true, // send cookies with requests
  baseURL: 'http://localhost:4000/', // should make this an environment variable
});

export default instance;