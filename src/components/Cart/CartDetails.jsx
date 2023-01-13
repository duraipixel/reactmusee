import React, { Fragment, useEffect, useState } from 'react'
import { ShippingFee } from './ShippingFee'
import { useSelector } from 'react-redux';

export const CartDetails = ({cart_total}) => {
    const coupon = useSelector((state) => state.coupon);
    
    return (
        <Fragment >
            <div className="cart-boduy">
                <h4>Cart Details</h4>
                <h5>Cart Subtotal</h5>
                <table className="table table-borderless">
                    <tbody>
                        <tr>
                            <td>Sub Total</td>
                            <td>₹{cart_total.product_tax_exclusive_total}</td>
                        </tr>
                        <tr>
                            <td>Taxes</td>
                            <td>₹{cart_total.tax_total}</td>
                        </tr>
                        {
                           cart_total.coupon_amount ? 
                            <tr>
                                <td>Coupon {cart_total.coupon_code} (-)</td>
                                <td>₹{cart_total.coupon_amount}</td>
                            </tr> 
                           : null
                        }
                    </tbody>
                </table>
                <div className="line-spacer"></div>
                <h5>Select Shipping Speed</h5>
                <table className="table table-borderless">
                    <tbody>
                        <tr>
                            <td>Ship To:</td>
                            <td><a href="">Changes Address</a></td>
                        </tr>
                        <tr>
                            <td colSpan="2">Kabir L <br /> 1833, 18th Main Road, Thiruvalluvar Colony, Anna Nagar West, Chennai, Tamil Nadu 600040</td>
                        </tr>
                    </tbody>
                </table>
                <ShippingFee />
                <div className="line-spacer"></div>
                <table className="table table-borderless end-point">
                    <tbody>
                        <tr>
                            <td>Grand Total</td>
                            <td> ₹{cart_total.total} </td>
                        </tr>
                        <tr>
                            <td colSpan="2"><button>Proceed to Checkout</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Fragment>
    )
}
