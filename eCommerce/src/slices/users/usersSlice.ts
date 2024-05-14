import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  ICustomerDraft,
  LoginData,
  UserStatusTypes,
  UsersState,
} from './userReducerType';
import { getAuthToken } from '../../api/authToken';
import { getEmailToken } from '../../api/emailToken';
import { AxiosError } from 'axios';
import { getCustomer } from '../../api/getCustomer';
import { registration } from '../../api/register';
import { deleteMailToken } from '../../api/cookie';
import { login } from '../../api/login';

const initialState: UsersState = {
  user: null,
  status: null,
  message: null,
  isAuth: false,
};

export const fetchAuthToken = createAsyncThunk(
  'users/fetchAuthToken',
  async () => {
    const response = await getAuthToken();
    return response;
  }
);

export const fetchAuthEmailToken = createAsyncThunk(
  'users/fetchAuthEmailToken',
  async (loginData: LoginData, thunkAPI) => {
    try {
      return await getEmailToken(loginData.username, loginData.password);
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
    return '';
  }
);

export const fetchMeCustomer = createAsyncThunk(
  'users/fetchMeCustomer',
  async (_payload, { rejectWithValue }) => {
    let response = null;
    try {
      response = await getCustomer();
    } catch (error) {
      if (error instanceof AxiosError) {
        rejectWithValue(error.message);
      }
    }
    return response;
  }
);

export const fetchRegisterCustomer = createAsyncThunk(
  'users/fetchRegisterCustomer',
  async (newCustomerData: ICustomerDraft, thunkAPI) => {
    let response = null;
    try {
      response = await registration(newCustomerData);
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
    return response;
  }
);

export const fetchLoginMeCustomer = createAsyncThunk(
  'users/fetchLoginMeCustomer',
  async (loginData: LoginData, thunkAPI) => {
    try {
      return await login(loginData);
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
    return '';
  }
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    reset: (state) => {
      state.user = null;
      state.status = null;
      state.message = null;
      state.isAuth = false;
      deleteMailToken('emailToken');
    },

    resetStatus: (state) => {
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMeCustomer.pending, (state) => {
        state.status = UserStatusTypes.LOADING;
      })
      .addCase(fetchMeCustomer.fulfilled, (state, { payload: customer }) => {
        state.status = UserStatusTypes.SUCCESS;
        state.isAuth = true;
        state.user = state.user ? { ...state.user, ...customer } : customer;
      })
      .addCase(fetchMeCustomer.rejected, (state, { payload }) => {
        state.status = UserStatusTypes.ERROR;
        state.message = payload as string;
        state.user = null;
      })
      .addCase(fetchLoginMeCustomer.pending, (state) => {
        state.status = UserStatusTypes.LOADING;
      })
      .addCase(
        fetchLoginMeCustomer.fulfilled,
        (state, { payload: { customer } }) => {
          state.status = UserStatusTypes.SUCCESS;
          state.isAuth = true;
          state.user = state.user ? { ...state.user, ...customer } : customer;
        }
      )
      .addCase(fetchLoginMeCustomer.rejected, (state, { payload }) => {
        state.status = UserStatusTypes.ERROR;
        state.message = payload as string;
        state.user = null;
      })
      .addCase(fetchRegisterCustomer.pending, (state) => {
        state.status = UserStatusTypes.LOADING;
      })
      .addCase(
        fetchRegisterCustomer.fulfilled,
        (state, { payload: { customer } }) => {
          state.status = UserStatusTypes.SUCCESS;
          state.isAuth = true;
          state.user = state.user ? { ...state.user, ...customer } : customer;
        }
      )
      .addCase(fetchRegisterCustomer.rejected, (state, { payload }) => {
        state.status = UserStatusTypes.ERROR;
        state.message = payload as string;
        state.user = null;
      });
  },
});

export const { reset, resetStatus } = usersSlice.actions;
export default usersSlice.reducer;
