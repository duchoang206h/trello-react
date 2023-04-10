import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getBoardByUserId } from '../api/board';
import { useSelector } from 'react-redux';

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
                state.boards = action.payload.boards;
                state.isSuccess = true;
                state.isLoading = false;
            })
            .addCase(getBoards.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
        // update ....
    },
});
export const getBoards = createAsyncThunk('getBoards', async (userId) => {
    return await getBoardByUserId(userId);
});

// Action creators are generated for each case reducer function

export default boardSlice.reducer;
