import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from "@/lib/firebase";
import { ref, onValue, update, push, set, off, get } from "firebase/database";
import { Prodinfo } from '@/app/data/product.data';

// Async actions
export const fetchCartData = createAsyncThunk(
  'cart/fetchCartData',
  async (_, { rejectWithValue }) => {
    try {
      const cartCollectionRef = ref(db, "cartitems");

      // Initialize a promise to handle the data retrieval with `onValue`
      const data = await new Promise((resolve, reject) => {
        const unsubscribe = onValue(
          cartCollectionRef,
          (snapshot) => {
            const data = snapshot.val();
            if (data) {
              resolve(data);
            } else {
              reject(new Error('No cart data available.'));
            }
          },
          (error) => reject(new Error(error.message))
        );

        // Cleanup function to remove the listener after data retrieval
        return () => off(cartCollectionRef, "value", unsubscribe);
      });

      return data; // Return the retrieved data
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue('An unknown error occurred.');
      }
    }
  }
);

export const updateTotal = createAsyncThunk(
  'cart/updateTotal',
  async ({ itemId, qty }: { itemId: string, qty: number }, { getState, rejectWithValue }) => {
    const state: any = getState();
    const cartValues = state.products.cartList;
    const cartCollectionRef = ref(db, "cartitems");

    const updatedCart = {
      ...cartValues,
      [itemId]: {
        ...cartValues[itemId],
        qty,
        totalamt: (Number(cartValues[itemId].price) * qty).toFixed(2)
      },
    };

    try {
      await update(cartCollectionRef, updatedCart);
      return updatedCart;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue('An unknown error occurred.');
      }
    }
  }
);

export const rmCart = createAsyncThunk(
  'cart/rmCart',
  async (itemId: string, { getState, rejectWithValue }) => {
    const state: any = getState();
    const cartValues = state.products.cartList;
    const cartCollectionRef = ref(db, "cartitems");

    const updatedCart = { ...cartValues };
    delete updatedCart[itemId];

    try {
      await set(cartCollectionRef, updatedCart);
      return updatedCart;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue('An unknown error occurred.');
      }
    }
  }
);

export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (_, { rejectWithValue }) => {
    const cartCollectionRef = ref(db, "cartitems");

    try {
      await set(cartCollectionRef, {});
      return {};
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue('An unknown error occurred.');
      }
    }
  }
);

export const confirmOrder = createAsyncThunk(
  'cart/confirmOrder',
  async (_, { getState, rejectWithValue }) => {
    const state: any = getState();
    const cartValues = state.products.cartList;
    const ordersCollectionRef = ref(db, "userords");
    const today = new Date();

    const newOrderRef = push(ordersCollectionRef);
    const newOrder = {
      items: Object.values(cartValues),
      orddate: formatDate(today),
    };

    try {
      await set(newOrderRef, newOrder);
      await set(ref(db, "cartitems"), {}); // Clear the cart after order is confirmed
      return newOrder;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue('An unknown error occurred.');
      }
    }
  }
);

// Async action to add a product to the cart
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (product: Prodinfo, { rejectWithValue }) => {
    const cartRef = ref(db, 'cartitems');

    try {
      // Fetch the current cart data
      const snapshot = await get(cartRef);
      const cartData = snapshot.val() || {}; // Empty object if no data

      // Find the product in the cart (if it exists)
      const existingProductKey = Object.keys(cartData).find(key => cartData[key].id === product.id);

      if (existingProductKey) {
        // If product exists, update its quantity and total amount
        const existingProduct = cartData[existingProductKey];

        const updatedProduct = {
          ...existingProduct,
          qty: existingProduct.qty + 1,
          totalamt: (parseFloat(existingProduct.totalamt) + parseFloat(product.price?.toString() ?? '0')).toFixed(2),
        };

        // Update the cart item with new quantity and total amount
        await update(ref(db, `cartitems/${existingProductKey}`), updatedProduct);
      } else {
        // If product does not exist, add a new item to the cart
        const newProductRef = push(cartRef);
        await set(newProductRef, {
          ...product,
          qty: 1,
          totalamt: parseFloat(product.price?.toString() ?? '0').toFixed(2),
        });
      }

      return product; // Return product data or relevant success data
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue('An unknown error occurred.');
      }
    }
  }
);

const formatDate = (date: Date): string =>
  date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

const initialState = {
  isLoading: false,
  productsList: {
    "cameras": [],
    "products": [],
    "shirts": [],
    "smartphones": [],
    "watches": []
  },
  cartList: {},
  userOrders: {},
  error: null as string | null
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
    setUserOrders: (state, action) => {
      state.userOrders = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCartData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartList = action.payload;
      })
      .addCase(fetchCartData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateTotal.pending, (state) => {
        state.error = null;
      })
      .addCase(updateTotal.fulfilled, (state, action) => {
        state.cartList = action.payload;
      })
      .addCase(updateTotal.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(rmCart.pending, (state) => {
        state.error = null;
      })
      .addCase(rmCart.fulfilled, (state, action) => {
        state.cartList = action.payload;
      })
      .addCase(rmCart.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(clearCart.pending, (state) => {
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.cartList = {};
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(confirmOrder.pending, (state) => {
        state.error = null;
      })
      .addCase(confirmOrder.fulfilled, (state, action) => {
        state.cartList = {};
        state.userOrders = {
          ...state.userOrders,
          [action.payload.orddate]: action.payload.items,
        };
      })
      .addCase(confirmOrder.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        // Add the product to the cartItems array or update existing ones
        state.cartList = { ...action.payload };
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export const { setLoading, setProducts, setUserOrders, setError } = productSlice.actions;
export default productSlice;
