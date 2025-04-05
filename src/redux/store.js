'use client';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import weatherReducer from './weatherSlice';
import cryptoReducer from './cryptoSlice';
import newsReducer from './newsSlice';
import favoritesReducer from './favoritesSlice';
import notificationsReducer from './notificationsSlice';

const store = configureStore({
  reducer: {
    weather: weatherReducer,
    crypto: cryptoReducer,
    news: newsReducer,
    favorites: favoritesReducer,
    notifications: notificationsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(/* Add thunk if needed */),
});

export function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

export default store;