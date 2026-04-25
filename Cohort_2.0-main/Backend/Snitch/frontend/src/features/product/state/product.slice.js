import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    sellerProducts: [],
    allProducts: [],
    product: null,
    
  },
  reducers: {
    setSellerProducts: (state, action) => {
      state.sellerProducts = action.payload;
    },
    setAllProducts: (state, action) => {
      state.allProducts = action.payload;
    },
    setProduct: (state, action) => {
      state.product = action.payload;
    },
  },
});

export const { setSellerProducts, setAllProducts, setProduct } = productSlice.actions;
export default productSlice.reducer;
