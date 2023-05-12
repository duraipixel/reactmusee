import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, useOutletContext, useNavigate } from 'react-router-dom';
import { loginCustomer } from '../../app/reducer/customerSlice';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

export const VerifyAccount = () => {
    const [verify, setVerify] = useState(false);
    const [isPageLoaded, setIsPageLoaded] = useOutletContext();
    const { token } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const doVerifyAccount = () => {
        axios({
            url: window.API_URL + '/verify/account',
            method: 'POST',
            data: { token:token },
        }).then((res) => {

            if (res.data.error == 1) {
                setTimeout(() => {
                    setIsPageLoaded(false)
                }, 500);
                toast.error(res.data.message);
                navigate('/register')
            } else {
                
                setTimeout(() => {
                    setIsPageLoaded(false)
                }, 500);
                 if (res.data.customer) {

                    localStorage.setItem('customer', JSON.stringify(res.data.customer))
                    dispatch(loginCustomer(JSON.parse(window.localStorage.getItem('customer'))));
                    
                    localStorage.setItem('address', JSON.stringify(res.data.customer.customer_address))
                    toast.success(res.data.message);
                }

                navigate('/', {state:{verification_message: res.data.message}});
            }
        }).catch((err) => {
        })
    }

    useEffect(() => {
        setIsPageLoaded(true);
        doVerifyAccount();      
    }, [])
    
    // console.log( token, 'token' );
  return (
    <div></div>
  )
}
