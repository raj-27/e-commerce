import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const STATUSES = Object.freeze({
    IDLE: "Idle",
    ERROR: "Error",
    LOADING: "LOADING",
});

const initialState = {
    cartItems: [],
};

const cartSlices = createSlice({
    name: "cart",
    initialState,
    reducers: {
        add(state, action) {
            let existingItem = state.cartItems.find(
                (item) => item.id === action.payload.id
            );
            if (!existingItem) {
                state.cartItems.push(action.payload);
            } else {
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.quantity * existingItem.price;
            }
        },
        remove(state, action) {
            state.cartItems = state.cartItems.filter(
                (item) => item.id !== action.payload
            );
        },
        increment(state, action) {
            let currentItem = state.cartItems.find(
                (item) => item.id === action.payload
            );
            currentItem.quantity++;
            currentItem.totalPrice = currentItem.quantity * currentItem.price;
        },
        decrement(state, action) {
            let currentItem = state.cartItems.find(
                (item) => item.id === action.payload
            );
            currentItem.quantity--;
            currentItem.totalPrice = currentItem.quantity * currentItem.price;
            if (currentItem.quantity === 0) {
                state.cartItems = state.cartItems.filter(
                    (item) => item.id !== action.payload
                );
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.cartItems = action.payload;
                state.status = STATUSES.IDLE;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            });
    },
});

export const { add, remove, increment, decrement } = cartSlices.actions;
export default cartSlices.reducer;

export const fetchCart = createAsyncThunk("carts/fetch", async() => {
    const { data } = await axios.get("http://localhost:5000/");
    return data;
});