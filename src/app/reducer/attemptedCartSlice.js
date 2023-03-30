import { createSlice } from '@reduxjs/toolkit';


const attemptedCartSlice = createSlice({
  name: 'attempt_cart',
  initialState: {
    attempt_cart: [],
  },
  reducers: {
    attemptToCart: (state, action) => {
      const itemInCart = state.attempt_cart.find((item) => item.id === action.payload.id);
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        return  state.attempt_cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeAttemptItem: (state, action) => {
      const removeItem = state.attempt_cart.filter((item) => item.id !== action.payload);
      return state.attempt_cart = removeItem;
    },
    clearAttemptItem: (state, action) => {
      return state.attempt_cart = [];
    },
  },
});

export const attemptedCartReducer = attemptedCartSlice.reducer;
export const {
  attemptToCart,
  removeAttemptItem,
  clearAttemptItem,
} = attemptedCartSlice.actions;