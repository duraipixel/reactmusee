import { createSlice } from '@reduxjs/toolkit'

export const couponSlice = createSlice({
  name: 'coupon',
  initialState: {
    value: '',
  },
  reducers: {
    setCoupon: (state, action ) => {

      state.value = {...action.payload};
    }
  },
})

export const { setCoupon } = couponSlice.actions

export default couponSlice.reducer