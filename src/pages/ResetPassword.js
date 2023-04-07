import { Fragment, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet';
import { ErrorMessage } from '@hookform/error-message';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import './common.css'
import { Button } from 'rsuite';
import { CircularProgress, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


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
        setLoginFormLoader(true)
        axios({
            url: window.API_URL + '/reset/password',
            method: 'POST',
            data: formData,
        }).then((res) => {
            setSendResetPassword(false);
            if (res.data.error == 1) {
                let error_message = res.data.message;
                toast.error(error_message);
                reset();
            } else {
                toast.success('Password reset successfully, Please try login');
                setLoginFormLoader(false)
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
            data: { token_id: token },
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
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loginFormLoader, setLoginFormLoader] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <Fragment>
            <Helmet>
                <title>Reset Password | Musee Musical</title>
                <link rel="canonical" href={window.location.href} />
                <meta name='description' content='reset password page' />
            </Helmet>
            <section className='d-flex align-items-center justify-content-center p-2' style={{
                background: `linear-gradient(rgb(0 0 0 / 46%), rgb(0 0 0 / 67%)), url(${window.AUTH_BG})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                minHeight: '80vh'
            }}>
                {validCustomer && validCustomer.length > 0 ?
                    <div className='card shadow-lg border col-lg-4 col-md-6 col-sm-8 rounded-4'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <CardContent className='p-4'>
                                <Typography gutterBottom variant="h5" component="div" className='mb-4 text-uppercase text-primary fw-bold text-center'>
                                    Reset Password
                                </Typography>
                                <input type="hidden" {...register("customer_id")} value={validCustomer[0].id} />
                                <FormControl fullWidth variant="outlined" className='mb-4'>
                                    <InputLabel error={errors.password ? true : false} htmlFor="outlined-adornment-password">Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        {...register("password", { required: true, maxLength: 20 })}
                                        error={errors.password ? true : false}
                                        label="Password"
                                    />
                                </FormControl>
                                <FormControl fullWidth variant="outlined" className='mb-4'>
                                    <InputLabel error={errors.confirmPassword ? true : false} htmlFor="confirmPassword-adornment-password">Re-Enter Password</InputLabel>
                                    <OutlinedInput
                                        id="confirmPassword-adornment-password"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowConfirmPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        {...register("confirmPassword", {
                                            required: "Confirm Password is required", validate: (val) => {
                                                if (watch('password') != val) {
                                                    return "Your password does not match";
                                                }
                                            },
                                        })}
                                        error={errors.confirmPassword ? true : false}
                                        label="Re-Enter Password"
                                    />
                                </FormControl>
                                <Link to='/forgotpassword' className='text-primary mb-3 mt-2 float-end'> Forgot Password? </Link>
                                <Button type='submit' loading={loginFormLoader} size="lg" className='py-3 btn-dark text-white text-uppercase w-100' >
                                    <i className="bi bi-music-note-beamed me-2"></i>
                                    Sign In
                                </Button>
                                <div className="col-lg-12 text-center mt-3">
                                    <div className="user-regster">
                                        Don't have an account?
                                        <Link to="/register"> Register Here! </Link>
                                    </div>
                                </div>
                            </CardContent>
                        </form>
                    </div>
                    : <div>
                        {
                            checkToken ?
                                <CircularProgress color="light" />
                                :
                                <div className='card card-body text-center'>
                                    <img width={100} className='mx-auto' src='https://cdn-icons-png.flaticon.com/512/6733/6733853.png' />
                                    <b style={{ fontWeight: 900 }} className='text-danger fs-5 my-3'>The Password Reset Link Has Expired.</b>
                                    <Link to="/" className='btn-dark text-white btn'><i className="fa fa-arrow-left me-1 "></i><b>Go to home</b> </Link>
                                </div>
                        }
                    </div>}
            </section>
            {/* <section className="tab-of-sectors lgon-pge">
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
            </section> */}
        </Fragment>
    )
}
