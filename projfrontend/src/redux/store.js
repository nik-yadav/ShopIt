import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./reducers/counterSlice";
import cartReducer from "./reducers/cartSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartReducer,
  },
});
