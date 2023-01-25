import React, { Fragment } from 'react'

export const ShippingFee = ({ shippCharges, updateCartAmount, cartInfo }) => {

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
                                                <label htmlFor={`ship${item.id}`}>{item.shipping_title} <br/> <div className='shippingnotes'>{item.description}</div></label>
                                                
                                            </td>
                                            <td>
                                                {item.charges != 0 ? item.charges : 'Free'}
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
