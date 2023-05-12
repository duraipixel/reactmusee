import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: window.sessionStorage.getItem('cart') && window.sessionStorage.getItem('cart') != 'undefined'  ? JSON.parse(window.sessionStorage.getItem('cart')) : [],
  },
  reducers: {
    
    fetchCarts: (state, action) => {
      
      state.cart = action.payload;
    },

    clearCart:(state,action) => {
      state.cart = [];
    }

  },
})

export const { fetchCarts, clearCart } = cartSlice.actions

export default cartSlice.reducer
