import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authReducer from "../features/user/userSlice";
import productReducer from "../features/products/productSlice";
import enquiryReducer from "../features/enquiry/enquirySlice";



export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    enquiry: enquiryReducer,
  }
});
