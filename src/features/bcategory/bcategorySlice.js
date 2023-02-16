import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import pBlogService from './bcategoryService';

export const getCategories = createAsyncThunk(
    "blogCategory/get-categories",
    async (thunkAPI) => {
        try {
            return await pBlogService.getBlogCategories()
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
);

const initialState = {
    bCategories: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}

export const pCategorySlice = createSlice({
    name: "bCategories",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.bCategories = action.payload;
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            });
    },
});

export default pCategorySlice.reducer;