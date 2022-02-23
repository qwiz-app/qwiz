import axios from 'axios';
import { resHandler, resErrorHandler } from './handlers';

const http = axios.create({
  timeout: 5000,
});

http.interceptors.response.use(resHandler, resErrorHandler);

export default http;
