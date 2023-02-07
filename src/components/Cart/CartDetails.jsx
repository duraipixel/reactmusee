import React, { Fragment, useEffect, useState } from 'react'
import { ShippingFee } from './ShippingFee'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import useRazorpay from 'react-razorpay';
import { toast } from 'react-toastify';
import { setPaymentResponse } from '../../app/reducer/paymentResponseSlice';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../../app/reducer/cartSlice';
import './cart.css';


export const CartDetails = ({ billingAddress, setPaymentLoader, cart_total, cart_items, shippingAddress, proceedCheckout, shippCharges, updateCartAmount, cartInfo }) => {
    // const coupon = useSelector((state) => state.coupon);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [checkoutFormloading, setCheckoutFormLoading] = useState(false);
    const Razorpay = useRazorpay();
    const couponInfo = sessionStorage.getItem('cart_coupon') ? JSON.parse(sessionStorage.getItem('cart_coupon')) : '';
    console.log(billingAddress, 'billingAddress');
    const handlePayment = async () => {
        setCheckoutFormLoading(true);
        setPaymentLoader(true);

        const customer = JSON.parse(window.localStorage.getItem('customer'));
        const shipping_address = JSON.parse(window.localStorage.getItem('shipping_address'));
        if (!shippingAddress) {
            toast.error('Shipping address is required', {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            setCheckoutFormLoading(false);
            setPaymentLoader(false);


        } else if(!billingAddress) {
            toast.error('Billing address is required', {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            setCheckoutFormLoading(false);
            setPaymentLoader(false);

        } else {

            axios({
                url: window.API_URL + '/proceed/checkout',
                method: 'POST',
                data: { customer_id: customer.id, shipping_address: shipping_address, billing_address:billingAddress, cart_total: cart_total, cart_items: cart_items, shipping_id:cartInfo.shipping_id },
            }).then((response) => {
                if( response.error == 1 ) {
                    toast.error(response.message, {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                } else {
                    verifyPayment(response.data);
                }
                
            });
        }
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
            
            setCheckoutFormLoading(false);
            setPaymentLoader(false);
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
    
    console.log( couponInfo, 'couponInfo')

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
                                    <td>
                                        Coupon {cart_total.coupon_code} (-)
                                        <div className='coupon-pane'>
                                            {
                                                couponInfo && couponInfo.length > 0 && 
                                                couponInfo.map((items) => (
                                                    <div>
                                                        <div>Coupon Applied for {items.category_name}</div>
                                                        <div>Coupon Applied amount for {items.coupon_applied_amount}</div>
                                                        <div>Coupon Amount : {items.discount_amount} {items.coupon_type.discount_type == 'percentage' ? '('+parseInt(items.coupon_type.discount_value)+'%)' : ''} </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </td>
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
