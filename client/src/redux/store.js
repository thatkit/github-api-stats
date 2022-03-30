import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiService } from './apiService';
import authSliceReducer from './authSlice';

export const store = configureStore({
    reducer: {
        [apiService.reducerPath]: apiService.reducer,
        authSlice: authSliceReducer 
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiService.middleware)
});

setupListeners(store.dispatch);