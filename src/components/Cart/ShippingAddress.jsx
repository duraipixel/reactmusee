import { Button, Checkbox, Radio, RadioGroup, Typography } from '@mui/material';
import { Fragment } from 'react'
import { MdAddLocation } from "react-icons/md";
import { Panel, PanelGroup } from 'rsuite';
import './cart.css';

export const ShippingAddress = ({ sameAsBilling, billingAddress, handleListShow, handleShow, customerAddress, setCustomerAddress, shipping_address }) => {
    return (
        <Fragment>
            <h5 className="text-primary d-flex justify-content-between align-items-center mb-3 mt-4 fw-bold text-uppercase">
                Choose Address
                <Button variant="outlined">
                    <MdAddLocation size={20} className="me-1" />
                    Add Address
                </Button>
            </h5>
            <div className="card mb-3">
                <div className="card-body py-2 d-flex align-items-center">
                    <Checkbox id='same_as_billing' color='secondary' />
                    <Typography variant="span" color='secondary' component="label" htmlFor="same_as_billing">
                        Set Shipping address same as Billing Address
                    </Typography>
                </div>
            </div>
            <PanelGroup accordion defaultActiveKey={1} bordered className='bg-white'>
                <Panel header="Shipping Address" eventKey={1} id="panel1">
                    <RadioGroup className='list-group'>
                        <label for="address_one" class="list-group-item list-group-item-action d-flex">
                            <Radio value="radioA" name='shipping_address' id='address_one' />
                            <div className='ps-3'>
                                <b class="text-capitalize text-primary"> aec customer</b>
                                <div>
                                    customer@aecprefab.net, 1234567890
                                    Holt and Harrington LLCÅlesund Tamil nadu 6020
                                </div>
                            </div>
                        </label>
                        <label for="address_two" class="list-group-item list-group-item-action d-flex">
                            <Radio value="radioB" name='shipping_address' id='address_two' />
                            <div className='ps-3'>
                                <b class="text-capitalize text-primary"> Surya</b>
                                <div>
                                    Surya@Surya.net, 1234567890
                                    Holt and Harrington LLCÅlesund Tamil nadu 6020
                                </div>
                            </div>
                        </label>
                    </RadioGroup>
                </Panel>
                <Panel header="Billing Address" eventKey={2} id="panel2">
                    <RadioGroup className='list-group'>
                        <label for="billing_address_one" class="list-group-item list-group-item-action d-flex">
                            <Radio value="radioA" name='billing_address' id='billing_address_one' />
                            <div className='ps-3'>
                                <b class="text-capitalize text-primary"> aec customer</b>
                                <div>
                                    customer@aecprefab.net, 1234567890
                                    Holt and Harrington LLCÅlesund Tamil nadu 6020
                                </div>
                            </div>
                        </label>
                        <label for="billing_address_two" class="list-group-item list-group-item-action d-flex">
                            <Radio value="radioB" name='billing_address' id='billing_address_two' />
                            <div className='ps-3'>
                                <b class="text-capitalize text-primary"> Surya</b>
                                <div>
                                    Surya@Surya.net, 1234567890
                                    Holt and Harrington LLCÅlesund Tamil nadu 6020
                                </div>
                            </div>
                        </label>
                    </RadioGroup>
                </Panel>
            </PanelGroup>
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
