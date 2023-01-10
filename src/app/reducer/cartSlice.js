// src/redux/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from 'axios';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: window.localStorage.getItem('cart') || [],
  },
  reducers: {
    addToCart: (state, action) => {
      
      const itemInCart = state.cart.find((item) => item.id === action.payload.id);
      let customer = JSON.parse(window.localStorage.getItem('customer'));
      
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1, customer_id: customer.id });
      }
      let data = itemInCart || { ...action.payload, quantity: 1, customer_id: customer.id }
      axios({
            url: window.API_URL + '/add/cart',
            method: 'POST',
            data: data,
        }).then((res) => {
            console.log(res);  
          
        }).catch((err) => {

        })
      toast.success('Cart added Successfully', {
          position: toast.POSITION.BOTTOM_RIGHT
      });
     
    },
    incrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      item.quantity++;
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item.quantity === 1) {
        item.quantity = 1
      } else {
        item.quantity--;
      }
    },
    removeItem: (state, action) => {
      const removeItem = state.cart.filter((item) => item.id !== action.payload);
      state.cart = removeItem;
    },
    clearCart: (state, action) => {
      state.cart = [];
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  clearCart,
} = cartSlice.actions;