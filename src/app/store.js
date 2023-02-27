import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import otherCategorySlice from "./reducer/otherCategorySlice";
import productFilterSlice from "./reducer/productFilterSlice";
import { topMenuApi } from "./services/topMenuApi";
import { homePageApi } from './services/homePageApi';
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import { attemptedCartReducer } from "./reducer/attemptedCartSlice";
import brandSlice from "./reducer/brandSlice";
import menuSlice from "./reducer/menuSlice";
import bannerSlice from "./reducer/bannerSlice";
import cartSlice from "./reducer/cartSlice";
import customerSlice from "./reducer/customerSlice";
import couponSlice from "./reducer/couponSlice";
import customerAddressSlice from "./reducer/customerAddressSlice";
import sideMenuBarSlice from "./reducer/sideMenuBarSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage
}

const reducer = combineReducers({
  [topMenuApi.reducerPath]: topMenuApi.reducer,
  products: productFilterSlice,
  browse: otherCategorySlice,
  attempt_cart: attemptedCartReducer,
  sideMenuBar: sideMenuBarSlice,
  brands: brandSlice,
  menus: menuSlice,
  banners: bannerSlice,
  cart: cartSlice,
  customer: customerSlice,
  coupon: couponSlice,
  address: customerAddressSlice,
})

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(topMenuApi.middleware)
})