import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    isSuccess: false,
    products: []
}

export const fetchProducts = createAsyncThunk('products/fetchProducts', (functionUrl = '') => {
    const url = new URL(window.location.href);
    console.log(functionUrl, 'functionUrl');
    return fetch(window.API_URL+'/get/products'+functionUrl)
                .then((response) => response.json())
                .then((data) => { 
                    return data
                })
                .catch((err) => {
                    console.log(err.message)
                });
})

export const productFilterSlice = createSlice({
    name: 'products',
    initialState,
    extraReducers:(builder) => {
        builder.addCase(fetchProducts.pending, (state, action) => {
            state.loading = true;
            state.products = [];
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
            state.isSuccess = true;
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.products = [];
            state.isSuccess = false;
        })
    }
})

export default productFilterSlice.reducer
