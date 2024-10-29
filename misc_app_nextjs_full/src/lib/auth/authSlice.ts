import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'user',
    initialState: {
        email: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.email = action.payload;
        },
        clearUser: (state) => {
            state.email = null;
        },
    },
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice;