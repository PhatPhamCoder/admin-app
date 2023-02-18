import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import blogService from './blogService';

export const getBlogs = createAsyncThunk(
    "productCategory/get-categories",
    async (thunkAPI) => {
        try {
            return await blogService.getBlogs()
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
);

export const createBlog = createAsyncThunk(
    "blog/create-blog",
    async (blogData, thunkAPI) => {
        try {
            return await blogService.createBlog(blogData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const resetState = createAction("Reset_all");

const initialState = {
    blogs: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}

export const blogSlice = createSlice({
    name: "blogs",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBlogs.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBlogs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.blogs = action.payload;
            })
            .addCase(getBlogs.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(createBlog.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createBlog.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdBlog = action.payload;
            })
            .addCase(createBlog.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            }).addCase(resetState, () => initialState);
    },
});

export default blogSlice.reducer;