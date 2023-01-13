import { configureStore } from '@reduxjs/toolkit'
import menuSlice from './reducer/menuSlice'
import sideMenuBarReducer from './reducer/sideMenuBarSlice'
import topMenuSlice from './reducer/topMenuSlice'
import brandSlice from './reducer/brandSlice';
import productFilterSlice from './reducer/productFilterSlice';
import bannerSlice from './reducer/bannerSlice';
import customerSlice from './reducer/customerSlice';
import cartReducer from './reducer/cartSlice';

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

import { attemptedCartReducer } from './reducer/attemptedCartSlice';
import couponSlice from './reducer/couponSlice';
import { customerAddressSlice } from './reducer/customerAddressSlice';
import { shippingAddressSlice } from './reducer/shippingAddressSlice';
import { paymentResponseSlice } from './reducer/paymentResponseSlice';

const persistConfig = {
  key: 'root',
  storage,  
}
// const persistedReducer = persistReducer(persistConfig, cartReducer)
const persistedAttemptedReducer = persistReducer(persistConfig, attemptedCartReducer)

export const store = configureStore({
  reducer: {
    'sideMenuBar': sideMenuBarReducer,
    'topmenu': topMenuSlice,
    'brands': brandSlice,
    'menus': menuSlice,
    'products': productFilterSlice,    
    'banners': bannerSlice,
    'cart':cartReducer,    
    'attempt_cart': persistedAttemptedReducer,
    'customer': customerSlice,
    'coupon': couponSlice,
    'address': customerAddressSlice,
    'shipping_address': shippingAddressSlice,
    'payment_response': paymentResponseSlice,
   
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)
