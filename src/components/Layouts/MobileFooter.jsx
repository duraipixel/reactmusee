import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { clearAttemptItem } from '../../app/reducer/attemptedCartSlice';
import { clearCart } from '../../app/reducer/cartSlice';
import { logoutCustomer } from '../../app/reducer/customerSlice';
import { isOpenSideBar } from '../../app/reducer/sideMenuBarSlice';

export const MobileFooter = () => {

    const customer = useSelector((state) => state.customer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const openSideBar = () => {
        dispatch(isOpenSideBar());
    }

    const logout = () => {

        localStorage.removeItem('customer');
        dispatch(clearCart());
        dispatch(logoutCustomer());
        dispatch(clearAttemptItem())

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
                <a href="/cart" data-toggle="tooltip" title="Cart Details">
                    <img src="assets/images/mob-ic-3.png" alt="" className="img-fluid" /> Cart
                </a>
                <a href="tel:+914428522780" target="_blank" data-toggle="tooltip" title="Call Us">
                    <img src="assets/images/mob-ic-5.png" alt="" className="img-fluid" /> Call Us
                </a>
            </div>
        </Fragment>
    )
}
