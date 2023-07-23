import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../models";
import { Axios } from "../../services/http-service";

const initialState: RootState = {
  products: [],
  isLoading: false,
};

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await Axios.get("/products", { withCredentials: true });
  return response.data;
});
export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state: RootState, action: PayloadAction<any>) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state: RootState, action: PayloadAction<any>) => {
      state.products = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchProducts.rejected, (state: RootState, action: PayloadAction<any>) => {
      state.products = [];
      state.isLoading = false;
    });
  },
});

// export const {} = productsSlice.actions;
export const selectCount = (state: RootState) => state.products;
export default productsSlice.reducer;
