import { API_PATH } from '../config/api';
import { request } from './request';

export const getBoardByUser = async () => {
    return request({
        url: API_PATH.BOARDS,
        method: 'GET',
    });
};
export const createBoardByUser = async (name) => {
    return request({
        url: API_PATH.BOARDS,
        method: 'POST',
        body: { name, owner: parseInt(localStorage.getItem('userId')) },
    });
};
export const getBoardById = async (id) => {
    return request({
        url: API_PATH.BOARDS + id + '/',
        method: 'GET',
    });
};
export const editBoardByUser = async (id, name) => {
    return request({
        url: API_PATH.BOARDS + id + '/',
        method: 'PUT',
        body: { name, owner: parseInt(localStorage.getItem('userId')) },
    });
};

export const deleteBoardByUser = async (id) => {
    return request({
        url: API_PATH.BOARDS + id + '/',
        method: 'DELETE',
    });
};

export const createList = async (title = '?', boardId) => {
    return request({
        url: API_PATH.LIST,
        method: 'POST',
        body: { title, board: boardId },
    });
};

export const editList = async ({ title = '?', boardId, id }) => {
    return request({
        url: API_PATH.LIST + id + '/',
        method: 'PUT',
        body: { title, board: boardId },
    });
};

export const deleteList = async (id) => {
    return request({
        url: API_PATH.LIST + id + '/',
        method: 'DELETE',
    });
};

export const createCard = async ({ title = '?', description = '?', order = '1', listId }) => {
    return request({
        url: API_PATH.CARD,
        method: 'POST',
        body: { title, description, order, list: listId },
    });
};

export const editCard = async (card, listId, order = 1) => {
    return request({
        url: API_PATH.CARD + card.id + '/',
        method: 'PUT',
        body: { ...card, order, list: listId },
    });
};

export const deleteCard = async (id) => {
    return request({
        url: API_PATH.CARD + id + '/',
        method: 'DELETE',
    });
};
