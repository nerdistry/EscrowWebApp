import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderService from "./orderService";

const intialstate = {
  orders: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const getOrders = createAsyncThunk(
  "orders/allorders",
  async (thunkApi) => {
    try {
      return await orderService.fetchOrders()
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: intialstate,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.orders = [];
        state.message = action.error.message;
      });
  },
});

export default orderSlice.reducer;
