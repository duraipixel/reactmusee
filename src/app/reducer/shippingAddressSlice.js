import { createSlice } from '@reduxjs/toolkit'

export const shippingAddressSlice = createSlice({
  name: 'shipping_address',
  initialState: {
    shipping: window.sessionStorage.getItem('shipping_address') || [],
  },
  reducers: {
    
    setDefaultShippingAddress: (state, action) => {
      state.shipping = {...action.payload};
    },
    clearDefaultShippingAddress:(state,action) => {
      state.shipping = [];
    }

  },
})

export const { setDefaultShippingAddress, clearDefaultShippingAddress } = shippingAddressSlice.actions

export default shippingAddressSlice.reducer
