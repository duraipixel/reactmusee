import React from 'react'
import { useParams } from 'react-router-dom';

export const PaymentResponse = () => {

    const params = useParams();
    
    return (
        <div>
            {
                params.payment_response == 'success' ? 
                <div>
                    <h2> Payment Success </h2>

                </div>
                :
                <div>
                    <h2> Payment Fail </h2>
                </div>
            }
            
        </div>
    )
}
