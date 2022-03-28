import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from '../helpers/cookies';

export const apiService = createApi({
    reducerPath: 'api',
    tagTypes: ['cacheee'],
    keepUnusedDataFor: 30,
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api',
        prepareHeaders: (headers, { getState }) => {
            if (getCookie('token')) {
                headers.set('token', getCookie('token'))
            }
            return headers
        }
    }),
    endpoints: build => ({
        getAuthToken: build.query({
            query: () => '/auth',
            providesTags: (result, error) => [{ type: 'cacheee' }],
            // The 2nd parameter is the destructured `QueryLifecycleApi`
            async onQueryStarted(
                arg,
                {
                    dispatch,
                    getState,
                    extra,
                    requestId,
                    queryFulfilled,
                    getCacheEntry,
                    updateCachedData,
                }
            ) {
                console.log(await queryFulfilled)
            },
            // The 2nd parameter is the destructured `QueryCacheLifecycleApi`
            async onCacheEntryAdded(
                arg,
                {
                    dispatch,
                    getState,
                    extra,
                    requestId,
                    cacheEntryRemoved,
                    cacheDataLoaded,
                    getCacheEntry,
                    updateCachedData,
                }
            ) {
                console.log(await cacheEntryRemoved)
            },
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
    useGetUserByLoginQuery,
    useGetLangsByLoginQuery
} = apiService;

/*

Now I need to figure out how those onQueryEntry etc. func work in order to maintain a clean logic for caching token and using as a header

*/