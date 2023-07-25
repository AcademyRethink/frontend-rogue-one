import axios from 'axios';

const api = axios.create({
  baseURL: 'https://farma-view-393823.rj.r.appspot.com',
});

export const validToken = () => {
  const sessionData = localStorage.getItem('session');
  return JSON.parse(sessionData!).token;
};
export default api;
