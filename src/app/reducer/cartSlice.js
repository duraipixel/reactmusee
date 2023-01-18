import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: window.localStorage.getItem('cart') && window.localStorage.getItem('cart') != 'undefined'  ? JSON.parse(window.localStorage.getItem('cart')) : [],
  },
  reducers: {
    
    fetchCarts: (state, action) => {
      state.cart = {...action.payload};
    },

    clearCart:(state,action) => {
      state.cart = [];
    }

  },
})

export const { fetchCarts, clearCart } = cartSlice.actions

export default cartSlice.reducer
