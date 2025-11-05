import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts, createProduct, deleteProduct, updateProduct } from "../api/productApi";
import type { Product } from "../types";

const initialState = {
  list: [] as Product[],
  loading: false,
  error: null as string | null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.list = state.list.filter((p) => p.id !== action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const i = state.list.findIndex((p) => p.id === action.payload.id);
        if (i !== -1) state.list[i] = action.payload;
      });
  },
});

export default productSlice.reducer;
