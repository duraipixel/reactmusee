import { Fragment, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { fetchCarts } from '../app/reducer/cartSlice';
import { loginCustomer } from '../app/reducer/customerSlice';
import { fetchAddress } from '../app/reducer/customerAddressSlice';
import { Helmet } from 'react-helmet';
import { useEffect } from 'react';
import { Button } from 'rsuite';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export const Login = () => {
    const dispatch = useDispatch();
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
        dispatch(fetchAddress(address));

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
        const form_data = { ...formData, guest_token: localStorage.getItem('guest_token') || '' }
        setLoginFormLoader(true);
        axios({
            url: window.API_URL + '/login',
            method: 'POST',
            data: form_data,
        }).then((res) => {
            setLoginFormLoader(false);
            if (res.data.error == 1) {

                let error_message = res.data.message;
                toast.error(error_message);
                reset();

            } else {
                toast.success(window.LOGIN_SUCCESS_MSG);
                if (res.data.customer_data) {
                    localStorage.removeItem('guest_token');
                    localStorage.setItem('customer', JSON.stringify(res.data.customer_data))
                    dispatch(loginCustomer(JSON.parse(window.localStorage.getItem('customer'))));
                    localStorage.setItem('address', JSON.stringify(res.data.customer_data.customer_address))
                    fetchCartProducts();
                    setCustomerAddress() 
                    getSiteInformation();
                }
                navigate(-1);
            }
        }).catch((err) => {
        })
    }
    useEffect(() => {
        if (window.localStorage.getItem('customer')) {
            navigate('/');
        }
    }, [])

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <Fragment>
            <Helmet>
                <title>Login | Musee Musical</title>
                <link rel="canonical" href={window.location.href} />
                <meta name='description' content='login page' />
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
                                Login Here!
                            </Typography>
                            <FormControl fullWidth variant="outlined" className='mb-4'>
                                <InputLabel error={errors.email ? true : false} htmlFor="outlined-adornment-email">Email</InputLabel>
                                <OutlinedInput
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
                            <FormControl fullWidth variant="outlined">
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
                                    {...register("password", { required:true, maxLength: 20 })}
                                    error={errors.password ? true : false}
                                    label="Password"
                                />
                            </FormControl>
                            <Link to='/forgotpassword' className='text-primary mb-3 mt-2 float-end'> Forgot Password? </Link>
                            <Button type='submit' loading={loginFormLoader} size="lg" className='py-3 btn-dark text-white text-uppercase w-100' >
                                <i class="bi bi-music-note-beamed me-2"></i>
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
            </section> 
        </Fragment >
    )
}
