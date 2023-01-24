import React, { Fragment, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutCustomer } from '../../app/reducer/customerSlice';
import { clearAttemptItem } from '../../app/reducer/attemptedCartSlice';
import { clearCart } from '../../app/reducer/cartSlice';

export default function Topbar({ isTopPage }) { 
    
    const customer = useSelector((state) => state.customer);
    const location = useLocation();
    const navigate = useNavigate();
    const [cartCount, setCartCount] = useState(0);
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    
    const getTotalQuantity = () => {
        
        let total = 0;
        (cart.length > 0 || typeof cart == 'object')  && cart.cart.carts && Object.entries(cart.cart.carts).map((key,item) => {
           
            return total += cart.cart.carts[item].quantity;
        })
        
        setCartCount(total);
        return total
    }

    useEffect(() => {
        getTotalQuantity();
    }, [cart])
    

    const logout = () => {

        localStorage.removeItem('customer');
        dispatch(clearCart());
        dispatch(logoutCustomer());        
        dispatch(clearAttemptItem())

        if( location.pathname == '/cart' ) {
            navigate('/');
        } else {
            navigate('/login');
        }
    }
    
    return (
        <Fragment>
            <div className={`top-bar ${isTopPage ? "top-fix" : ""}`} >
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="top-logo">
                                    <Link to="/">
                                        <img src="/assets/images/logo.svg" alt="" />
                                    </Link>
                                </div>
                                <div className="top-search">
                                    <div className="">
                                        <select className="form-control" id="enq" name="enq">
                                            <option value="">All Products</option>
                                            <option value="Dealer">Dealer</option>

                                        </select>
                                    </div>
                                    <div className="form-data">
                                        <input className="src-blnk" type="search" placeholder="Search..." />
                                        {/* <ul className="src-fndings">
                                        <li>
                                            <a href="">
                                                <img src="/assets/images/sum-1.png" /> Yamaha FC5 Sustain Pedal for Keyboards and Pianos
                                                <span>Home | Products | Yamaha | FC5 Sustain Pedal for Keyboards and Pianos</span>
                                            </a>
                                        </li>
                                    </ul> */}
                                    </div>
                                </div>
                                <div className="top-icons">
                                    <ul>
                                        <li>
                                            <Link to="cart">
                                                <img src="/assets/images/cart.png" alt="" />
                                            </Link>
                                            <span className={`cart-tpimg ${cartCount > 0 ? '' : 'hide'}`}>{cartCount}</span>
                                        </li>
                                        <li>
                                            <Link to={`${ customer.value ? '/profile' : '/login'}`}>
                                                <img src="/assets/images/user.png" alt="" />
                                            </Link>
                                        </li>
                                        {
                                            customer.value ? 
                                        
                                        <li>
                                            <span onClick={()=> logout()}>
                                                <img src="/assets/images/logout.png" alt="" />
                                            </span>
                                        </li>
                                        : null }
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
