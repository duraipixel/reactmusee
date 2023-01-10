import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutCustomer } from '../../app/reducer/customerSlice';
import { clearCart } from '../../app/reducer/cartSlice';
import { clearAttemptItem } from '../../app/reducer/attemptedCartSlice';

export default function Topbar({ isTopPage }) { 
    
    const customer = useSelector((state) => state.customer);
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const getTotalQuantity = () => {
        let total = 0
        cart.cart.length > 0 && cart.cart.forEach(item => {
            total += item.quantity
        })
        return total
    }

    const logout = () => {
        localStorage.removeItem('customer');
        dispatch(logoutCustomer());
        dispatch(clearCart());
        dispatch(clearAttemptItem())
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
                                            <span className={`cart-tpimg ${getTotalQuantity() > 0 ? '' : 'hide'}`}>{getTotalQuantity()}</span>
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
