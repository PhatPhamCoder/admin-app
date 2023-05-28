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
      return await productService.getProducts();
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
      // console.log("Check product update", product);
      return await productService.updateProduct(productData);
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
        state.products = action.payload;
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
        state.updatedProduct = action.payload;
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
      .addCase(resetState, () => initialState);
  },
});

export const selectProduct = (state) => state?.product;

export default productSlice.reducer;
