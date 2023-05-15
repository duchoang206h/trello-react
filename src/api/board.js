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
        url: API_PATH.BOARDS + id + '/',
        method: 'GET',
        headers,
    });
};
export const editBoardByUser = async (id, name) => {
    return request({
        url: API_PATH.BOARDS + id + '/',
        method: 'PUT',
        headers,
        body: { name, owner: parseInt(localStorage.getItem('userId')) },
    });
};

export const deleteBoardByUser = async (id) => {
    return request({
        url: API_PATH.BOARDS + id + '/',
        method: 'DELETE',
        headers,
    });
};

export const createList = async (title = '?', boardId) => {
    return request({
        url: API_PATH.LIST,
        method: 'POST',
        body: { title, board: boardId },
        headers,
    });
};

export const editList = async ({ title = '?', boardId, id }) => {
    return request({
        url: API_PATH.LIST + id + '/',
        method: 'PUT',
        headers,
        body: { title, board: boardId },
    });
};

export const deleteList = async (id) => {
    return request({
        url: API_PATH.LIST + id + '/',
        method: 'DELETE',
        headers,
    });
};

export const createCard = async ({ title = '?', description = '?', order = '1', listId }) => {
    return request({
        url: API_PATH.CARD,
        method: 'POST',
        body: { title, description, order, list: listId },
        headers,
    });
};

export const editCard = async ({ title = '?', description = '?', order = '1', listId, id }) => {
    return request({
        url: API_PATH.CARD + id + '/',
        method: 'PUT',
        headers,
        body: { title, description, order, list: listId },
    });
};

export const deleteCard = async (id) => {
    return request({
        url: API_PATH.CARD + id + '/',
        method: 'DELETE',
        headers,
    });
};
