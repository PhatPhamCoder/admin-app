import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";
import { toast } from "react-toastify";

const getUserfromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
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
        };
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
    try {
      return await authService.updateOrder(data);
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
  user: getUserfromLocalStorage,
  orders: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  data: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "success";
      })
      .addCase(login.rejected, (state, action) => {
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
        if (state.isSuccess) {
          toast.success("Cập nhật thành công");
        }
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
        // state.customer.customers.isBlocked = action.payload.isBlocked;
        const checkIndex = state.customer.customers.findIndex(
          (row) => row?.id === action.payload.id,
        );
        console.log(checkIndex);
        console.log(state.customer.customers[action.payload.id].isBlocked);
        console.log(action.payload.isBlocked);
        if (state.isSuccess) {
          toast.success(action.payload.msg);
        }
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

export default authSlice.reducer;
