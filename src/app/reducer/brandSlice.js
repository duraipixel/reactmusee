import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    brands: [],
    error: ''
}

export const fetchBrands = createAsyncThunk('brands/fetchBrands', () => {
    return fetch(window.API_URL+'/get/brands')
                .then((response) => response.json())
                .then((data) => data.data)
                .catch((err) => {
                    console.log(err.message)
                });
})

export const brandSlice = createSlice({
    name: 'brands',
    initialState,
    extraReducers:(builder) => {
        builder.addCase(fetchBrands.fulfilled, (state, action) => {
            
            state.loading = false
            state.brands = action.payload
            state.error = ''
        })
    }
})

export default brandSlice.reducer
