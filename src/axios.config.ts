import axios from 'axios';


const sessionData = localStorage.getItem('session');
const token = sessionData ? JSON.parse(sessionData).token : '';
/* const cnpj = sessionData ? JSON.parse(sessionData).cnpj : ''; */


axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;


axios.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = `Bearer ${token}`;
/*     config.headers['CNPJ'] = cnpj; */
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      //enviar usuário para o login
    }
    return Promise.reject(error);
  }
);

export default axios;
