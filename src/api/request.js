import { default as axios } from 'axios';

export const request = async ({ url, method, params = {}, body = {} }) => {
    const { data } = await axios({
        url,
        method,
        params,
        data: body,
    });
    return data;
};
