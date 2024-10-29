import { cart_orders, prod_list, user_orders } from '@/app/data/product.data';
import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
    name: 'product',
    initialState: {
        isloading:false,
        productslist:prod_list,
  cartList: cart_orders,
  userorders: user_orders,
  error: null
    },
    reducers: {
        setLoading: (state, action) => {
            state.isloading = action.payload;
        },
        setProducts: (state, action) => {
            state.productslist = action.payload;
        },
        setCartlist: (state, action) => {
            state.cartList = action.payload;
        },
        setUserOrders: (state, action) => {
            state.userorders = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setLoading, setProducts, setCartlist, setUserOrders, setError } = productSlice.actions;

export default productSlice;