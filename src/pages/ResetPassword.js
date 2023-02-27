import { Fragment, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet';
import { ErrorMessage } from '@hookform/error-message';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import './common.css'

export const ResetPassword = () => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset
    } = useForm();

    const [sendResetPassword, setSendResetPassword] = useState(false);
    const [checkToken, setCheckToken] = useState(false);
    const navigate = useNavigate();
    const { token } = useParams();

    const [validCustomer, setValidCustomer] = useState([]);

    const onSubmit = (data) => {
        doResetPassword(data);
    };

    async function doResetPassword(formData) {
        setSendResetPassword(true);
        axios({
            url: window.API_URL + '/reset/password',
            method: 'POST',
            data: formData,
        }).then((res) => {
            setSendResetPassword(false);
            if (res.data.error == 1) {

                let error_message = res.data.message;
                toast.error(error_message, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                reset();

            } else {

                toast.success('Password reset successfully, Please try login', {
                    position: toast.POSITION.BOTTOM_RIGHT
                });

                setTimeout(() => {
                    navigate('/login');
                }, 300);

            }
            return false;
        }).catch((err) => {

        })
    }

    async function checkValidToken(token) {
        setCheckToken(true)
        axios({
            url: window.API_URL + '/check/tokenValid',
            method: 'POST',
            data: {token_id:token},
        }).then((res) => {
            setCheckToken(false)
            if (res.data.error == 1) {
                
            } else {
                setValidCustomer(res.data.data)
                
            }
            return false;
        }).catch((err) => {

        })
    }

    useMemo(() => checkValidToken(token), [token])
    
    return (
        <Fragment>
            <Helmet>
                <title>Reset Password | Musee Musical</title>
                <link rel="canonical" href={window.location.href} />
                <meta name='description' content='reset password page' />
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
                                        {validCustomer && validCustomer.length > 0 ?

                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="frm-fields row clearfix">
                                                <div className="col-lg-12 col-md-12 col-sm-12">
                                                    <div className="common-heading">
                                                        <h2>
                                                            Reset Password
                                                        </h2>
                                                    </div>
                                                    <div className="row">
                                                        <div className="form-data col-lg-12 mb-3">
                                                            <input className="form-control" type="password" {...register("password", { required: "Password is required", maxLength: 20 })} placeholder="Password" />
                                                            <input type="hidden" {...register("customer_id")} value={validCustomer[0].id} />
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
                                                            <button type='submit' disabled={sendResetPassword} >
                                                                {sendResetPassword && (
                                                                    <span className="spinner-grow spinner-grow-sm"></span>
                                                                )} Reset Password
                                                            </button>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                        : 
                                        <div className='token-expired'>
                                            {
                                                checkToken ? 
                                                <div>
                                                    Please wait checking token...
                                                </div>
                                                :
                                                <div>
                                                    Token expired or invalid
                                                </div>
                                            }
                                            
                                        </div>
                                        }
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
