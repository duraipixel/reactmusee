import axios from 'axios';
import React from 'react'
import { Fragment, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { ErrorMessage } from '@hookform/error-message'
import { Link, useNavigate } from 'react-router-dom';

export const ForgotPassword = () => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset
    } = useForm();

    const [sendPasswordLink, setSendPasswordLink] = useState(false);
    const navigate = useNavigate();

    const onSubmit = (data) => {
        doSendPasswordLink(data);
    };

    async function doSendPasswordLink(formData) {
        setSendPasswordLink(true);
        axios({
            url: window.API_URL + '/send/password/link',
            method: 'POST',
            data: formData,
        }).then((res) => {
            setSendPasswordLink(false);
            if (res.data.error == 1) {

                let error_message = res.data.message;
                toast.error(error_message);
                reset();

            } else {

                toast.success('Reset Password link sent to your mail Successfull');

                setTimeout(() => {
                    navigate('/login');
                }, 300);

            }
            return false;
        }).catch((err) => {

        })
    }

    return (
        <Fragment>
            <Helmet>
                <title>Forgot Password | Musee Musical</title>
                <link rel="canonical" href={window.location.href} />
                <meta name='description' content='forgot password page'/>
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
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="frm-fields row clearfix">
                                                <div className="col-lg-12 col-md-12 col-sm-12">
                                                    <div className="common-heading">
                                                        <h2>
                                                            Forgot Password 
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
                                                        
                                                        <div className="form-data sbm col-lg-12 mb-3">
                                                            <button type='submit' disabled={sendPasswordLink} >
                                                                {sendPasswordLink && (
                                                                    <span className="spinner-grow spinner-grow-sm"></span>
                                                                )} Send Password Link
                                                            </button>

                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12 text-center p-0">
                                                        <div className="mid-poart">
                                                            <h5>or</h5>
                                                        </div>
                                                    </div>
                                                   
                                                    <div className="col-lg-12 text-center mt-3">
                                                        <div className="user-regster">
                                                            Having credentials?
                                                            <Link to="/login"> Login Here! </Link>
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
