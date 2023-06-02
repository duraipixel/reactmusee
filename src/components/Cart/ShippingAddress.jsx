import { Button, Checkbox, Collapse, Radio, RadioGroup, Typography } from '@mui/material';
import { Fragment, useMemo, useState } from 'react'
import { MdAddLocation } from "react-icons/md";
import { Panel, PanelGroup } from 'rsuite';
import './cart.css';
import { useEffect } from 'react';

export const ShippingAddress = ({ handleSetShippingAddress, handleSetBillingAddress, sameAsBilling, handleShow, customerAddress }) => {

    const shipping_address = window.localStorage.getItem('shipping_address');
    const billing_address = window.localStorage.getItem('billing_address');
    const customer = JSON.parse(window.localStorage.getItem('customer'));

    const [address, setAddress] = useState(customerAddress)
    const [billAddress, setBillAddress] = useState(customerAddress)
    const [shppingToggle, setshppingToggle] = useState(false)
    const [billToggle, setBillToggle] = useState(false)

    const toggleAddress = (type) => {
        if (type == 'ADD_ONE') {
            setAddress(customerAddress.slice(0, address.length == 2 ? 1000 : 2))
            setshppingToggle(!shppingToggle)
        }
        if (type == 'ADD_TWO') {
            // let newbillAddress = billAddress;
            setBillAddress(customerAddress.slice(0, billAddress.length == 2 ? 1000 : 2))
            setBillToggle(!billToggle)
        }
    }

    useEffect(() => {
        setAddress(customerAddress.slice(0, 2))
        setBillAddress(customerAddress.slice(0, 2))
    }, [customerAddress])


    return (
        <Fragment>
            <h5 className="text-primary d-flex justify-content-between align-items-center mb-3 mt-4 fw-bold text-uppercase">
                Choose Address
                <Button variant="contained" color='dark' className='text-white' size='small' onClick={() => handleShow()}>
                    <MdAddLocation size={20} className="me-1" />
                    CREATE
                </Button>
            </h5>
            { 
                customer?.id && (
                    <> 
                        <div className="row">
                            <div className="col-md-6 ">
                                <b className='mb-2 d-block'>Shipping Address</b>
                                <RadioGroup className='list-group mb-3' value={shipping_address} onChange={handleSetShippingAddress}>
                                    {address && address.length > 0 && address.map((item) => (
                                        <label htmlFor={`address_one_${item.id}`} key={item.id} className="list-group-item list-group-item-action d-flex">
                                            <Radio value={item.id} name='shipping_address' id={`address_one_${item.id}`} />
                                            <div className='ps-3'>
                                                <b className="text-capitalize text-primary"> {item.name} </b>
                                                <div>
                                                    <span>{item.address_line1}, {item.state}, <b>{item.post_code}</b></span>
                                                </div>
                                            </div>
                                        </label>
                                    ))}
                                    {customerAddress && customerAddress.length > 2 && <div className="cursor list-group-item list-group-item-action text-center bg-light text-secondary fw-normal" onClick={() => toggleAddress('ADD_ONE')}>
                                        {shppingToggle ? 'Show less' : 'Show more'}
                                        <i className={`ms-1 bi ${shppingToggle ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
                                    </div>}
                                </RadioGroup>
                            </div>
                            <div className="col-md-6">
                                <b className='mb-2 d-block'>Billing Address</b>
                                <RadioGroup className='list-group' value={billing_address} onChange={handleSetBillingAddress}>
                                    {
                                        billAddress && billAddress.map((item) => (
                                            <label htmlFor={`billing_address_one_${item.id}`} key={item.id} className="list-group-item list-group-item-action d-flex">
                                                <Radio value={item.id} name='billing_address' id={`billing_address_one_${item.id}`} />
                                                <div className='ps-3'>
                                                    <b className="text-capitalize text-primary"> {item.name} </b>
                                                    <div>
                                                        <span>{item.address_line1}, {item.state}, <b>{item.post_code}</b></span>
                                                    </div>
                                                </div>
                                            </label>
                                        ))
                                    }
                                    {customerAddress && customerAddress.length > 2 && <div className="cursor list-group-item list-group-item-action text-center bg-light text-secondary fw-normal" onClick={() => toggleAddress('ADD_TWO')}>
                                        {billToggle ? 'Show less' : 'Show more'}
                                        <i className={`ms-1 bi ${billToggle ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
                                    </div>}
                                </RadioGroup>
                            </div>
                        </div>
                        <div className="card mt-3">
                            {shipping_address &&
                                <div className="card-body py-2 d-flex align-items-center">
                                    <Checkbox id='same_as_billing' color='secondary' checked={shipping_address == billing_address ? 'checked' : ''} onChange={sameAsBilling} />
                                    <Typography variant="span" color='secondary' component="label" htmlFor="same_as_billing">
                                        Set Shipping address same as Billing Address
                                    </Typography>
                                </div>
                            }
                        </div>
                    </>
                )
            }
            {/* <div className="ship-list">
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

                                <button className='btn-address btn-address-billing' onClick={() => handleListShow('billing')}> Select </button>
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

                                <button className='btn-address btn-address-shipping' onClick={() => handleListShow('shipping')}> Select </button>
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

            </div> */}
        </Fragment>
    )
}
