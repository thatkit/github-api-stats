import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiService } from './apiService';
import inputSliceReducer from './inputSlice';

export const store = configureStore({
    reducer: {
        [apiService.reducerPath]: apiService.reducer,
        inputSlice: inputSliceReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiService.middleware)
});

setupListeners(store.dispatch);