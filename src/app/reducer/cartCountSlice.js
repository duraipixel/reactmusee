import { createSlice } from '@reduxjs/toolkit'

export const cartCountSlice = createSlice({
  name: 'cart_count',
  initialState: {
    value: '',
  },
  reducers: {
    setCartCount: (state, action ) => {
      state.value = action.payload;
    }
  },
})

export const { setCartCount } = cartCountSlice.actions

export default cartCountSlice.reducer