import { configureStore } from "@reduxjs/toolkit";
import cartSlices from "./slices/cartSlices";

const store = configureStore({
    reducer: {
        cart: cartSlices,
    }
});

export default store;	