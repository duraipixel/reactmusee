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

export const Cart = () => {
    
    const cart = useSelector((state) => state.cart);
    const defaultShipping = useSelector((state) => state.shipping_address);
    const [cartLength, setCartlength] = useState(0);
    const [shippingAddress, setShippingAddress] = useState('');
    const [customerId, setCustomerId] = useState('');
    const [customerAddress, setCustomerAddress] = useState([]);
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();

    const [formLoader, setFormLoader] = useState(false);
    const [addressType, setAddressType] = useState([]);

    let site_info = JSON.parse(window.localStorage.getItem('site_info'));
    const customer = JSON.parse(window.localStorage.getItem('customer'));
    const shipping_address = JSON.parse(window.localStorage.getItem('shipping_address'));
    console.log( shipping_address, 'shipping_address');
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
    const handleShow = () => setShow(true);    

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
        setCustomerId(customer.id);
        // dispatch(setDefaultShippingAddress(shippingAddress));
        if( shipping_address ) {
            setShippingAddress(shipping_address);    
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

    const handleDeleteAddress = () => {
        if( !shippingAddress ) {
            toast.error('Please select address to delete', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        }
    }

    const handleSetShippingAddress = (address) => {
        setShippingAddress(address);
        dispatch(setDefaultShippingAddress(address));
        localStorage.setItem('shipping_address', JSON.stringify(address));
        toast.success('Shipping address has been set successfully', {
            position: toast.POSITION.BOTTOM_RIGHT
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
                handleClose();
            }
        }).catch((err) => {
        })
    }

    const proceedCheckout = () => {
        if( !shippingAddress ) {
            toast.error('Please select address to proceed', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            return false;
        }
    }

    console.log(cart, 'cart');

    return (
        <Fragment>
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
                                                <h4>Select Shipping Address</h4>
                                                <div className="">
                                                    <div className="load-btn">
                                                        <a onClick={() => handleShow ()} >
                                                            Add New Address
                                                        </a>
                                                    </div>

                                                    <div className="load-btn del-btn">
                                                        <a onClick={() => handleDeleteAddress()} className="show-brands">
                                                            Delete Address
                                                        </a>
                                                    </div>
                                                </div>
                                                <ShippingAddress customerAddress={customerAddress} setCustomerAddress={setCustomerAddress} shipping_address={shipping_address} handleSetShippingAddress={handleSetShippingAddress} />
                                            </div>
                                        </div>
                                    </div>

                                    <Modal show={show} onHide={handleClose}>
                                        {/* <AddressForm customerAddress={customerAddress} setCustomerAddress={setCustomerAddress} handleClose={handleClose} /> */}
                                        <Modal.Header closeButton>
                                            <Modal.Title>Add a New Shipping Address</Modal.Title>
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
                                                        <input type="hidden" {...register("customer_id", { required: "Customer id is required"})} id="customer_id" value={customer.id} />
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
                                                                        <option value={item.id}>{item.name}</option>
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
                                                                <option value="Andhra Pradesh">Andhra Pradesh</option>
                                                                <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                                                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                                                <option value="Assam">Assam</option>
                                                                <option value="Bihar">Bihar</option>
                                                                <option value="Chandigarh">Chandigarh</option>
                                                                <option value="Chhattisgarh">Chhattisgarh</option>
                                                                <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
                                                                <option value="Daman and Diu">Daman and Diu</option>
                                                                <option value="Delhi">Delhi</option>
                                                                <option value="Lakshadweep">Lakshadweep</option>
                                                                <option value="Puducherry">Puducherry</option>
                                                                <option value="Goa">Goa</option>
                                                                <option value="Gujarat">Gujarat</option>
                                                                <option value="Haryana">Haryana</option>
                                                                <option value="Himachal Pradesh">Himachal Pradesh</option>
                                                                <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                                                <option value="Jharkhand">Jharkhand</option>
                                                                <option value="Karnataka">Karnataka</option>
                                                                <option value="Kerala">Kerala</option>
                                                                <option value="Madhya Pradesh">Madhya Pradesh</option>
                                                                <option value="Maharashtra">Maharashtra</option>
                                                                <option value="Manipur">Manipur</option>
                                                                <option value="Meghalaya">Meghalaya</option>
                                                                <option value="Mizoram">Mizoram</option>
                                                                <option value="Nagaland">Nagaland</option>
                                                                <option value="Odisha">Odisha</option>
                                                                <option value="Punjab">Punjab</option>
                                                                <option value="Rajasthan">Rajasthan</option>
                                                                <option value="Sikkim">Sikkim</option>
                                                                <option value="Tamil Nadu">Tamil Nadu</option>
                                                                <option value="Telangana">Telangana</option>
                                                                <option value="Tripura">Tripura</option>
                                                                <option value="Uttar Pradesh">Uttar Pradesh</option>
                                                                <option value="Uttarakhand">Uttarakhand</option>
                                                                <option value="West Bengal">West Bengal</option>
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

                                    <div className="col-lg-4">
                                        <CartDetails cart_total={cart.cart.cart_total} shippingAddress={shippingAddress} proceedCheckout={proceedCheckout} />
                                    </div>
                                </>
                                :
                                <div className="col-lg-12">
                                    <div className="finalcart-list text-center">
                                        <h3> Your cart is empty. </h3>
                                        <Link to='/' > Go to Purchase </Link>
                                    </div>
                                </div>
                        }

                    </div>
                </div>
            </section>
        </Fragment>
    )
}
