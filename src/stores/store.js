import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth.slice';
import boardReducer from './board.slice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        board: boardReducer,
    },
});
