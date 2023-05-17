import { default as axios } from 'axios';
const axiosInstance = axios.create()
axiosInstance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('accessToken');
    config.headers.Authorization = 'Bearer '+ token ;
    return config;
  });
export const request = async ({ url, method, params = {}, body = {}, headers = {} }) => {
    const { data } = await axiosInstance({
        url,
        method,
        params,
        data: body,
        headers,
    });
    return data;
};
export const setDefaultHeader = (headers) => axios.defaults.headers = headers