import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './common.css';
import { BsMusicPlayerFill } from "react-icons/bs";

export const PaymentResponse = () => {
    const params = useParams();
    useEffect(() => {
        window.scroll(0, 0)
    }, [])
    if (params.payment_response == 'success') {
        return (
            <div className='success' style={{ minHeight: "90vh", display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <img style={{ position: 'absolute', top: 0, left: 0 }} src={require('../assets/gif/animate.gif')} width="100%" alt="" />
                <div className='container payment-container py-3' style={{ zIndex: 1 }}>
                    <img src={require('../assets/images/music.png')} width="180px" className='mb-4 payment-icon' alt='img' />
                    <h2 className='title-1' style={{ color: "#9C27B0" }}><b>YOUR ORDER HAS BEEN RECEIVED</b></h2>
                    <h3 className='title-2 my-3' style={{ color: "#25ae3a" }}>Thank you for your payment, it’s processing</h3>
                    <p className='mb-4 text-primary'>You will receive an order confirmation email with details of your order and a link to track your process.</p>
                    <Link to="/profile" className='btn-dark text-white btn'>
                        <BsMusicPlayerFill size={20} className='me-2'/>
                        <b>Track Order</b>
                    </Link>
                </div>
            </div>
        )
    }
    return (
        <div style={{ minHeight: "80vh", display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ zIndex: 1 }}>
                <img src="https://cdn-icons-png.flaticon.com/512/7032/7032646.png" width="150px" className='mb-4' alt='img' />
                <h1 className='fw-bold text-danger'>PAYMENT FAILED</h1>
                <p className='mb-4'>There was an error. kindly try again later</p>
                <Link to="/" className='btn-dark text-white btn'><i className="fa fa-arrow-left me-1 "></i><b>Go to home</b> </Link>
            </div>
        </div>
    )
}
