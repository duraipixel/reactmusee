import React, { Fragment, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';

export const Register = () => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset
    } = useForm();

    const navigate = useNavigate();
    const [formLoader, setFormLoader] = useState(false);

    const onSubmit = (data) => {
        registerCustomer(data);
    }; // your form submit function which will invoke after successful validation

    async function registerCustomer(formData) {
        setFormLoader(true);
        axios({
            url: window.API_URL + '/register/customer',
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
                toast.success('Register Successfull, Please try to login', {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                setTimeout(() => {
                    navigate('/login');
                }, 300);

            }
        }).catch((err) => {

        })
    }

    const NumericOnly = (e) => {
        const reg = /^[0-9\b]+$/
        let preval = e.target.value
        if (e.target.value === '' || reg.test(e.target.value)) return true
        else e.target.value = preval.substring(0, (preval.length - 1))
    }

    return (
        <Fragment>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Register | Musee Musical</title>
                <link rel="canonical" href="https://museemusical.shop/register" />
            </Helmet>
            <section className="tab-of-sectors lgon-pge">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-9 col-md-9 col-sm-9">
                            <div className="row fully-bxn g-0">
                                <div className="col-lg-6">
                                    <div className="dhoni-bgm hgt-flx">
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
                                                            Register <span> Here! </span>
                                                        </h2>
                                                    </div>
                                                    <div className="row">
                                                        <div className="form-data col-lg-12 mb-3">
                                                            <input className="form-control" type="text" {...register("firstName", { required: "Name is required", maxLength: 20 })} placeholder="Full Name" />
                                                            <ErrorMessage errors={errors} name="firstName" as="p" />
                                                        </div>
                                                        <div className="form-data col-lg-12 mb-3">
                                                            <input className="form-control" type="email" {...register("email", {
                                                                required: "Email is required", pattern: {
                                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                                    message: "Invalid email address"
                                                                }
                                                            })} placeholder="E-mail" />
                                                            <ErrorMessage errors={errors} name="email" as="p" />
                                                        </div>
                                                        <div className="form-data col-lg-12 mb-3">
                                                            <input type="text" {...register("mobile_no", { required: "Mobile Number is required", minLength: { value: 10, message: "Mobile Number is minimum 10 character" }, maxLength: { value: 10, message: "Mobile Number is maximum 10 character" } })} className="form-control" id="mobile_no" placeholder="Mobile Number" onChange={NumericOnly} />
                                                            <ErrorMessage errors={errors} name="mobile_no" as="p" />
                                                        </div>
                                                        <div className="form-data col-lg-12 mb-3">
                                                            <input className="form-control" type="password" {...register("password", { required: "Password is required", maxLength: 20 })} placeholder="Password" />
                                                            <ErrorMessage errors={errors} name="password" as="p" />
                                                        </div>
                                                        <div className="form-data col-lg-12 mb-3">
                                                            <input className="form-control" type="password" {...register("confirmPassword", {
                                                                required: "Confirm Password is required", validate: (val) => {
                                                                    if (watch('password') != val) {
                                                                        return "Your password does not match";
                                                                    }
                                                                },
                                                            })} placeholder="Re-Enter Password" />
                                                            <ErrorMessage errors={errors} name="confirmPassword" as="p" />
                                                        </div>
                                                        <div className="form-data sbm col-lg-12 mb-3">
                                                            {/* <input type="submit" name="submit" value="Sign Up" /> */}
                                                            <button type='submit' disabled={formLoader} >
                                                                {formLoader && (
                                                                    <span className="spinner-grow spinner-grow-sm"></span>
                                                                )} Sign Up
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
                                                            Already have an account?
                                                            <Link to="/login"> Login Here! </Link>
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
