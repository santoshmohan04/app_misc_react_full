'use client';

import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/authSlice';
import productSlice from './products/productSlice';
import CryptoJS from 'crypto-js';

const SECRET_KEY = '10585911-321b-4394-8af3-185f25e0c407';

const encryptData = (data:any) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

const decryptData = (data:any) => {
  try {
    const bytes = CryptoJS.AES.decrypt(data, SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (e) {
    console.error("Failed to decrypt state:", e);
    return null;
  }
};

const saveStateMiddleware = (store) => (next) => (action) => {
  const result = next(action); // Process the action first
  const state = store.getState();
  const encryptedState = encryptData(state);
  localStorage.setItem('reduxState', encryptedState);
  return result;
};

const loadInitialState = () => {
  const encryptedState = localStorage.getItem('reduxState');
  if (encryptedState) {
    const decryptedState = decryptData(encryptedState);
    if (decryptedState) return decryptedState;
  }
  return undefined; // Return undefined if no saved state
};

export const makeStore = () => {
  return configureStore({
    reducer: { user: authSlice.reducer, products: productSlice.reducer },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(saveStateMiddleware),
    preloadedState: loadInitialState()
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
