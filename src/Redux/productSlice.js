import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "./api";
const initialState = {
    products: null,
    loading: null,
    error: false,
}


export const allProducts = createAsyncThunk("products/get", async (adminToken) => {
    let { data } = await axios.get(`${baseUrl}/Products`, {
        headers: {
            authorization: `Bearer ${adminToken}`,
        }
    });
    return data;
});

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        updateProduct: (state, action) => void (
            (state.products[state.products.findIndex((item) => item._id === action.payload._id)] = action.payload)
        ),
        deleteProduct: (state, action) => void (
            state.products = state.products.filter((Product) => Product._id !== action.payload)
        )
    },
    extraReducers: {
        [allProducts.pending]: (state, action) => {
            state.loading = true;
        },
        [allProducts.fulfilled]: (state, action) => {
            state.loading = false;
            state.products = action.payload
            state.error = null

        },
        [allProducts.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
            state.products = null;
        }
    }
})

export const { updateProduct, deleteProduct } = productSlice.actions;

export default productSlice.reducer;