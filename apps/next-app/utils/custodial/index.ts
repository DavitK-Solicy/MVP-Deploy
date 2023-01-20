import axios, { AxiosRequestConfig } from 'axios';
import env from 'utils/constants/env';

export const axiosInstance = axios.create({
  baseURL: env.custodialBaseUrl,
});

axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
