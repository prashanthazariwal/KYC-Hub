import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  compareProducts: [],
};

const compareSlice = createSlice({
  name: "compare",
  initialState,
  reducers: {
    addToCompare: (state, action) => {
      // Check if product already exists and max limit not reached
      if (
        state.compareProducts.length < 4 &&
        !state.compareProducts.find(
          (product) => product.id === action.payload.id
        )
      ) {
        state.compareProducts.push(action.payload);
      }
    },
    removeFromCompare: (state, action) => {
      state.compareProducts = state.compareProducts.filter(
        (product) => product.id !== action.payload
      );
    },
    clearCompare: (state) => {
      state.compareProducts = [];
    },
  },
});

export const { addToCompare, removeFromCompare, clearCompare } =
  compareSlice.actions;
export default compareSlice.reducer;
