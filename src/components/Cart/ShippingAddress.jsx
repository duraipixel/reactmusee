import { Button, Checkbox, Radio, RadioGroup, Typography } from '@mui/material';
import { Fragment } from 'react'
import { MdAddLocation } from "react-icons/md";
import { Panel, PanelGroup } from 'rsuite';
import './cart.css';

export const ShippingAddress = ({ handleSetShippingAddress, handleSetBillingAddress, sameAsBilling, handleShow, customerAddress}) => {
    
    const shipping_address = JSON.parse(window.localStorage.getItem('shipping_address'));
    const billing_address = JSON.parse(window.localStorage.getItem('billing_address'));
    const customer = JSON.parse(window.localStorage.getItem('customer'));
   
    
    return (
        <Fragment>
            <h5 className="text-primary d-flex justify-content-between align-items-center mb-3 mt-4 fw-bold text-uppercase">
                Choose Address
                <Button variant="outlined" onClick={() => handleShow()}>
                    <MdAddLocation size={20} className="me-1" />
                    Add Address
                </Button>
            </h5>
            {
                customer?.id && (
                    <>
                        <div className="card mb-3">
                            {shipping_address && 
                            <div className="card-body py-2 d-flex align-items-center">
                                <Checkbox id='same_as_billing' color='secondary' checked={shipping_address == billing_address ? 'checked' : ''} onChange={sameAsBilling} />
                                <Typography variant="span" color='secondary' component="label" htmlFor="same_as_billing">
                                    Set Shipping address same as Billing Address
                                </Typography>
                            </div>
                            }
                        </div>
                        <PanelGroup accordion defaultActiveKey={1} bordered className='bg-white'>
                            <Panel header="Shipping Address" eventKey={1} id="panel1">
                                <RadioGroup className='list-group' value={shipping_address} onChange={handleSetShippingAddress}>
                                    {customerAddress && customerAddress.map((item) => (

                                    <label for={`address_one_${item.id}`} className="list-group-item list-group-item-action d-flex">
                                        <Radio value={item.id} name='shipping_address' id={`address_one_${item.id}`} />
                                        <div className='ps-3'>
                                            <b className="text-capitalize text-primary"> {item.name} </b>
                                            <div>
                                                {item?.email} {item?.mobile_no}
                                                {item.address_line1} {item.state} {item.post_code}
                                            </div>
                                        </div>
                                    </label>
                                    ))}
                                </RadioGroup>
                                
                            </Panel>
                            <Panel header="Billing Address" eventKey={2} id="panel2">
                                <RadioGroup className='list-group' value={billing_address} onChange={handleSetBillingAddress}>
                                {
                                    customerAddress && customerAddress.map((item) => (
                                        <label for={`billing_address_one_${item.id}`} className="list-group-item list-group-item-action d-flex">
                                            <Radio value={item.id} name='billing_address' id={`billing_address_one_${item.id}`} />
                                            <div className='ps-3'>
                                                <b className="text-capitalize text-primary"> {item.name} </b>
                                                <div>
                                                    {item?.email}, {item?.mobile_no}
                                                    {item.address_line1} {item.state} {item.post_code}
                                                </div>
                                            </div>
                                        </label>
                                    ))
                                }
                                </RadioGroup>
                            </Panel>
                        </PanelGroup>
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
