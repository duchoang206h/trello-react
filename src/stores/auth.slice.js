import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi, registerApi } from '../api/auth';

const initialState = {
    username: localStorage.getItem('username') || '',
    userId: null,
    logged: localStorage.getItem('logged') || false,
    accessToken: localStorage.getItem('accessToken') || '',
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            Object.assign(state, { username: '', accessToken: '', logged: false });
        },
    },
    extraReducers: (builder) => {
        // login
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.accessToken = action.payload.accessToken;
                state.username = action.payload.user?.username;
                state.userId = action.payload.user?.userId;
                state.logged = true;
                state.isSuccess = true;
                state.isLoading = false;
                localStorage.setItem('accessToken', action.payload.access);
                localStorage.setItem('refreshToken', action.payload.refresh);
                localStorage.setItem('username', action.payload.username);
                localStorage.setItem('userId', action.payload.user_id);
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            // register
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.accessToken = action.payload.accessToken;
                state.username = action.payload.user?.username;
                state.logged = true;
                state.isSuccess = true;
                state.isLoading = false;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});
export const login = createAsyncThunk('auth/login', async (data, thunkAPI) => {
    try {
        return await loginApi(data);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});
export const register = createAsyncThunk('auth/register', async (data, thunkAPI) => {
    try {
        return await registerApi(data);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});
// Action creators are generated for each case reducer function

export default authSlice.reducer;
