import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
    endpoints: build => ({
        getUserByLogin: build.query({
            query: login => `/user/${login}`
        }),
        getReposByLogin: build.query({
            query: login => `/repos/${login}`
        }),
    })
});

export const {
    useGetUserByLoginQuery,
    useGetReposByLoginQuery
} = apiSlice;