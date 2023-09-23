const { createSlice } = require("@reduxjs/toolkit");

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    value: [],
  },
  reducers: {
    addToCart: (state, action) => {
      state.value.push({ ...action.payload, count: 1 });
      console.log("clicked");
    },
    removeFromCart: (state, action) => {
      state.value = state.value.filter(
        (product) => !(product.id === action.payload.id),
      );
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
