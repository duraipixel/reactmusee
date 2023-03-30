import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const quickLinkApi = createApi({
    reducerPath: 'quickLinkApi',
    baseQuery: fetchBaseQuery({ baseUrl:window.API_URL}),
    endpoints: (builder) => ({
        quickLink: builder.query({
            query:() => '/get/quickLink'
        })
    })
})

export const { useQuickLinkQuery } = quickLinkApi;
