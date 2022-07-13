import axios from 'axios';
import { parseCookies } from 'nookies';

const { 'LocalizaAtivo-token': savedToken } = parseCookies()

const api = axios.create({
  baseURL: 'https://backend-localiza-soft.herokuapp.com/api',
  headers: {
    'Authorization': savedToken ? "" : `Bearer ${savedToken}`
  }
});

export default api;