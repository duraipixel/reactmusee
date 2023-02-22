import React, { Fragment } from 'react'
import './cart.css';

export const ShippingAddress = ({ sameAsBilling, billingAddress, handleListShow, handleShow, customerAddress, setCustomerAddress, shipping_address }) => {

    return (
        <Fragment>

            <div className="ship-list">
                <h3>Set Biling and Shipping Address</h3>

                <div className="line-spacer"></div>
                <div className='address-list-panel'>
                    <div style={{ padding: '19px', width: '50%' }} >
                        <div className='address-title-pane'>
                            <div style={{ width: '100%' }}>
                                <p className='m-font'>Billing Address:</p>
                            </div>

                        </div>
                        <div className='m-flex'>
                            <div className="load-btn">
                                <a onClick={() => handleShow('billing')} >
                                    Add New
                                </a>

                                <button className='btn-address btn-address-billing' onClick={() => handleListShow('billing')}> Other </button>
                            </div>
                        </div>

                        <div className='address-data-pane'>
                            {

                                billingAddress ?
                                    <div>
                                        <div>{billingAddress.name}</div>
                                        <div>{billingAddress.email} {billingAddress.mobile_no}</div>
                                        <div>{billingAddress.address_line1}</div>
                                    </div>
                                    :
                                    <div>
                                        <div>
                                            Please select billing address
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>
                    <div style={{ padding: '19px', width: '50%' }} >
                        <div className='address-title-pane'>
                            <div style={{ width: '100%' }}>
                                <p className='m-font '>Shipping Address:</p>
                            </div>

                        </div>
                        <div className='m-flex'>
                            <div className="load-btn">
                                <a onClick={() => handleShow('shipping')} >
                                    Add New
                                </a>

                                <button className='btn-address btn-address-shipping' onClick={() => handleListShow('shipping')}> Other </button>
                            </div>
                        </div>
                        <div className='address-data-pane'>
                            {
                                shipping_address ?
                                    <div>
                                        <div>{shipping_address.name}</div>
                                        <div>{shipping_address.email} {shipping_address.mobile_no}</div>
                                        <div>{shipping_address.address_line1}</div>
                                    </div>
                                    :
                                    <div>
                                        <div>Please select shipping address</div>
                                    </div>
                            }

                        </div>
                    </div>
                </div>
                {
                    billingAddress &&
                    <div className='p-3'>
                        <input type="checkbox" id='same_as_billing' name='same_as_billing' onChange={(e) => sameAsBilling(e)} value='yes' className='mx-2' />
                        <label htmlFor="same_as_billing">Set Shipping address same as Billing Address</label>
                    </div>
                }

            </div>
        </Fragment>
    )
}
