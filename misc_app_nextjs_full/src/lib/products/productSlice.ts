import { cart_orders, prod_list, user_orders } from '@/app/data/product.data';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    productsList: prod_list,
    cartList: cart_orders || null,
    userOrders: user_orders,
    error: null
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setProducts: (state, action) => {
            state.productsList = action.payload;
        },
        setCartList: (state, action) => {
            const newProductKey = action.payload.key; // Unique key for new product
            const newProduct = action.payload.product; // New product details

            state.cartList = {
                ...state.cartList,
                [newProductKey]: newProduct
            };
        },
        setUserOrders: (state, action) => {
            const newProductKey = action.payload.key; 
            const newItems = action.payload.items;
            const order_data = action.payload.orddate;

            state.userOrders = {
                ...state.userOrders,
                [newProductKey]: {
                    "items":newItems,
                    "orddate":order_data
                }
            };
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setLoading, setProducts, setCartList, setUserOrders, setError } = productSlice.actions;
export default productSlice;
