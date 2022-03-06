import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
    endpoints: (build) => ({
        getUserByLogin: build.query({
            query: login => `/user/${login}`,
        }),
    })
});

export const {
    useGetUserByLoginQuery
} = api;