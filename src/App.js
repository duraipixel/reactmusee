import React, { Fragment} from 'react'
import { Route, Routes} from 'react-router-dom';
import './app/constant.js';
import { Layout } from './components/Layouts/Layout.jsx';
import { NoMatch } from './components/Layouts/NoMatch.jsx';
import Home from './pages/Home';
import { ProductDetail } from './pages/ProductDetail.js';
import { Collection } from './pages/Collection';
import { Category } from './pages/Category.js';
import { ShopByBrand } from './pages/ShopByBrand';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Cart } from './pages/Cart';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Profile } from './pages/Profile';
import { PaymentResponse } from './pages/PaymentResponse.js';
import OrderSummary from './pages/OrderSummary.js';

const App = () => {

  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='product/:product_url' element={<ProductDetail />} />
          <Route path='category/:category_slug' element={<Category />} />
          <Route path='products/:collection_slug' element={<Collection />} />
          <Route path='brand' element={<ShopByBrand />} />
          <Route path='cart' element={<Cart />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='profile' element={<Profile />} />
          <Route path='ordersummary' element={<OrderSummary />} />
          <Route path='thankyou/:payment_response' element={<PaymentResponse />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
      <ToastContainer />
    </Fragment>
  )
  
}

export default App;