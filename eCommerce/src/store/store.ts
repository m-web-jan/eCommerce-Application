import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../slices/users/usersSlice';

//   https://redux-toolkit.js.org/tutorials/quick-start

const store = configureStore({
  reducer: {
    users: usersReducer,
    // products: productsReducer,
    // currentProduct: currentProductReducer,
    // cart: cartReducer,
    // discount: discountCodesReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
