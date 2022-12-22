import React, { Fragment, useEffect, useState } from 'react'
import { Route, Routes, Link, Outlet } from 'react-router-dom';
import './app/constant.js';
import { Layout } from './components/Layouts/Layout.jsx';
import { NoMatch } from './components/Layouts/NoMatch.jsx';
import Home from './pages/Home';
import { ProductDetail } from './pages/ProductDetail.js';

const App = () => {
  return (
    <Fragment>
      
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='product/:product_url' element={<ProductDetail />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </Fragment>
  )
}

export default App;