import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

export const validToken = () => {
  const sessionData = localStorage.getItem('session');
  return JSON.parse(sessionData!).token;
};
export default api;
