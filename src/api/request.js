import { default as axios } from 'axios';
export const request = async ({ url, method, params = {}, body = {}, headers = {} }) => {
    const { data } = await axios({
        url,
        method,
        params,
        data: body,
        headers,
    });
    return data;
};
