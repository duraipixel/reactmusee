import { createSlice } from '@reduxjs/toolkit'

export const customerSlice = createSlice({
  name: 'customer',
  initialState: {
    value: window.localStorage.getItem('customer') || null,
  },
  reducers: {
    loginCustomer: (state, action ) => {
      state.value = {...action.payload};
    },
    logoutCustomer: (state, action) => {
        state.value = null;
    }
  },
})

export const { loginCustomer, logoutCustomer } = customerSlice.actions

export default customerSlice.reducer
