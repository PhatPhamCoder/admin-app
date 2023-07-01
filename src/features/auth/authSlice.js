import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";
import { toast } from "react-toastify";

const getUserfromLocalStorage = localStorage.getItem("admin")
  ? JSON.parse(localStorage.getItem("admin"))
  : null;

export const loginAdmin = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const response = await authService.login(userData);
      if (response.data) {
        localStorage.setItem("admin", JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const statusUser = createAsyncThunk(
  "auth/status",
  async (dataUpdate, thunkAPI) => {
    const id = dataUpdate?._id;
    const isBlocked = dataUpdate?.isBlocked;
    try {
      const data = {
        isBlocked: isBlocked,
      };
      const response = await authService.statusUser(id, data);
      if (response) {
        const results = {
          id: id,
          isBlocked: isBlocked,
          msg: response.message,
        };
        toast.success(response.message);
        return results;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const getMonthlyData = createAsyncThunk(
  "orders/monthlydata",
  async (thunkAPI) => {
    try {
      return await authService.getMonthlyOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const getYearlyData = createAsyncThunk(
  "orders/yearlydata",
  async (thunkAPI) => {
    try {
      return await authService.getYearlyStatis();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const getOrders = createAsyncThunk(
  "order/get-orders",
  async (thunkAPI) => {
    try {
      return await authService.getOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const updateOrders = createAsyncThunk(
  "order/update-orders",
  async (data, thunkAPI) => {
    const id = data?.id;
    const status = data?.status;
    try {
      const data = {
        status: status,
      };
      const response = await authService.updateOrder(id, data);
      if (response) {
        const results = {
          id: id,
          status: status,
          msg: response.msg,
        };
        toast.success(response.msg);
        return results;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const getSingleOrder = createAsyncThunk(
  "order/get-single-order",
  async (id, thunkAPI) => {
    try {
      return await authService.getOrder(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const initialState = {
  user: "",
  orders: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  data: [],
  userAuth: getUserfromLocalStorage,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.userAuth = action.payload;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = action.payload;
        state.message = "success";
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(getSingleOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleOrder.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.singleOrder = action.payload;
        state.message = "success";
      })
      .addCase(getSingleOrder.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(getMonthlyData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMonthlyData.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.monthlyData = action.payload;
        state.message = "success";
      })
      .addCase(getMonthlyData.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(getYearlyData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getYearlyData.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.yearlyData = action.payload;
        state.message = "success";
      })
      .addCase(getYearlyData.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(updateOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOrders.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.updatedOrder = action.payload;
      })
      .addCase(updateOrders.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
        if (state.isError) {
          toast.success("Cập nhật bị lỗi");
        }
      })
      .addCase(statusUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(statusUser.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(statusUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError) {
          toast.success(action.error);
        }
      });
  },
});
export const selectAuth = (state) => state?.auth;

export default authSlice.reducer;
