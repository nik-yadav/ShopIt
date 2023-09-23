const { createSlice } = require("@reduxjs/toolkit");

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    value: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const index = state.value.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (index !== -1) {
        state.value[index].count += 1;
        return;
      }
      state.value.push({ ...action.payload, count: 1 });
      console.log("clicked");
    },
    removeFromCart: (state, action) => {
      state.value = state.value.filter(
        (product) => !(product.id === action.payload),
      );
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
