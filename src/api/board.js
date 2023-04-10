import { API_PATH } from '../config/api';
import { request } from './request';
export const getBoardByUserId = async (userId) => {
    /* return request({
        url: API_PATH.GET_BOARDS(userId),
        method: 'GET',
    }); */
    return new Promise((resole, reject) => {
        setTimeout(
            () =>
                resole({
                    boards: [
                        {
                            key: 1,
                            title: '1',
                        },
                        {
                            key: 2,
                            title: '2',
                        },
                        {
                            key: 3,
                            title: '3',
                        },
                        {
                            key: 4,
                            title: '4',
                        },
                    ],
                }),
            100
        );
    });
};
