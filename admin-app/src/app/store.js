import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import customerReducer from '../features/customers/customerSlice';
import productReducer from '../features/product/productSlice';
import brandReducer from '../features/brand/brandSlice';
import productCategoryReducer from '../features/productCategory/productCategorySlice';
import colorReducer from '../features/color/colorSlice';
import enquiryReducer from '../features/enquiries/enquireSlice';
import orderReducer from '../features/orders/orderSlice';
import uploadReducer from '../features/upload/uploadSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: customerReducer,
    product: productReducer,
    brand: brandReducer,
    productCategory: productCategoryReducer,
    color: colorReducer,
    enquiry: enquiryReducer,
    order: orderReducer,
    upload: uploadReducer,
  },
});