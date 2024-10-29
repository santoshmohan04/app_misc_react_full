import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth/authSlice'
import productSlice from './products/productSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {user:authSlice.reducer, products:productSlice.reducer}
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']