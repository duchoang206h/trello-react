import { API_PATH } from '../config/api';
import { request } from './request';

export const loginApi = async ({ username, password }) => {
    return request({
        method: 'post',
        url: API_PATH.LOGIN,
        body: { username, password },
    });
};
export const registerApi = async ({ email, username, password }) => {
    return request({
        method: 'post',
        url: API_PATH.REGISTER,
        body: { email, username, password },
    });
};
