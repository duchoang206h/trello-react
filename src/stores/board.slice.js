import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    createBoardByUser,
    deleteBoardByUser,
    editBoardByUser,
    getBoardByUser,
} from '../api/board';

const initialState = {
    boards: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
};

export const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // login
        builder
            .addCase(getBoards.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBoards.fulfilled, (state, action) => {
                state.boards = action.payload;
                state.isSuccess = true;
                state.isLoading = false;
            })
            .addCase(getBoards.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            // create ....
            .addCase(createBoard.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createBoard.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.boards = [...state.boards, action.payload];
                state.isLoading = false;
            })
            .addCase(createBoard.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = 'create board fail';
            })
            // update ....
            .addCase(updateBoard.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateBoard.fulfilled, (state, action) => {
                console.log(action);
                state.isSuccess = true;
                state.boards = state.boards.map((board) =>
                    board.id === action.payload.id ? action.payload : board
                );
                state.isLoading = false;
            })
            .addCase(updateBoard.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = 'update board fail';
            })
            // delete
            .addCase(deleteBoard.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteBoard.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.boards = state.boards.filter((board) => board.id !== action.meta.arg);
                state.isLoading = false;
            })
            .addCase(deleteBoard.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = 'delete board fail';
            });
    },
});
export const getBoards = createAsyncThunk('getBoards', async () => {
    return await getBoardByUser();
});
export const createBoard = createAsyncThunk('createBoard', async (name) => {
    return await createBoardByUser(name);
});
export const updateBoard = createAsyncThunk('updateBoard', async ([id, name]) => {
    return await editBoardByUser(id, name);
});
export const deleteBoard = createAsyncThunk('deleteBoard', async (id) => {
    return await deleteBoardByUser(id);
});
// Action creators are generated for each case reducer function

export default boardSlice.reducer;
