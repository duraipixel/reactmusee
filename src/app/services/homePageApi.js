import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const homePageApi = createApi({
    reducerPath: 'homePageApi',
    baseQuery: fetchBaseQuery({ baseUrl:window.API_URL}),
    endpoints: (builder) => ({
        homePageData: builder.query({
            query:() => '/get/home/details'
        })
    })
})

export const { useHomePageDataQuery } = homePageApi;
