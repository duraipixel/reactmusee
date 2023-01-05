import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, Link, Outlet } from 'react-router-dom';
import { ToastContainer } from "react-toastify";

import './app/constant.js';
import { isOpenSideBar } from './app/reducer/sideMenuBarSlice.js';
import { Copyrights } from './components/Layouts/Copyrights.jsx';
import Footer from './components/Layouts/Footer.jsx';
import { Layout } from './components/Layouts/Layout.jsx';
import { MobileFooter } from './components/Layouts/MobileFooter.jsx';
import { NoMatch } from './components/Layouts/NoMatch.jsx';
import Home from './pages/Home';
import { ProductDetail } from './pages/ProductDetail.js';
import { Collection } from './pages/Collection';
import { Category } from './pages/Category.js';
import { ShopByBrand } from './pages/ShopByBrand';

import "react-toastify/dist/ReactToastify.css";


const App = () => {

  return (
    <Fragment>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='product/:product_url' element={<ProductDetail />} />
          <Route path='category/:category_slug' element={<Category />} />
          <Route path='products/:collection_slug' element={<Collection />} />
          <Route path='brand' element={<ShopByBrand />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
     
    </Fragment>
  )
  
}

export default App;