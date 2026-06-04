import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import mainReducer from '../reducer'

const store = configureStore({
    reducer: mainReducer,
    preloadedState: {
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    devTools: process.env.NODE_ENV !== 'production', // Use Redux DevTools in development mode only
});

export default store;
