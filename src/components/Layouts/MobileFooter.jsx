import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { clearAttemptItem } from '../../app/reducer/attemptedCartSlice';
import { clearCart } from '../../app/reducer/cartSlice';
import { logoutCustomer } from '../../app/reducer/customerSlice';
import { isOpenSideBar } from '../../app/reducer/sideMenuBarSlice';
import { useMemo } from 'react';
import { useState } from 'react';

export const MobileFooter = () => {

    const customer = useSelector((state) => state.customer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [cartCount, setCartCount] = useState(0);
    const cart = useSelector((state) => state.cart);
    const getTotalQuantity = () => {

        let total = 0;
        (cart.length > 0 || typeof cart == 'object') && cart?.cart?.carts && Object.entries(cart.cart.carts).map((key, item) => {

            return total += cart.cart.carts[item].quantity;
        })

        setCartCount(total);
        return total
    }

    useMemo(() => {
        getTotalQuantity();
    }, [cart])


    const openSideBar = () => {
        dispatch(isOpenSideBar());
    }

    const logout = () => {

        localStorage.removeItem('customer');
        dispatch(clearCart());
        dispatch(logoutCustomer());
        dispatch(clearAttemptItem())
        localStorage.removeItem('shipping_address');
        localStorage.removeItem('cart');
        localStorage.removeItem('shiprocket_charges');
        localStorage.removeItem('billing_address');


        if (location.pathname == '/cart') {
            navigate('/');
        } else {
            navigate('/login');
        }
    }

    return (
        <Fragment >
            <div className="mobile-footer">
                <a className="toggle-button" data-toggle="tooltip" title="All Products" onClick={openSideBar}>
                    <img src="assets/images/mob-ic-1.png" alt="" className="img-fluid" /> Products
                </a>
                {
                    customer.value ? 
                        <Link to="/profile" data-toggle="tooltip" title="profile">
                            <img src="assets/images/mob-ic-2.png" alt="" className="img-fluid" /> My Profile
                        </Link>
                        :
                        <Link to="/login" data-toggle="tooltip" title="Login">
                            <img src="assets/images/mob-ic-2.png" alt="" className="img-fluid" /> Login
                        </Link>

                }
                <Link to="/cart" data-toggle="tooltip" title="Cart Details" className='position-relative'>
                    <img src="assets/images/mob-ic-3.png" alt="" className="img-fluid" /> Cart
                    <span style={{  right: '22px',top: '7px' }} className={`cart-tpimg ${cartCount > 0 ? '' : 'hide'}`}>{cartCount}</span>
                </Link>
                <a href="tel:+914428522780" target="_blank" data-toggle="tooltip" title="Call Us">
                    <img src="assets/images/mob-ic-5.png" alt="" className="img-fluid" /> Call Us
                </a>
            </div>
        </Fragment>
    )
}
