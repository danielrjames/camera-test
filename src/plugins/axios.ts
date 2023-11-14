import { APPLICATION_ERROR } from './../utils/error';
import { useAppStore } from '../store/app';
import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
} from 'axios';
import type { App } from 'vue';

let instance: AxiosInstance;

export const createAxios = () => {
  instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL ?? '/',
  });

  instance.interceptors.request.use(
    function (config: AxiosRequestConfig) {
      if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.log(`Making request to: ${config.url}`);
      }

      return config;
    },
    function (error: AxiosError) {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data

      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error

      return Promise.reject(error);
    }
  );

  const axiosInstance = {
    install(app: App) {
      app.config.globalProperties.$axios = instance;
      app.provide('$axios', instance);
    },
  };

  return axiosInstance;
};

export const useAxios = () => {
  const appStore = useAppStore();

  const { setLoading } = appStore;

  const setToken = (token: string) => {
    if (token) {
      instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  };

  const removeToken = () => {
    delete instance.defaults.headers.common['Authorization'];
  };

  const $get = async (url: string, config?: AxiosRequestConfig) => {
    try {
      setLoading(true);

      const response = await instance.get(url, config);

      return response.data;
    } catch (err) {
      return handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const $post = async (
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ) => {
    try {
      setLoading(true);

      const response = await instance.post(url, data, config);

      return response.data;
    } catch (err) {
      return handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleError = (err: any) => {
    let message = APPLICATION_ERROR;

    if (err instanceof AxiosError) {
      message = err.message;
    }

    throw new Error(message);
  };

  return { removeToken, setToken, $get, $post };
};

export default useAxios;
