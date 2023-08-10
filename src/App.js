import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import "./app/constant.js";
import "react-toastify/dist/ReactToastify.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import "rsuite/dist/rsuite.min.css";
import "rsuite/styles/index.less";
import "./assets/css/custom.css";
import { Layout } from "./components/Layouts/Layout.jsx";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import { VerifyAccount } from "./components/Profile/VerifyAccount";
// import PreLoader from "./components/PreLoader";

const HomeComponent = lazy(() => import("./pages/Home.js"));
const NoMatch = lazy(() => import("./components/Layouts/NoMatch.jsx"));
const ProductDetail = lazy(() => import("./pages/ProductDetail.js"));
const Collection = lazy(() => import("./pages/Collection"));
const Category = lazy(() => import("./pages/Category.js"));
const ShopByBrand = lazy(() => import("./pages/ShopByBrand"));
const Cart = lazy(() => import("./pages/Cart"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Profile = lazy(() => import("./pages/Profile"));
const PaymentResponse = lazy(() => import("./pages/PaymentResponse.js"));
const OrderSummary = lazy(() => import("./pages/OrderSummary.js"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword.js"));
const ResetPassword = lazy(() => import("./pages/ResetPassword.js"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy.js"));
const TermsofUse = lazy(() => import("./pages/TermsofUse.js"));
const ReturnPolicy = lazy(() => import("./pages/ReturnPolicy.js"));
const ShippingPolicy = lazy(() => import("./pages/ShippingPolicy.js"));
const BrandDetails = lazy(() => import("./pages/BrandDetails.js"));

const theme = createTheme({
  palette: {
    primary: {
      main: "#313190",
    },
    light: {
      main: "#eeeeee",
    },
    secondary: {
      main: "#313190",
    },
    error: {
      main: "#b60000",
    },
    dark: {
      main: "#1a1a1a",
    },
    warning: {
      main: "#F9B208",
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomeComponent />} />
          <Route path="product/:product_url" element={<ProductDetail />} />
          <Route path="category/:category_slug" element={<Category />} />
          <Route path="products/:collection_slug" element={<Collection />} />
          <Route path="brand" element={<ShopByBrand />} />
          <Route path="brands/:brand_slug" element={<BrandDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgotpassword" element={<ForgotPassword />} />
          <Route path="reset-password/:token" element={<ResetPassword />} />
          <Route path="profile" element={<Profile />} />
          <Route path="ordersummary/:order_no" element={<OrderSummary />} />
          <Route
            path="thankyou/:payment_response"
            element={<PaymentResponse />}
          />
          <Route path="privacypolicy" element={<PrivacyPolicy />} />
          <Route path="termsofuse" element={<TermsofUse />} />
          <Route path="returnpolicy" element={<ReturnPolicy />} />
          <Route path="shippingpolicy" element={<ShippingPolicy />} />
          <Route path="verify-account/:token" element={<VerifyAccount />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>

      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </ThemeProvider>
  );
};

export default App;
