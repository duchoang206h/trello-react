import { API_PATH } from '../config/api';
import { request } from './request';
const headers = {
    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
};
export const getBoardByUser = async () => {
    return request({
        url: API_PATH.BOARDS,
        method: 'GET',
        headers,
    });
};
export const createBoardByUser = async (name) => {
    return request({
        url: API_PATH.BOARDS,
        method: 'POST',
        headers,
        body: { name, owner: parseInt(localStorage.getItem('userId')) },
    });
};
export const getBoardById = async (id) => {
    return request({
        url: API_PATH.BOARDS + id,
        method: 'GET',
        headers,
    });
};
export const createList = async (title, boardId) => {
    console.log({ title, boardId });
    return request({
        url: API_PATH.LIST,
        method: 'POST',
        body: { title, board_id: boardId },
        headers,
    });
};
