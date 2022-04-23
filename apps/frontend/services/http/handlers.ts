import { AxiosResponse, AxiosError } from 'axios';

// TODO: how to return data directly via interceptor and not fuckup Promise/AxiosResponse type?
export const resHandler = <T>(response: AxiosResponse<T>) => response;

export const resErrorHandler = (error: AxiosError) => {
  if (error.response?.data?.message) {
    console.error('Backend response:', error.response.data);
  }
  throw error;
};
