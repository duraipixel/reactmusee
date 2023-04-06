import { Button } from '@mui/material'
import React from 'react'
import {  useNavigate } from 'react-router-dom'

function EmptyCart() {
    const navigate = useNavigate();

    return (
        <div className="jumbotron text-gray py-3" >
            <div className='container  p-4'>
                <div className='row m-0 align-items-center'>
                    <div className='col-md-10'>
                        <h2 className='text-primary'>Your cart</h2>
                        <p className='mb-3'>is empty, A few clicks is all it takes.</p>
                        <Button variant="outlined" className='btn-dark' color='light' onClick={() => navigate('/')} role="button"> <i className="bi bi-music-note-beamed me-2 fs-5"></i> Shop now </Button>
                    </div>
                    <div className='col-md-2 text-center'>
                        <div>
                            <img src={require('../assets/images/empty-cart.png')} alt="empty-cart" width={180} />
                            <div>
                                <b className='h5 text-uppercase'> Cart is empty!. </b>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmptyCart