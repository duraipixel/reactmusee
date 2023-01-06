import { configureStore } from '@reduxjs/toolkit'
import menuSlice from './reducer/menuSlice'
import sideMenuBarReducer from './reducer/sideMenuBarSlice'
import topMenuSlice from './reducer/topMenuSlice'
import brandSlice from './reducer/brandSlice';
import productFilterSlice from './reducer/productFilterSlice';
import bannerSlice from './reducer/bannerSlice';
import { cartReducer } from './reducer/cartSlice';

import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, cartReducer)


export const store = configureStore({
  reducer: {
    'sideMenuBar': sideMenuBarReducer,
    'topmenu': topMenuSlice,
    'brands': brandSlice,
    'menus': menuSlice,
    'products': productFilterSlice,
    'banners': bannerSlice,
    'cart':persistedReducer

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)
