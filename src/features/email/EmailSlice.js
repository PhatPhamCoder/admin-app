import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import emailService from "./EmailService";

const moduleName = "email";

export const getEmail = createAsyncThunk(
  `${moduleName}/getALl`,
  async (thunkAPI) => {
    try {
      return await emailService.getEmail();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const initialState = {
  email: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const emailSlice = createSlice({
  name: "email",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getEmail = action.payload;
      })
      .addCase(getEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});

export default emailSlice.reducer;
