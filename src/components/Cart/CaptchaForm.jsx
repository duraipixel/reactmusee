import React from 'react'
import Backdrop from '@mui/material/Backdrop';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from "axios";
import { Button, Card, CardContent, TextField } from "@mui/material";
import { useState } from 'react';
import { useEffect } from 'react';
import { setCartCount } from '../../app/reducer/cartCountSlice';
import { clearCart } from '../../app/reducer/cartSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';



const CaptchaForm = (props) => {

    const [formLoader, setFormLoader] = useState(false);
    const [captchaText, setCaptchaText] = useState('');
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const refreshCaptcha = () => {
        let text = Math.random().toString(36).slice(2);
        let short_text = text.substring(0, 4);
        setCaptchaText(short_text);
    }
    const closeCaptcha = () => {

        document.getElementById('captcha_form').reset();
        props.setShowCaptcha(false);
        props.setCodFormloading(false);
    }

    useEffect(() => {
        refreshCaptcha();
    }, [])

    async function checkCaptcha(formData) {

        if (formData.name == captchaText) {
            console.log('matched');
            const customer = JSON.parse(window.localStorage.getItem('customer'));
            if (!customer?.id) {
                toast.error('Please Login to Checkout');
                setTimeout(() => {
                    navigate('/login')
                }, 300);
                return false;
            }

            const shipping_address = localStorage.getItem('shipping_address');
            const shiprocket_charges = localStorage.getItem('shiprocket_charges') ? JSON.parse(localStorage.getItem('shiprocket_charges')) : []

            toast.success('Captcha Verified', 'Success');
            props.setShowCaptcha(false);
            props.setPaymentLoader(true);
            axios({
                url: window.API_URL + '/proceed/cod',
                method: 'POST',
                data: { customer_id: customer.id, shipping_address: shipping_address, shiprocket_charges: shiprocket_charges, billing_address: props.billingAddress, cart_total: props.cart_total, cart_items: props.cart_items, selected_shipping_fees: props.cartInfo.selected_shipping_fees },
            }).then((response) => {
               
                props.setCodFormloading(false);
                props.setPaymentLoader(false);
                if (response.data.success) {
                    localStorage.removeItem('shipping_address');
                    localStorage.removeItem('cart');
                    localStorage.removeItem('shiprocket_charges');
                    localStorage.removeItem('cart_coupon')
                    dispatch(setCartCount(0));
                    dispatch(clearCart());
                    toast.success(response.data.message);
                    navigate('/thankyou/success');
                } else {
                    toast.error(response.data.message);
                    // navigate('/thankyou/fail');
                }                

            });

        } else {
            toast.error('Invalid Captcha Text', 'Error');
        }
        return false;

    }

    return (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={props.showCaptcha}>
            <Card variant="outlined" className="col-md-5 m-2 position-relative">
                <form onSubmit={handleSubmit(checkCaptcha)} id="captcha_form">
                    <div className="p-4 bg-light text-end">
                        <h5 className="text-center text-primary">Verify Captcha</h5>
                    </div>
                    <CardContent>
                        <div className="row">
                            <div className="col-sm-12 mt-4">
                                <Card className='p-3 fs-3 fw-bold text-center captcha-view-text'>
                                    {captchaText}
                                </Card>
                            </div>
                            <div className="col-lg-3 text-end">

                            </div>
                            <div className="col-sm-12 col-md-12 col-lg-6 mt-3 d-flex text-center">
                                <div>

                                    <button className='btn btn-dark mt-3' type='button' onClick={refreshCaptcha}>
                                        <i className='fa fa-refresh'></i>
                                    </button>
                                </div>
                                <div className='w-100'>

                                    <TextField
                                        size="small"
                                        label="Enter above Captcha"
                                        type="text"
                                        className="w-100 mb-4 mt-3"
                                        error={errors.name ? true : false}
                                        {...register("name", { required: true, maxLength: 50 })}
                                    />
                                </div>
                            </div>
                        </div>

                    </CardContent>
                    <div className="p-3 bg-light text-end">
                        <Button variant="outlined" onClick={() => closeCaptcha()} >
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" className="float-end ms-2" disabled={formLoader} >
                            {formLoader ? <span className="spinner-grow spinner-grow-sm me-1"></span>
                                : <span className="bi bi-repeat me-1"></span>} Verify & Continue
                        </Button>
                    </div>
                </form>
            </Card>
        </Backdrop>
    )
}

export default CaptchaForm