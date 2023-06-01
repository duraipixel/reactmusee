import { Fragment, useEffect, useMemo, useState } from 'react'
import { ShippingFee } from './ShippingFee'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import useRazorpay from 'react-razorpay';
import { toast } from 'react-toastify';
import { setPaymentResponse } from '../../app/reducer/paymentResponseSlice';
import { useNavigate } from 'react-router-dom';
import { clearCart, fetchCarts } from '../../app/reducer/cartSlice';
import './cart.css';
import { RocketShippingFee } from './RocketShippingFee';
import { Button } from 'rsuite';
import { Tooltip } from '@mui/material';
import { setCoupon } from '../../app/reducer/couponSlice';
import { setCartCount } from '../../app/reducer/cartCountSlice';
import CaptchaForm from './CaptchaForm';


export const CartDetails = ({ billingAddress, setPaymentLoader, cart_total, cart_items, shippingAddress, proceedCheckout, shippCharges, updateCartAmount, customerAddress, cartInfo, flatCharge }) => {

    const coupon = useSelector((state) => state.coupon);
    const [showCaptcha, setShowCaptcha] = useState(false);
    const [codFormloading, setCodFormloading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectShippingAddress, setSelectShippingAddress] = useState('');
    const [checkoutFormloading, setCheckoutFormLoading] = useState(false);
    const Razorpay = useRazorpay();
    const [isLoadingCoupon, setIsLoadingCoupon] = useState(false);
    // const couponInfo = localStorage.getItem('cart_coupon') ? JSON.parse(localStorage.getItem('cart_coupon')) : '';
    const shipping_address = localStorage.getItem('shipping_address');

    const handleShipAddress = (ship) => {
        setSelectShippingAddress(ship);
    }

    useMemo(() => {

        let ship = customerAddress.find(item => item.id == shipping_address);
        handleShipAddress(ship);

    }, [shipping_address])


    const handlePayment = async (pay_type = '') => {
        
        const customer = JSON.parse(window.localStorage.getItem('customer'));
        if (!customer?.id) {
            toast.error('Please Login to Checkout');
            setTimeout(() => {
                navigate('/login')
            }, 300);
            return false;
        }
        
        if( !cartInfo.selected_shipping_fees ) {
            toast.error('Shipping Speed is required');
            return false;
        }

       
        const shipping_address = localStorage.getItem('shipping_address');
        const shiprocket_charges = localStorage.getItem('shiprocket_charges') ? JSON.parse(localStorage.getItem('shiprocket_charges')) : []

        if (!shipping_address) {
            toast.error('Shipping address is required');
            setCheckoutFormLoading(false);
            setPaymentLoader(false);
        } else {
            if( pay_type == 'cod' ) {
                setShowCaptcha(true);
                setCodFormloading(true);
                console.log('cod ')
                
            } else {
                setCheckoutFormLoading(true);
                setPaymentLoader(true);
                axios({
                    url: window.API_URL + '/proceed/checkout',
                    method: 'POST',
                    data: { customer_id: customer.id, shipping_address: shipping_address, shiprocket_charges: shiprocket_charges, billing_address: billingAddress, cart_total: cart_total, cart_items: cart_items, selected_shipping_fees: cartInfo.selected_shipping_fees },
                }).then((response) => {
    
                    if (response.error == 1) {
                        toast.error(response.message);
                    } else {
                        verifyPayment(response.data);
                    }
    
                });
            }
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
            modal: {
                ondismiss: function () {
                    setPaymentLoader(false);
                    setCheckoutFormLoading(false);
                }
            }
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
                localStorage.removeItem('shiprocket_charges');
                localStorage.removeItem('cart_coupon')
                localStorage.removeItem('flat_charge');
                dispatch(setCartCount(0));
                dispatch(clearCart());
                toast.success(response.data.message);
                navigate('/thankyou/success');
            } else {
                toast.error(response.data.message);
                // navigate('/thankyou/fail');
            }

        });

    }

    const applyCoupon = () => {

        setIsLoadingCoupon(true);
        let customer = JSON.parse(window.localStorage.getItem('customer'));
        if (!customer?.id) {
            toast.error('Login to Apply Coupon');
            navigate('/login')
        }

        var coupon_code = document.getElementById('coupon').value;

        if (coupon_code == '') {
            toast.error('Coupon code is required');
            document.getElementById('coupon').focus();
            setIsLoadingCoupon(false);
            return false;
        }

        var cartValues = localStorage.getItem('cart') && localStorage.getItem('cart') != 'undefined' ? JSON.parse(localStorage.getItem('cart')) : '';
        var selectCartShipValues = cartValues ? cartValues?.selected_shipping_fees : '';

        axios({
            url: window.API_URL + '/apply/coupon',
            method: 'POST',
            data: { coupon_code: coupon_code, customer_id: customer.id, selected_shipping: selectCartShipValues },

        }).then((res) => {
            setIsLoadingCoupon(false);

            if (res.data.status == 'error') {
                toast.error(res.data.message);
            } else if (res.data.status == 'success') {
                toast.success(res.data.message);
                document.getElementById('coupon').readOnly = true;
                document.getElementById('coupon_apply_btn').style.display = 'none';
                document.getElementById('coupon_cancel_btn').style.display = 'block';
            }

            dispatch(setCoupon(res.data));

            localStorage.setItem('cart', JSON.stringify(res.data.cart_info));
            localStorage.setItem('cart_coupon', JSON.stringify(res.data.coupon_info));
            dispatch(fetchCarts(JSON.parse(window.localStorage.getItem('cart'))))

        }).catch((err) => {
        })
    }

    const cancelCoupon = () => {
        localStorage.removeItem('cart_coupon');
        fetchCartProducts();
        dispatch(setCoupon(''));
        let cancelApplyBtn = document.getElementById('coupon');
        cancelApplyBtn.readOnly = false;
        cancelApplyBtn.value = '';
        document.getElementById('coupon_cancel_btn').style.display = 'none';
        document.getElementById('coupon_apply_btn').style.display = 'block';
    }

    async function fetchCartProducts() {
        var cartValues = JSON.parse(localStorage.getItem('cart'));
        let customer = JSON.parse(window.localStorage.getItem('customer'));

        await axios({
            url: window.API_URL + '/get/cart',
            method: 'POST',
            data: { customer_id: customer?.id, selected_shipping: cartValues?.selected_shipping_fees, guest_token: localStorage.getItem('guest_token') || '' },
        }).then((res) => {

            localStorage.setItem('cart', JSON.stringify(res.data));
            dispatch(fetchCarts(JSON.parse(window.localStorage.getItem('cart'))))

        }).catch((err) => {

        })
    }

    return (
        <Fragment >
            <h5 className='text-primary my-3 fw-bold text-uppercase'>Cart Details</h5>
            <div className="card mb-3">
                <div className="card-body">
                    <ul className="list-group mb-3">
                        <li className="list-group-item d-flex justify-content-between">
                            <b>Sub Total</b>
                            <span className='text-dark fw-bold'>₹{cart_total.product_tax_exclusive_total}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                            <b>Taxes</b>
                            <span className='text-dark fw-bold'>₹{cart_total.tax_total}</span>
                        </li>
                        {
                            coupon?.value?.coupon_code && (
                                <li className="list-group-item d-flex justify-content-between">
                                    <b>Coupon [{coupon?.value?.coupon_code} {coupon?.value?.coupon_info?.coupon_type?.discount_type == 'percentage' ? coupon?.value?.coupon_info?.coupon_type.discount_value + '%' : ''}] (-)</b>
                                    <span className='text-dark fw-bold'>₹{coupon.value.coupon_amount}</span>
                                </li>
                            )
                        }
                    </ul>
                    <ShippingFee shippCharges={shippCharges} updateCartAmount={updateCartAmount} cartInfo={cartInfo} flatCharge={flatCharge} />
                    <ul className="list-group my-3">
                        <li className="list-group-item d-flex justify-content-between align-items-end">
                            <b className='lead'>Grand Total</b>
                            <span className='text-dark fw-bold lead'>₹{cart_total.total}</span>
                        </li>
                    </ul>
                    {selectShippingAddress &&
                        <ul className="list-group my-3">
                            <li className="list-group-item">
                                <b className='text-capitalize text-primary'>
                                    <i className="fa fa-map-marker"></i>  {selectShippingAddress.name}
                                </b>
                                <div className='text-secondary fw-bold'>
                                    <span>{selectShippingAddress.address_line1}, {selectShippingAddress.state}, <b>{selectShippingAddress.post_code}</b></span>
                                </div>
                            </li>
                        </ul>
                    }
                    <div className='mb-1 fw-bold text-primary'>
                        Have a Coupon?
                        <Tooltip title="Get More, Spend Less!" placement="top-start" arrow>
                            <i className="fa fa-info-circle ms-1 text-secondary"></i>
                        </Tooltip>
                    </div>
                    <div className="input-group mb-3">
                        <input type="text" id="coupon" className="form-control border" value={coupon?.value?.coupon_code} role={`${coupon?.value?.coupon_code ? 'button' : ''}`} placeholder='Enter here..' />

                        <Button loading={isLoadingCoupon} className="btn text-white bg-dark" onClick={() => applyCoupon()} id="coupon_apply_btn">Apply</Button>
                        <Button loading={isLoadingCoupon} style={{ display: 'none' }} className="btn text-white bg-dark" onClick={() => cancelCoupon()} id="coupon_cancel_btn">Cancel</Button>
                        {/* loading={true} */}
                    </div>
                    <Button className='btn-dark text-white w-100' size='lg'
                        onClick={() => handlePayment()}
                        loading={checkoutFormloading}
                    >
                        Proceed to Checkout
                    </Button>

                    <Button className='btn-success text-white w-100 mt-3' size='lg'
                        onClick={() => handlePayment('cod')}
                        loading={codFormloading}
                    >
                        Cash On Delivery
                    </Button>
                </div>
            </div>
            <CaptchaForm setShowCaptcha={setShowCaptcha} showCaptcha={showCaptcha} setCodFormloading={setCodFormloading} setPaymentLoader={setPaymentLoader} billingAddress={billingAddress} cart_total={cart_total} cart_items={cart_items} cartInfo={cartInfo} />

        </Fragment>
    )
}
