import React from 'react'
import { useParams, Link } from 'react-router-dom';
import './common.css';

export const PaymentResponse = () => {

    const params = useParams();
    
    return (
        <div>
            {
                params.payment_response == 'success' ? 
                <div className='row'>
                    <div className='col-sm-12 text-center'>
                        <div>
                            <img src='/assets/illustrations/sigma-1/3.png' className='payment-success-image' alt='Payment success'></img>
                        </div>
                    </div>
                    <div className='col-sm-12 text-center mt-5'>
                            <h3 className='text-success mb-5'> Payment Success </h3>
                            {/* <button className='mt-3 common-primary-button w-25'>  Track Your Order </button> */}
                            <Link className='mt-8 common-primary-a-tag w-25' to='/profile'> Track Your Order </Link>
                    </div>

                </div>
                :
                <div>
                    <h2> Payment Fail </h2>
                </div>
            }
            
        </div>
    )
}
