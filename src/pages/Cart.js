import React, { Fragment, useEffect, useState } from 'react'
import { AddressForm } from '../components/Cart/AddressForm'
import { CartDetails } from '../components/Cart/CartDetails'
import { ProductDetails } from '../components/Cart/ProductDetails'
import { ShippingAddress } from '../components/Cart/ShippingAddress'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { setDefaultShippingAddress } from '../app/reducer/shippingAddressSlice'
import { setShippingCharges } from '../app/reducer/shippingChargesSlice'
import { fetchCarts } from '../app/reducer/cartSlice'
import { Helmet } from 'react-helmet';
import { AddressList } from '../components/Cart/AddressList'
import { WaveSpinner } from "react-spinners-kit";

export const Cart = () => {

    const cart = useSelector((state) => state.cart);

    const defaultShipping = useSelector((state) => state.shipping_address);
    const charges = useSelector((state) => state.charges);
    const [cartLength, setCartlength] = useState(0);
    const [shippingAddress, setShippingAddress] = useState('');
    const [billingAddress, setBillingAddress] = useState('');
    const [customerAddress, setCustomerAddress] = useState([]);
    const [shippCharges, setShippCharges] = useState([]);
    const [show, setShow] = useState(false);
    const [showList, setShowList] = useState(false);
    const [paymentLoader, setPaymentLoader] = useState(false);
    const [fromList, setFromList] = useState('');
    const [fromAdd, setFromAdd] = useState('');
    const dispatch = useDispatch();

    const [formLoader, setFormLoader] = useState(false);
    const [addressType, setAddressType] = useState([]);
    const [states, setStates] = useState('');

    let site_info = JSON.parse(window.localStorage.getItem('site_info'));
    const customer = JSON.parse(window.localStorage.getItem('customer'));
    const shipping_address = JSON.parse(window.localStorage.getItem('shipping_address'));

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset
    } = useForm();

    const handleClose = () => {
        document.getElementById('address_form').reset();
        setShow(false)
    };
    const handleShow = (from_type) => {
        setFromAdd(from_type);
        setShow(true);
    }

    const handleListClose = () => {
        setShowList(false)
    };
    const handleListShow = (from_type) => {
        setFromList(from_type)
        setShowList(true);
    };

    async function getAllStates() {
        await axios({
            url: window.API_URL + '/get/states',
            method: 'GET',
        }).then((res) => {

            setStates(res.data);
        }).catch((err) => {
        })
    }

    useEffect(() => {

        if (Array.isArray(cart.cart.carts)) {
            setCartlength(cart.cart.carts.length);
        } else {
            if (cart.cart.carts) {
                setCartlength(Object.keys(cart.cart.carts).length);
            }
        }
        if (window.localStorage.getItem('address') && window.localStorage.getItem('address') != 'undefined') {
            setCustomerAddress(JSON.parse(window.localStorage.getItem('address')));
        }

        if (site_info) {
            setAddressType(site_info.data.address_type);
        }

        if (shipping_address) {
            setShippingAddress(shipping_address);
        }

        if (!states) {

            getAllStates();
        }

    }, [])


    const NumericOnly = (e) => {
        const reg = /^[0-9\b]+$/
        let preval = e.target.value
        if (e.target.value === '' || reg.test(e.target.value)) return true
        else e.target.value = preval.substring(0, (preval.length - 1))
    }

    const onSubmit = (data) => {
        addAddress(data);
    };

    const sameAsBilling = (e) => {

        if (e.target.checked) {
            setShippingAddress(billingAddress);
            localStorage.setItem('shipping_address', JSON.stringify(billingAddress));
            toast.success('Shipping address has been set successfully', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        } else {
            setShippingAddress('');
            localStorage.setItem('shipping_address', JSON.stringify(''));
        }
    }

    const handleSetAddress = (address, from_type) => {

        if (from_type === 'billing') {

            setBillingAddress(address);
            localStorage.setItem('billing_address', JSON.stringify(address));
            toast.success('Billing address has been set successfully', {
                position: toast.POSITION.BOTTOM_RIGHT
            })

        } else {

            setShippingAddress(address);
            dispatch(setDefaultShippingAddress(address));
            localStorage.setItem('shipping_address', JSON.stringify(address));
            toast.success('Shipping address has been set successfully', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            document.getElementById('same_as_billing').checked = false;
        }
        getShippingRocketCharges(address, from_type);
        handleListClose();

    }

    const getShippingRocketCharges = (address, from_type) => {

        const customer = JSON.parse(window.localStorage.getItem('customer'));
        axios({
            url: window.API_URL + '/get/shipping/rocket/charges',
            method: 'POST',
            data: {customer_id:customer.id, address:address, from_type:from_type},
        }).then((res) => {
            console.log(res)
        }).catch((err) => {
        })
        
    }

    async function addAddress(formData) {

        setFormLoader(true);
        axios({
            url: window.API_URL + '/add/customer/address',
            method: 'POST',
            data: formData,
        }).then((res) => {
            setFormLoader(false);
            if (res.data.error == 1) {
                let error_message = res.data.message;
                error_message.forEach(x => toast.error(x, {
                    position: toast.POSITION.BOTTOM_RIGHT
                }));
                reset();
            } else {
                toast.success(res.data.message, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                
                localStorage.setItem('address', JSON.stringify(res.data.customer_address));
                setCustomerAddress(JSON.parse(window.localStorage.getItem('address')));


                if (fromAdd == 'billing') {
                    setBillingAddress(res.data.address_info);
                    localStorage.setItem('billing_address', JSON.stringify(res.data.address_info));
                } else {
                    setShippingAddress(res.data.address_info);
                    dispatch(setDefaultShippingAddress(res.data.address_info));
                    localStorage.setItem('shipping_address', JSON.stringify(res.data.address_info));
                }
                reset();
                handleClose();
            }
        }).catch((err) => {
        })

    }

    const proceedCheckout = () => {

        if (!shippingAddress) {
            toast.error('Please select address to proceed', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            return false;
        }

    }

    async function updateCartAmount(shipping_id) {

        const customer = JSON.parse(window.localStorage.getItem('customer'));
        await axios({
            url: window.API_URL + '/update/cartAmount',
            method: 'POST',
            data: { shipping_id: shipping_id, customer_id: customer.id },
        }).then((res) => {

            localStorage.setItem('cart', JSON.stringify(res.data));
            dispatch(fetchCarts(JSON.parse(window.localStorage.getItem('cart'))))

        }).catch((err) => {

        })
    }

    return (
        <Fragment>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Cart | Musee Musical</title>
                <link rel="canonical" href={window.location.href} />
            </Helmet>
            <section className="shop-carts">
                <div className="container">
                    <div className="row">

                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="common-heads text-center">
                                <h2>Shopping Cart</h2>
                            </div>
                        </div>
                        {
                            cart.cart.carts && cartLength > 0 && JSON.stringify(cart.cart.carts) !== '{}' ?
                                <>
                                    <div className="col-lg-8">
                                        <div className="finalcart-list">

                                            <ProductDetails cart={cart.cart.carts} cart_total={cart.cart.cart_total} />

                                            <div className="shipping-addresss">
                                                <ShippingAddress sameAsBilling={sameAsBilling} billingAddress={billingAddress} handleListShow={handleListShow} handleShow={handleShow} customerAddress={customerAddress} setCustomerAddress={setCustomerAddress} shipping_address={shipping_address} />
                                            </div>
                                        </div>
                                    </div>

                                    <Modal className='cstmzed' show={show} onHide={handleClose}>
                                        {/* <AddressForm customerAddress={customerAddress} setCustomerAddress={setCustomerAddress} handleClose={handleClose} /> */}
                                        <Modal.Header closeButton>
                                            <Modal.Title> ADD NEW {fromAdd.toUpperCase()} ADDRESS </Modal.Title>
                                        </Modal.Header>
                                        <form onSubmit={handleSubmit(onSubmit)} id="address_form">
                                            <Modal.Body>
                                                <div className="modal-body">

                                                    <h4>Contact Details</h4>
                                                    <div className="row">
                                                        <div className="mb-3 col-lg-6">
                                                            <input type="text" className="form-control" {...register("contact_name", { required: "Name is required", maxLength: 50 })} id="contact_name" placeholder="Name" />
                                                            <ErrorMessage errors={errors} name="contact_name" as="p" />
                                                        </div>
                                                        <div className="mb-3 col-lg-6">
                                                            <input type="text" {...register("mobile_no", { required: "Mobile Number is required", minLength: { value: 10, message: "Mobile Number is minimum 10 character" }, maxLength: { value: 10, message: "Mobile Number is maximum 10 character" } })} className="form-control" id="mobile_no" placeholder="Mobile Number" maxLength={10} onChange={NumericOnly} />
                                                            <ErrorMessage errors={errors} name="mobile_no" as="p" />
                                                        </div>
                                                        <input type="hidden" {...register("from_address_type")} value={fromAdd} />
                                                        <input type="hidden" {...register("customer_id", { required: "Customer id is required" })} id="customer_id" value={customer && customer.id} />
                                                        <div className="mb-3 col-lg-6">
                                                            <input className="form-control" type="email" {...register("email", {
                                                                required: "Email is required", pattern: {
                                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                                    message: "Invalid email address"
                                                                }
                                                            })} placeholder="E-mail" />
                                                            <ErrorMessage errors={errors} name="email" as="p" />
                                                        </div>
                                                        <div className="mb-3 col-lg-6">
                                                            <select className="form-control" id="address_type" {...register("address_type", { required: "Address type is required" })} placeholder="Telephone Number">
                                                                <option value="">Address Type</option>
                                                                {
                                                                    addressType && addressType.length > 0 && addressType.map((item) => (
                                                                        <option value={item.id} key={item.id}>{item.name}</option>
                                                                    ))
                                                                }
                                                            </select>
                                                            <ErrorMessage errors={errors} name="address_type" as="p" />
                                                        </div>
                                                    </div>
                                                    <h4>Address</h4>
                                                    <div className="row">

                                                        <div className="mb-3 col-lg-12">
                                                            <input type="text" className="form-control" id="address" {...register("address", { required: "Address is required" })} placeholder="Building Number, Street Name & Locality" />
                                                            <ErrorMessage errors={errors} name="address" as="p" />
                                                        </div>
                                                        <div className="mb-3 col-lg-6">
                                                            <input type="text" className="form-control" id="city" {...register("city", { required: "City is required" })} placeholder="City" />
                                                            <ErrorMessage errors={errors} name="city" as="p" />
                                                        </div>
                                                        <div className="mb-3 col-lg-6">
                                                            <input type="text" className="form-control" {...register("post_code", { required: "Post Code is required", maxLength: { value: 6, message: "Pincode is maximum 6 character" } })} id="post_code" placeholder="Pincode" onChange={NumericOnly} />
                                                            <ErrorMessage errors={errors} name="post_code" as="p" />
                                                        </div>
                                                        <div className="mb-3 col-lg-6">
                                                            <select className="form-control" id="state" {...register("state", { required: "State is required" })} >
                                                                <option value="">SelectState</option>
                                                                {
                                                                    states && states.map((items) => (
                                                                        <option value={items.id} key={items.id}>{items.state_name}</option>
                                                                    ))
                                                                }
                                                            </select>
                                                            <ErrorMessage errors={errors} name="state" as="p" />
                                                        </div>
                                                    </div>
                                                </div>

                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleClose}>
                                                    Cancel
                                                </Button>
                                                <Button type="submit" variant="primary" disabled={formLoader} >
                                                    {formLoader && (
                                                        <span className="spinner-grow spinner-grow-sm"></span>
                                                    )}
                                                    Save Changes
                                                </Button>
                                            </Modal.Footer>
                                        </form>
                                    </Modal>

                                    <AddressList fromList={fromList} handleListClose={handleListClose} showList={showList} customerAddress={customerAddress} handleSetAddress={handleSetAddress} shipping_address={shipping_address} />
                                    <div className="col-lg-4">
                                        <CartDetails billingAddress={billingAddress} setPaymentLoader={setPaymentLoader} cart_total={cart.cart.cart_total} cart_items={cart.cart.carts} shippingAddress={shippingAddress} proceedCheckout={proceedCheckout} shippCharges={cart.cart.shipping_charges} cartInfo={cart.cart} updateCartAmount={updateCartAmount} />
                                    </div>
                                </>
                                :
                                <div className="col-lg-12">
                                    <div className="finalcart-list text-center">
                                        <img src='/assets/images/cart_empty.png' alt="call" className="img-fluid" />
                                        <h3> Your cart is empty. </h3><br />
                                        <div className='load-btn'>
                                            <Link to='/' > Shop today’s deals </Link>
                                        </div>
                                    </div>
                                </div>
                        }

                    </div>
                </div>
                {
                    paymentLoader &&

                    <div id="cart-loader" >
                        <div className='loader-wrapper'>
                            <WaveSpinner
                                size={100}
                                color="#0a1d4a"
                                loading={paymentLoader}

                                style={{ top: '50%', left: '45%' }}

                            />
                        <div className='loader-text'> Payment Processing, Don't try to go back or refresh </div>
                        </div>
                    </div>
                }
            </section>

        </Fragment>
    )
}
