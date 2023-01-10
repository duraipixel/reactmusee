import React, { Fragment, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { addToCart } from '../app/reducer/cartSlice';
import { removeAttemptItem } from '../app/reducer/attemptedCartSlice';
import { loginCustomer } from '../app/reducer/customerSlice';

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
                toast.error( error_message, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                reset();

            } else {

                toast.success('Login Successfull', {
                    position: toast.POSITION.BOTTOM_RIGHT
                });

                if( res.data.customer_data ) {
                    
                    localStorage.setItem('customer', JSON.stringify(res.data.customer_data))
                    // console.log(JSON.parse(window.localStorage.getItem('customer') ), 'from login page')
                    dispatch( loginCustomer( JSON.parse(window.localStorage.getItem('customer')) ) );
                    // setLocalCustomerSession( JSON.parse(window.localStorage.getItem('customer') ) );

                    if( attempt_cart.attempt_cart ) {
                        dispatch( addToCart( attempt_cart.attempt_cart ));
                        dispatch(removeAttemptItem(attempt_cart.attempt_cart))
                    }
                }
                setTimeout(() => {
                    navigate('/');
                }, 300);

            }
            return false;
        }).catch((err) => {

        })
    }

    return (
        <Fragment>
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
                                        <form onSubmit={handleSubmit(onSubmit)}>
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
                                                            <input className="form-control" type="text" {...register("password", { required: "Password is required", maxLength: 20 })} placeholder="Password" />
                                                            <ErrorMessage errors={errors} name="password" as="p" />
                                                        </div>
                                                        <div className="form-data sbm col-lg-12 mb-3">
                                                            <button type='submit' disabled={loginFormLoader} >
                                                                {loginFormLoader && (
                                                                    <span className="spinner-grow spinner-grow-sm"></span>
                                                                )} Sign In
                                                            </button>

                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12 text-center p-0">
                                                        <div className="mid-poart">
                                                            <h5>or</h5>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12 text-center p-0">
                                                        <div className="login-btn">
                                                            <span> Login with <a href=""><img src="/assets/images/google.png" /></a> <a href=""><img src="/assets/images/facebook.png" /></a> </span>
                                                        </div>
                                                    </div>
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
