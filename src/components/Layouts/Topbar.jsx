import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getTotals } from '../../app/reducer/cartSlice';

export default function Topbar({ isTopPage }) {

    const cart = useSelector((state) => state.cart);
    const [cartCount, setCartCount] = useState(0);

    const getTotalQuantity = () => {
        let total = 0
        console.log(cart, 'cart datat');
        cart.cart.length > 0 && cart.cart.forEach(item => {
            total += item.quantity
        })
        // setCartCount(total);
        return total
    }
    console.log( 'getTotalQuantity', getTotalQuantity());

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
                                            <a href="my-account.html"><img src="/assets/images/user.png" alt="" /></a>
                                        </li>
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
