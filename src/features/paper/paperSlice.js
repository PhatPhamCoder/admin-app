import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import paperService from "./paperService";

export const getPapers = createAsyncThunk(
  "paper/get-papers",
  async (thunkAPI) => {
    try {
      return await paperService.getAllPaper();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const getPaper = createAsyncThunk(
  "paper/get-paper",
  async (id, thunkAPI) => {
    try {
      return await paperService.getAPaper(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const createPaper = createAsyncThunk(
  "paper/create-paper",
  async (paperData, thunkAPI) => {
    try {
      return await paperService.createPaper(paperData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const updatePaper = createAsyncThunk(
  "paper/update-paper",
  async (paper, thunkAPI) => {
    try {
      return await paperService.updatePaper(paper);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const deletePaper = createAsyncThunk(
  "paper/delete-paper",
  async (id, thunkAPI) => {
    try {
      return await paperService.deletePaper(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const resetState = createAction("Reset_all");

const initialState = {
  papers: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const paperSlice = createSlice({
  name: "papers",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPapers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPapers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.papers = action.payload;
      })
      .addCase(getPapers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createPaper.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPaper.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdPaper = action.payload;
      })
      .addCase(createPaper.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getPaper.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPaper.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.paperName = action.payload.title;
      })
      .addCase(getPaper.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updatePaper.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePaper.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedPaper = action.payload;
      })
      .addCase(updatePaper.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deletePaper.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePaper.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedPaper = action.payload;
      })
      .addCase(deletePaper.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default paperSlice.reducer;
