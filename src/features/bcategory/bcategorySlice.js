import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import bCategoryService from "./bcategoryService";

export const getCategories = createAsyncThunk(
  "blogCategory/get-categories",
  async (thunkAPI) => {
    try {
      return await bCategoryService.getBlogCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const getBlogCat = createAsyncThunk(
  "blogCategory/get-category",
  async (id, thunkAPI) => {
    try {
      return await bCategoryService.getBlogCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const createBlogCategory = createAsyncThunk(
  "blogCategory/create-category",
  async (bCategoryData, thunkAPI) => {
    try {
      return await bCategoryService.createBlogCategory(bCategoryData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const updateBlogCat = createAsyncThunk(
  "blogCategory/update-category",
  async (blogCat, thunkAPI) => {
    try {
      return await bCategoryService.updateBlogCategory(blogCat);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const deleteABlogCat = createAsyncThunk(
  "blogCategory/delete-category",
  async (id, thunkAPI) => {
    try {
      return await bCategoryService.deleteBlogCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const resetState = createAction("Reset_all");

const initialState = {
  bCategories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

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
      })
      .addCase(createBlogCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdBlogCategory = action.payload;
      })
      .addCase(createBlogCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteABlogCat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteABlogCat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedBlogCategory = action.payload;
      })
      .addCase(deleteABlogCat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getBlogCat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogCat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.BlogCatName = action.payload.title;
      })
      .addCase(getBlogCat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateBlogCat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBlogCat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updetedBlogCategory = action.payload;
      })
      .addCase(updateBlogCat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default pCategorySlice.reducer;
