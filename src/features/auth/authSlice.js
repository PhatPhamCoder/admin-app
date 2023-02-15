import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from './authService';

const userDefaultState = {
    _id: null,
    firsname: null,
    lastname: null,
    email: null,
    mobile: null,
    token: null,
};

const initialState = {
    user: userDefaultState,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

export const login = createAsyncThunk(
    "auth/admin-login",
    async (user, thunkAPI) => {
        try {
            return await authService.login(user);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    });

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state, action) => {
                state.isLoading = true;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.user = null;
            })
    },
});

export default authSlice.reducer;