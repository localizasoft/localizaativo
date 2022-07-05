import axios from 'axios';
import { parseCookies } from 'nookies';

const { 'LocalizaAtivo-token': savedToken } = parseCookies()

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Authorization': savedToken ? "" : `Bearer ${savedToken}`
  }
});

export default api;