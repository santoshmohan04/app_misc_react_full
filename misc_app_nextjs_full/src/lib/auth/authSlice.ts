import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { LoginPayload, ErrorResponse, AuthState } from './data';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updatePassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../firebase';

// Error handling helper
const handleError = (error: any): string => {
  console.error('Error:', error, typeof error);
  let errorMessage = 'An unknown error occurred!';
  const errorCode = error.error?.message;

  switch (errorCode) {
    case 'EMAIL_EXISTS':
      errorMessage = 'This email already exists.';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'This email does not exist.';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'This password is not correct.';
      break;
    default:
      errorMessage = 'An unexpected error occurred.';
      break;
  }

  return errorMessage;
};

// Async actions
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, payload.email, payload.pswd);
        localStorage.setItem('authdata', JSON.stringify(userCredential.user));
      const { uid, email, displayName } = userCredential.user;
      if (payload.remeberMe && email) {
        localStorage.setItem('displayemail', email);
    } else {
      localStorage.removeItem('displayemail');
    }
      return { uid, email, displayName };
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, payload.email, payload.pswd);
      localStorage.setItem('authdata', JSON.stringify(userCredential.user));
      const { uid, email, displayName } = userCredential.user;
      if (payload.remeberMe && email) {
          localStorage.setItem('displayemail', email);
      } else {
        localStorage.removeItem('displayemail');
      }
      return { uid, email, displayName };
    } catch (error) {
      return rejectWithValue(handleError(error as ErrorResponse));
    }
  }
);

export const updatePswd = createAsyncThunk(
  'auth/updatePswd',
  async (payload:{pswd:string}, { rejectWithValue }) => {
    try {
      const user = auth.currentUser;
      if (user) {
        await updatePassword(user, payload.pswd);
      } else {
        throw new Error('No user is currently signed in.');
      }
    } catch (error) { 
      return rejectWithValue(handleError(error as ErrorResponse));  
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      localStorage.removeItem('authdata');
      return false;
    } catch (error) {
      console.error(error);
      return rejectWithValue('Failed to log out');
    }
  }
);

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    loggedInUserDetails: typeof window !== 'undefined' && localStorage.getItem('authdata')
      ? JSON.parse(localStorage.getItem('authdata') ?? '{}')
      : null,
    rememberMe: typeof window !== 'undefined' && localStorage.getItem('displayemail') ? true : false,
    rememberEmail: typeof window !== 'undefined' && localStorage.getItem('displayemail') ? localStorage.getItem('displayemail') : null,
    error: ''
  },
  reducers: {
    setRememberMe: (state: AuthState, action) => {
        if(!action.payload){
            localStorage.removeItem('displayemail');
        }
      state.rememberMe = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state:AuthState) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedInUserDetails = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedInUserDetails = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.loggedInUserDetails = null;
        state.rememberMe = typeof window !== 'undefined' && localStorage.getItem('displayemail') ? true : false;
        state.rememberEmail = typeof window !== 'undefined' && localStorage.getItem('displayemail') ? localStorage.getItem('displayemail') : null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.rememberMe = typeof window !== 'undefined' && localStorage.getItem('displayemail') ? true : false;
        state.rememberEmail = typeof window !== 'undefined' && localStorage.getItem('displayemail') ? localStorage.getItem('displayemail') : null;
      });
  }
});

export const { setRememberMe } = authSlice.actions;

export default authSlice;
