import axios, { AxiosRequestConfig } from 'axios';
import env from '../constants/env';

export const axiosInstance = axios.create({
  baseURL: env.apiBaseUrl,
});

axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
