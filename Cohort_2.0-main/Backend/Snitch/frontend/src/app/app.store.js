import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/auth.slice";
import productReducer from "../features/product/state/product.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
  },
});
