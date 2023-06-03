import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productService from "./productService";
import { toast } from "react-toastify";

export const createProducts = createAsyncThunk(
  "product/create",
  async (data, thunkAPI) => {
    try {
      // console.log(data);
      return await productService.createProduct(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const getProducts = createAsyncThunk(
  "product/getAll",
  async (thunkAPI) => {
    try {
      const response = await productService.getProducts();
      // console.log(response);
      if (response.data.result) {
        const data = response.data.product;
        const results = {
          data: data,
          msg: response.data.msg,
        };

        return results;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const updateStatus = createAsyncThunk(
  "product/updateStatus",
  async (dataStatus, thunkAPI) => {
    // console.log(dataStatus);
    const id = dataStatus?.id;
    const status = dataStatus?.active;
    try {
      const data = {
        status: status,
      };
      const response = await productService.updateStatus(id, data);
      if (response.result) {
        const results = {
          id: id,
          status: status,
          msg: response.msg,
        };
        toast.success(response.msg);
        return results;
      }
      // if()
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const updateFlashSale = createAsyncThunk(
  "product/updateFlashSale",
  async (dataFlashSale, thunkAPI) => {
    // console.log(dataStatus);
    const id = dataFlashSale?.id;
    const flashSale = dataFlashSale?.active;
    try {
      const data = {
        flashSale: flashSale,
      };
      const response = await productService.updateFlashSale(id, data);
      if (response.result) {
        const results = {
          id: id,
          flashSale: flashSale,
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

export const updateDisplayHome = createAsyncThunk(
  "product/displayHome",
  async (dataDisplayHome, thunkAPI) => {
    // console.log(dataStatus);
    const id = dataDisplayHome?.id;
    const home = dataDisplayHome?.active;
    try {
      const data = {
        home: home,
      };
      const response = await productService.displayHome(id, data);
      if (response.result) {
        const results = {
          id: id,
          home: home,
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

export const getProduct = createAsyncThunk(
  "product/get",
  async (slug, thunkAPI) => {
    try {
      return await productService.getProduct(slug);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const updateProduct = createAsyncThunk(
  "product/update",
  async (productData, thunkAPI) => {
    try {
      // console.log("Check product update", productData);
      const response = await productService.updateProduct(productData);
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

export const deleteAProduct = createAsyncThunk(
  "product/delete",
  async (slug, thunkAPI) => {
    try {
      return await productService.deleteProduct(slug);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const resetState = createAction("Reset_all");

const initialState = {
  product: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  data: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdProduct = action.payload;
        if (state.isSuccess) {
          toast.success(action.payload);
        }
      })
      .addCase(createProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.data = action?.payload?.data;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.productId = action.payload._id;
        state.productName = action.payload.title;
        state.productDesc = action.payload.description;
        state.productCategory = action.payload.category;
        state.productPrice = action.payload.price;
        state.productDiscount = action.payload.discount;
        state.productQuantity = action.payload.quantity;
        state.productCodeProduct = action.payload.codeProduct;
        state.productBrand = action.payload.brand;
        state.productTags = action.payload.tags;
        state.productCode = action.payload.codeProduct;
        state.productSlug = action.payload.slug;
        state.productPage = action.payload.pageNumber;
        state.productSize = action.payload.paperSize;
        state.productKindOfPaper = action.payload.kindOfPaper;
        state.dateSale = action.payload.dateSale;
        state.status = action.payload.status;
        state.images = action.payload.images;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.data = action.payload.dataUpdate;
        if (state.isSuccess) {
          toast.success("Cập nhật thành công");
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteAProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedProduct = action.payload;
      })
      .addCase(deleteAProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(updateStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateFlashSale.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateFlashSale.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(updateFlashSale.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateDisplayHome.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateDisplayHome.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(updateDisplayHome.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export const selectProduct = (state) => state?.product;

export default productSlice.reducer;
