import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiService = createApi({
    reducerPath: 'apiService',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://github-api-stats.herokuapp.com/api' || 'http://localhost:5000/api',
        prepareHeaders: (headers, { getState }) => {
            const tokenData = getState().apiService.queries['getAuthToken(undefined)'].data;
            if (tokenData) {
                headers.set('token', tokenData.token);
            }
            return headers;
        }
    }),
    keepUnusedDataFor: 30,
    endpoints: build => ({
        getAuthToken: build.query({
            query: () => '/auth'
        }),
        getUserByLogin: build.query({
            query: login => `/user/${login}`
        }),
        getLangsByLogin: build.query({
            query: login => `/langs/${login}`
        }),
    })
});

export const {
    useGetAuthTokenQuery,
    useLazyGetUserByLoginQuery,
    useLazyGetLangsByLoginQuery
} = apiService;