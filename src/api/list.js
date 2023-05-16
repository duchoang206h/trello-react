import { API_PATH } from '../config/api';
import { request } from './request';
const headers = {
    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
};
export const addList = async (name, boardId) => {
    return request({
        url: API_PATH.BOARDS,
        method: 'POST',
        headers,
        body: { name, board_id: boardId },
    });
};
