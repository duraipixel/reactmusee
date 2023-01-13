import { createSlice } from '@reduxjs/toolkit'

export const customerAddressSlice = createSlice({
  name: 'address',
  initialState: {
    value: window.localStorage.getItem('address') || [],
  },
  reducers: {
    
    fetchAddress: (state, action) => {
        state.value = {...action.payload};
      
    },
    clearAddress:(state,action) => {
      state.value = [];
    }

  },
})

export const { fetchAddress, clearAddress } = customerAddressSlice.actions

export default customerAddressSlice.reducer
