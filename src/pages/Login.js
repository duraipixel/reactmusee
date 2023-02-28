import { Fragment, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { fetchCarts } from '../app/reducer/cartSlice';
import { removeAttemptItem } from '../app/reducer/attemptedCartSlice';
import { loginCustomer } from '../app/reducer/customerSlice';
import { fetchAddress } from '../app/reducer/customerAddressSlice';
import { Helmet } from 'react-helmet';
import { useEffect } from 'react';

export const Login = () => {

    const attempt_cart = useSelector((state) => state.attempt_cart);
    const dispatch = useDispatch();

    // const [localCustomerSession, setLocalCustomerSession] = useState(JSON.parse(window.localStorage.getItem('customer') || null));
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset
    } = useForm();

    const navigate = useNavigate();
    const [loginFormLoader, setLoginFormLoader] = useState(false);

    const onSubmit = (data) => {
        doLoginCustomer(data);
    };

    async function fetchCartProducts() {

        let customer = JSON.parse(window.localStorage.getItem('customer'));

        await axios({
            url: window.API_URL + '/get/cart',
            method: 'POST',
            data: { customer_id: customer.id },
        }).then((res) => {

            localStorage.setItem('cart', JSON.stringify(res.data));
            dispatch(fetchCarts(JSON.parse(window.localStorage.getItem('cart'))))

        }).catch((err) => {

        })
    }

    const setCustomerAddress = () => {

        let address = JSON.parse(window.localStorage.getItem('addres'));                    
        dispatch(fetchAddress(address ));
          
    }

    async function addCartProduct(item) {

        let customer = JSON.parse(window.localStorage.getItem('customer'));
        const res_data = { ...item, customer_id: customer.id, quantity: 1 };

        await axios({
            url: window.API_URL + '/add/cart',
            method: 'POST',
            data: res_data,
        }).then((res) => {

            localStorage.setItem('cart', JSON.stringify(res.data));
            dispatch(fetchCarts(JSON.parse(window.localStorage.getItem('cart'))))

        }).catch((err) => {

        })
    }

    async function getSiteInformation() {
        await axios({
            url: window.API_URL + '/get/site/info',
            method: 'GET',
        }).then((res) => {
            localStorage.setItem('site_info', JSON.stringify(res.data));
        }).catch((err) => {

        })
    }

    async function doLoginCustomer(formData) {
        setLoginFormLoader(true);
        axios({
            url: window.API_URL + '/login',
            method: 'POST',
            data: formData,
        }).then((res) => {
            setLoginFormLoader(false);
            if (res.data.error == 1) {

                let error_message = res.data.message;
                toast.error(error_message, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                reset();

            } else {

                toast.success( window.LOGIN_SUCCESS_MSG, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });

                if (res.data.customer_data) {

                    localStorage.setItem('customer', JSON.stringify(res.data.customer_data))

                    dispatch(loginCustomer(JSON.parse(window.localStorage.getItem('customer'))));
                 
                    localStorage.setItem('address', JSON.stringify(res.data.customer_data.customer_address))               
                   
                    fetchCartProducts();
                    setCustomerAddress()
                    // console.log('attempt_cart');
                    // if (attempt_cart.attempt_cart.length > 0) {
                    //     console.log('attempt_cart inner loop');
                    //     addCartProduct(attempt_cart.attempt_cart);
                    //     dispatch(removeAttemptItem(attempt_cart.attempt_cart))
                    // }
                    // console.log('attempt_cart ouerside loop');

                    getSiteInformation();
                }
                console.log('pofile');
                navigate('/profile');

            }
            
        }).catch((err) => {

        })
    }

    useEffect(() => {
      if ( window.localStorage.getItem('customer') ) {
        navigate('/');
      }
    }, [])
    

    return (
        <Fragment>
            <Helmet>
                <title>Login | Musee Musical</title>
                <link rel="canonical" href={window.location.href} />
                <meta name='description' content='login page'/>
            </Helmet>
            <section className="tab-of-sectors lgon-pge">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-9 col-md-9 col-sm-9">
                            <div className="row fully-bxn g-0">
                                <div className="col-lg-6">
                                    <div className="dhoni-bgm">
                                        <div className="common-heading">
                                            <h2>
                                                Welcome to<br /> <span>Musee Musical</span>
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="cir-frm">
                                        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                                            <div className="frm-fields row clearfix">
                                                <div className="col-lg-12 col-md-12 col-sm-12">
                                                    <div className="common-heading">
                                                        <h2>
                                                            Login <span> Here! </span>
                                                        </h2>
                                                    </div>
                                                    <div className="row">
                                                        <div className="form-data col-lg-12 mb-3">
                                                            <input className="form-control" type="text" {...register("email", {
                                                                required: "Email is required", pattern: {
                                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                                    message: "Invalid email address"
                                                                }
                                                            })} placeholder="Email" />
                                                            <ErrorMessage errors={errors} name="email" as="p" />
                                                        </div>
                                                        <div className="form-data col-lg-12 mb-3">
                                                            <input className="form-control" type="password" {...register("password", { required: "Password is required", maxLength: 20 })} placeholder="Password" />
                                                            <ErrorMessage errors={errors} name="password" as="p" />
                                                        </div>
                                                        <div className='mb-3 text-end user-register'>
                                                            <Link to='/forgotpassword' style={{ color: '#212363', fontWeight: '800' }}> Forgot Password? </Link>
                                                        </div>
                                                        <div className="form-data sbm col-lg-12 mb-3">
                                                            <button type='submit' disabled={loginFormLoader} >
                                                                {loginFormLoader && (
                                                                    <span className="spinner-grow spinner-grow-sm"></span>
                                                                )} Sign In
                                                            </button>

                                                        </div>
                                                    </div>
                                                    {/* <div className="col-lg-12 text-center p-0">
                                                        <div className="mid-poart">
                                                            <h5>or</h5>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12 text-center p-0">
                                                        <div className="login-btn">
                                                            <span> Login with <a href=""><img src="/assets/images/google.png" /></a> <a href=""><img src="/assets/images/facebook.png" /></a> </span>
                                                        </div>
                                                    </div> */}
                                                    <div className="col-lg-12 text-center mt-3">
                                                        <div className="user-regster">
                                                            Don't have an account?
                                                            <Link to="/register"> Register Here! </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}
