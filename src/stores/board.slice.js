import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createBoardByUser, getBoardByUser } from '../api/board';

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
            });
    },
});
export const getBoards = createAsyncThunk('getBoards', async () => {
    return await getBoardByUser();
});
export const createBoard = createAsyncThunk('createBoard', async (name) => {
    return await createBoardByUser(name);
});
// Action creators are generated for each case reducer function

export default boardSlice.reducer;
