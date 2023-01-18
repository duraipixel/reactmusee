import React, { Fragment, useEffect, useState } from 'react'
import { ShippingFee } from './ShippingFee'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import useRazorpay from 'react-razorpay';
import { toast } from 'react-toastify';
import { setPaymentResponse } from '../../app/reducer/paymentResponseSlice';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../../app/reducer/cartSlice';

export const CartDetails = ({ cart_total, cart_items, shippingAddress, proceedCheckout, shippCharges, updateCartAmount, cartInfo }) => {
    // const coupon = useSelector((state) => state.coupon);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [checkoutFormloading, setCheckoutFormLoading] = useState(false);
    const Razorpay = useRazorpay();
    const handlePayment = async () => {

        setCheckoutFormLoading(true);
        const customer = JSON.parse(window.localStorage.getItem('customer'));
        const shipping_address = JSON.parse(window.localStorage.getItem('shipping_address'));
        if (!shippingAddress) {
            toast.error('Shipping address is required', {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            setCheckoutFormLoading(false);
        }
        axios({
            url: window.API_URL + '/proceed/checkout',
            method: 'POST',
            data: { customer_id: customer.id, shipping_address: shipping_address, cart_total: cart_total, cart_items: cart_items },
        }).then((response) => {
            verifyPayment(response.data);
            setCheckoutFormLoading(false);
        });
    }

    const verifyPayment = async (params) => {

        const options = {
            key: params.key,
            amount: params.amount,
            currency: params.currency,
            name: params.name,
            description: params.description,
            image: params.image,
            order_id: params.order_id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
            handler: function (response) {
                verifySignature(response, 'success')
            },
            prefill: {
                name: params.prefill.name,
                email: params.prefill.email,
                contact: params.prefill.contact,
            },
            notes: {
                address: params.notes.address,
            },
            theme: {
                color: params.theme.color,
            },
        }

        const rzp1 = new Razorpay(options);

        rzp1.on("payment.failed", function (response) {
            verifySignature(response, 'fail')
        });

        rzp1.open();
    };

    const verifySignature = (data, type) => {

        const customer = JSON.parse(window.localStorage.getItem('customer'));

        axios({
            url: window.API_URL + '/verify/payment/signature',
            method: 'POST',
            data: { razor_response: data, customer_id: customer.id, status: type },
        }).then((response) => {
            

            if (response.data.success) {
                localStorage.removeItem('shipping_address');
                localStorage.removeItem('cart');
                dispatch(clearCart());
                toast.success(response.data.message, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                navigate('/thankyou/success');
            } else {
                toast.error(response.data.message, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });

                // navigate('/thankyou/fail');
            }

        });

    }
    
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

                <table className="table table-borderless">
                    <tbody>
                        <tr>
                            <td>Ship To:</td>
                            {/* <td><a href="">Changes Address</a></td> */}
                        </tr>
                        <tr>
                            {shippingAddress &&
                                <td colSpan="2">
                                    {shippingAddress.name}
                                    <br /> {shippingAddress.address_line1},
                                    {shippingAddress.city}
                                    {shippingAddress.state}
                                    {shippingAddress.post_code}
                                </td>
                            }

                        </tr>
                    </tbody>
                </table>
                
                <ShippingFee shippCharges={shippCharges} updateCartAmount={updateCartAmount} cartInfo={cartInfo}/>
                <div className="line-spacer"></div>
                <table className="table table-borderless end-point">
                    <tbody>
                        <tr>
                            <td>Grand Total</td>
                            <td> ₹{cart_total.total} </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <button onClick={() => handlePayment()} disabled={`${checkoutFormloading ? 'disabled' : ''}`}>
                                {checkoutFormloading && (
                                    <span className="spinner-grow spinner-grow-sm"></span>
                                )} 
                                    Proceed to Checkout
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Fragment>
    )
}
