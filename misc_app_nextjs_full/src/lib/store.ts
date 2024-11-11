'use client';

import { configureStore } from '@reduxjs/toolkit';
import productSlice from './products/productSlice';
import authSlice from './auth/authSlice';

export const makeStore = () => {
  return configureStore({
    reducer: { auth: authSlice.reducer, products: productSlice.reducer },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
