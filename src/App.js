import { Route, Routes } from 'react-router-dom';
import './app/constant.js';
import { Layout } from './components/Layouts/Layout.jsx';
import { NoMatch } from './components/Layouts/NoMatch.jsx';
import Home from './pages/Home';
import { ProductDetail } from './pages/ProductDetail.js';
import { Collection } from './pages/Collection';
import { Category } from './pages/Category.js';
import { ShopByBrand } from './pages/ShopByBrand'; 
import { Cart } from './pages/Cart';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Profile } from './pages/Profile';
import { PaymentResponse } from './pages/PaymentResponse.js';
import OrderSummary from './pages/OrderSummary.js';
import { ForgotPassword } from './pages/ForgotPassword.js';
import { ResetPassword } from './pages/ResetPassword.js';
import { PrivacyPolicy } from './pages/PrivacyPolicy.js';
import { TermsofUse } from './pages/TermsofUse.js';
import { ReturnPolicy } from './pages/ReturnPolicy.js';
import { ShippingPolicy } from './pages/ShippingPolicy.js';
import { BrandDetails } from './pages/BrandDetails';
import "rsuite/dist/rsuite.min.css";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#14191e',
    },
    error: {
      main: '#d6293e',
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='product/:product_url' element={<ProductDetail />} />
          <Route path='category/:category_slug' element={<Category />} />
          <Route path='products/:collection_slug' element={<Collection />} />
          <Route path='brand' element={<ShopByBrand />} />
          <Route path='brands/:brand_slug' element={<BrandDetails />} />
          <Route path='cart' element={<Cart />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='forgotpassword' element={<ForgotPassword />} />
          <Route path='reset-password/:token' element={<ResetPassword />} />
          <Route path='profile' element={<Profile />} />
          <Route path='ordersummary/:order_no' element={<OrderSummary />} />
          <Route path='thankyou/:payment_response' element={<PaymentResponse />} />
          <Route path='privacypolicy' element={<PrivacyPolicy />} />
          <Route path='termsofuse' element={<TermsofUse />} />
          <Route path='returnpolicy' element={<ReturnPolicy />} />
          <Route path='shippingpolicy' element={<ShippingPolicy />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
      <ToastContainer position="top-center"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" />
    </ThemeProvider>
  )

}

export default App;