import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const customer = JSON.parse(window.localStorage.getItem('customer'));
export const homePageApi = createApi({
    reducerPath: 'homePageApi',
    baseQuery: fetchBaseQuery({ baseUrl: window.API_URL }),
    endpoints: (builder) => ({
        homePageData: builder.query({
            query: () => '/get/home/details'
        }),
        recentViews: builder.query({
            tagTypes: ['Post'],
            query: () => ({
                url: '/get/recent/view',
                method: 'POST',
                body: { customer_id: customer.id }
            })
        }),
    })
})

export const { useHomePageDataQuery, useRecentViewsQuery } = homePageApi;
