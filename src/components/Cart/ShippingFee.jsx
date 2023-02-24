import React, { Fragment } from 'react'

export const ShippingFee = ({ shippCharges, updateCartAmount, cartInfo }) => {

    const shiprocket_charges = localStorage.getItem('shiprocket_charges') ? JSON.parse(localStorage.getItem('shiprocket_charges')) : [];
    
    return (
        <Fragment>
            {
                cartInfo.shipping_charges ? (
                    <Fragment>
                        <h5>Select Shipping Speed</h5>
                        <table className="table table-borderless customRadio">
                            <tbody>
                                {
                                    cartInfo.shipping_charges.map((item) => (
                                        <tr key={item.id}>
                                            <td>
                                                <input type="radio" checked={`${cartInfo.shipping_id == item.id ? 'checked' : ''}`} onClick={() => updateCartAmount(item.id)} name="shippingChargeId" id={`ship${item.id}`} value={item.id} />
                                                <label htmlFor={`ship${item.id}`}>{item.shipping_title} <br /> <div className='shippingnotes'>{item.description}</div></label>

                                            </td>
                                            <td>
                                                ₹{item.charges != 0 ? item.charges : 'Free'}
                                            </td>
                                        </tr>
                                    ))
                                }
                                {
                                    shiprocket_charges && shiprocket_charges.length > 0 && shiprocket_charges.map((items, i) => (
                                        <tr key={i}>
                                            <td>
                                                <input type="radio" checked={`${cartInfo.shipping_id == items.id ? 'checked' : ''}`} onClick={() => updateCartAmount(items.id, 'rocket')} name="shippingChargeId" id={`ship${items.id}`} value={items.id} />
                                                <label htmlFor={`ship${items.id}`}>{items.courier_name} <br />
                                                </label>
                                            </td>
                                            <td>
                                                ₹{items.amount.length > 0 ? items.amount[1] : 'Free'}
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </Fragment>
                ) : null
            }
        </Fragment>
    )
}
