import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    isSuccess: false,
    banners: []
}

export const fetchBanners = createAsyncThunk('brands/fetchBanners', () => {
    
    return fetch(window.API_URL+'/get/banners')
                .then((response) => response.json())
                .then((data) => data.data)
                .catch((err) => {
                    console.log(err.message)
                });
})

export const bannerSlice = createSlice({
    name: 'banners',
    initialState,
    extraReducers:(builder) => {
        builder.addCase(fetchBanners.pending, (state, action) => {
            state.loading = true;
            state.banners = [];
        })
        .addCase(fetchBanners.fulfilled, (state, action) => {
            state.loading = false;
            state.banners = action.payload;
            state.isSuccess = true;
        })
        .addCase(fetchBanners.rejected, (state, action) => {
            state.loading = false;
            state.banners = [];
            state.isSuccess = false;
        })
    }
})
export default bannerSlice.reducer
