import { Fragment, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import { loginCustomer } from '../app/reducer/customerSlice';
import { useEffect } from 'react';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button } from 'rsuite';

export const Register = () => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset
    } = useForm();

    const dispatch = useDispatch();

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
                console.log(error_message);
                error_message.forEach(x => toast.error(x));
                reset();
            } else {
                toast.success(res.data.message);
                setTimeout(() => {
                    reset();
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

    useEffect(() => {
        if (window.localStorage.getItem('customer')) {
            navigate('/');
        }
    }, [])

    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowCPassword = () => setShowCPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleMouseDownCPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Fragment>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Register | Musee Musical</title>
                <link rel="canonical" href={window.location.href} />
            </Helmet>
            <section className='d-flex align-items-center justify-content-center p-2' style={{
                background: `linear-gradient(rgb(0 0 0 / 46%), rgb(0 0 0 / 67%)), url(${window.AUTH_BG})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                minHeight: '80vh'
            }}>
                <div className='card shadow-lg border col-lg-4 col-md-6 col-sm-8 rounded-4'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <CardContent className='p-4'>
                            <Typography gutterBottom variant="h5" component="div" className='mb-4 text-uppercase text-primary fw-bold text-center'>
                                Register Here!
                            </Typography>
                            <FormControl fullWidth variant="outlined" className='mb-4'>
                                <InputLabel size='small' error={errors.firstName ? true : false} htmlFor="outlined-adornment-firstName">Name</InputLabel>
                                <OutlinedInput
                                    size='small'
                                    id="outlined-adornment-firstName"
                                    type='text'
                                    label="Name"
                                    error={errors.firstName ? true : false}
                                    {...register("firstName", { required: "Name is required", maxLength: 20 })}
                                />
                            </FormControl>
                            <FormControl fullWidth variant="outlined" className='mb-4'>
                                <InputLabel size='small' error={errors.email ? true : false} htmlFor="outlined-adornment-email">Email</InputLabel>
                                <OutlinedInput
                                    size='small'
                                    id="outlined-adornment-email"
                                    type='email'
                                    label="Email"
                                    error={errors.email ? true : false}
                                    {...register("email", {
                                        required: true, pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address"
                                        }
                                    })}
                                />
                            </FormControl>
                            <FormControl fullWidth variant="outlined" className='mb-4'>
                                <InputLabel size='small' error={errors.mobile_no ? true : false} htmlFor="outlined-adornment-mobile">Mobile</InputLabel>
                                <OutlinedInput
                                    size='small'
                                    id="outlined-adornment-mobile"
                                    type='number'
                                    label="mobile"
                                    error={errors.mobile_no ? true : false}
                                    onChange={NumericOnly}
                                    {...register("mobile_no", { required: "Mobile Number is required", minLength: { value: 10, message: "Mobile Number is minimum 10 character" }, maxLength: { value: 10, message: "Mobile Number is maximum 10 character" } })}
                                />
                            </FormControl>

                            <FormControl fullWidth variant="outlined" className='mb-4'>
                                <InputLabel size='small' error={errors.password ? true : false} htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    size='small'
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
                            <FormControl fullWidth variant="outlined">
                                <InputLabel size='small' error={errors.confirmPassword ? true : false} htmlFor="outlined-adornment-cpassword">Re-Enter Password</InputLabel>
                                <OutlinedInput
                                    size='small'
                                    id="outlined-adornment-cpassword"
                                    type={showCPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowCPassword}
                                                onMouseDown={handleMouseDownCPassword}
                                                edge="end"
                                            >
                                                {showCPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    {...register("confirmPassword", {
                                        required: true, validate: (val) => {
                                            if (watch('password') != val) {
                                                return "Your password does not match";
                                            }
                                        },
                                    })}
                                    error={errors.confirmPassword ? true : false}
                                    label="Re-Enter Password"
                                />
                            </FormControl>
                            <Button type='submit' loading={formLoader} size="lg" className='mt-4 btn-dark text-white text-uppercase w-100' >
                                <i className="bi bi-music-note-beamed me-2"></i>
                                Sign Up
                            </Button>
                            <div className="col-lg-12 text-center mt-3">
                                <div className="user-regster">
                                    Already have an account?
                                    <Link to="/login"> Login Here! </Link>
                                </div>
                            </div>
                        </CardContent>
                    </form>
                </div>
            </section>
            {/* <section className="tab-of-sectors lgon-pge">
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
                                        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
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
                                                            <button type='submit' disabled={formLoader} >
                                                                {formLoader && (
                                                                    <span className="spinner-grow spinner-grow-sm"></span>
                                                                )} Sign Up
                                                            </button>
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
            </section> */}
        </Fragment>
    )
}
