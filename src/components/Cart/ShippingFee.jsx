import { Fragment } from 'react'

export const ShippingFee = ({ shippCharges, updateCartAmount, cartInfo, flatCharge }) => {

    const shiprocket_charges = localStorage.getItem('shiprocket_charges') ? JSON.parse(localStorage.getItem('shiprocket_charges')) : [];
    console.log(flatCharge, 'flat_charge');

    return (
        <Fragment>
            {
                cartInfo.shipping_charges && (
                    <Fragment>
                        <div className='lead fs-6 my-2 text-primary'>Select Shipping Speed</div>
                        <ul className="list-group customRadio">
                            {
                                cartInfo.shipping_charges.map((item) => (
                                    <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-end" key={item.id}>
                                        <div>
                                            <input type="radio" checked={`${cartInfo?.selected_shipping_fees?.shipping_type == 'fees' && cartInfo?.selected_shipping_fees?.shipping_id == item.id ? 'checked' : ''}`} onClick={() => updateCartAmount(item.id)} name="shippingChargeId" id={`ship${item.id}`} value={item.id} />
                                            <label htmlFor={`ship${item.id}`}>{item.shipping_title} <br /> <div className='shippingnotes'>{item.description}</div></label>
                                        </div>
                                        <div>
                                            <span className='text-dark fw-bold'>₹{item.charges != 0 ? item.charges : 'Free'}</span>
                                        </div>
                                    </li>
                                ))
                            }
                            {
                                shiprocket_charges && shiprocket_charges.length > 0 && shiprocket_charges.map((items, i) => (
                                    <li className="list-group-item d-flex justify-content-between align-items-end" key={i}>
                                        <div>
                                            <input type="radio" checked={`${cartInfo?.selected_shipping_fees?.shipping_id == items.id ? 'checked' : ''}`} onClick={() => updateCartAmount(items.id, 'rocket')} name="shippingChargeId" id={`ship${items.id}`} value={items.id} />
                                            <label htmlFor={`ship${items.id}`}>{items.courier_name} <br />
                                            </label>
                                        </div>
                                        <div>
                                            <span className='text-dark fw-bold'>
                                                ₹{items.amount.length > 0 ? items.amount[1] : 'Free'}
                                            </span>
                                        </div>
                                    </li>
                                ))
                            }
                            {
                                flatCharge != 0 && (
                                    <li className="list-group-item d-flex justify-content-between align-items-end" key="21">
                                        <div>
                                            <input type="radio" checked={`${cartInfo?.selected_shipping_fees?.shipping_type == 'flat' ? 'checked' : ''}`} onClick={() => updateCartAmount(flatCharge, 'flat')} name="shippingChargeId" id="flat_charge" value={flatCharge} />
                                            <label htmlFor="flat_charge">Flat Charge <br />
                                            </label>
                                        </div>
                                        <div>
                                            <span className='text-dark fw-bold'>
                                                ₹{flatCharge}
                                            </span>
                                        </div>
                                    </li>
                                )
                            }
                        </ul>
                    </Fragment>
                ) 
            }
        </Fragment>
    )
}
