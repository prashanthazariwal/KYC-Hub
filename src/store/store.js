import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../store/slices/productSlice";
import compareReducer from "../store/slices/compareSlice";
const store = configureStore({
  reducer: {
    products: productsReducer,
    compare: compareReducer,
  },
});

export default store;
