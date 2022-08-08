import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const STATUSES = Object.freeze({
    IDLE: "Idle",
    ERROR: "Error",
    LOADING: "LOADING",
});

const initialState = {
    data: [],
    status: STATUSES.IDLE,
};

const productSlice = createSlice({
    name: "product",
    initialState,
    // reducers: {
    //     // setProducts(state, action) {
    //     //     state.data = action.payload;
    //     // },
    //     // setStatus(state, action) {
    //     //     state.status = action.status;
    //     // },
    // },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = STATUSES.IDLE;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            });
    },
});

export const { setProducts, setStatus } = productSlice.actions;
export default productSlice.reducer;

// Thunk

export const fetchProducts = createAsyncThunk("products/fetch", async() => {
    const { data } = await axios.get("https://fakestoreapi.com/products");
    return data;
});

// export function fetchProducts() {
//     return async function fetchProductThunk(dispatch, getState) {
//         dispatch(setStatus(STATUSES.LOADING));
//         try {
//             const res = await axios.get("https://fakestoreapi.com/products");
//             const data = await res.data;
//             dispatch(setProducts(data));
//             dispatch(setStatus(STATUSES.IDLE));
//         } catch (err) {
//             console.log(err);
//             dispatch(setStatus(STATUSES.ERROR));
//         }
//     };
// }