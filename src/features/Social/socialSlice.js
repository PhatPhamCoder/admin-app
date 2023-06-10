import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import socialService from "./socialService";

const moduleName = "social";

export const getAllSocial = createAsyncThunk(
  `${moduleName}/getAll`,
  async (thunkAPI) => {
    try {
      // console.log(data);
      const response = await socialService.getAllSocial();
      if (response?.data?.result) {
        const results = {
          data: response?.data?.data,
        };
        return results;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const updateSocial = createAsyncThunk(
  `${moduleName}/update`,
  async (dataUpdate, thunkAPI) => {
    try {
      const response = await socialService.updateSocial(dataUpdate);
      if (response) {
        const results = {
          msg: response.msg,
          dataUpdate: response.updatedProduct,
        };
        return results;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const resetState = createAction("Reset_all");

const initialState = {
  social: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  data: [],
};

export const socialSlice = createSlice({
  name: "social",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSocial.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllSocial.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.data = action.payload.data;
      })
      .addCase(getAllSocial.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateSocial.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSocial.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.data = action.payload.dataUpdate;
        if (state.isSuccess) {
          toast.success("Cập nhật thành công");
        }
      })
      .addCase(updateSocial.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export const selectSocial = (state) => state?.social;

export default socialSlice.reducer;
