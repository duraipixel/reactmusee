import React, { Fragment } from 'react'

export const ShippingFee = ({ shippCharges, updateCartAmount, cartInfo }) => {


    console.log('cartInfo', cartInfo);

    return (
        <Fragment>
            {
                cartInfo.shipping_charges ? (
                    <Fragment>
                        <h5>Select Shipping Speed</h5>
                        <table className="table table-borderless">
                            <tbody>
                                {
                                    cartInfo.shipping_charges.map((item) => (
                                        <tr key={item.id}>
                                            <td>
                                                <input type="radio" checked={`${cartInfo.shipping_id == item.id ? 'checked' : ''}`} onClick={() => updateCartAmount(item.id)} name="shippingChargeId" id={`ship${item.id}`} value={item.id} />
                                                <label htmlFor={`ship${item.id}`}>{item.shipping_title}</label>
                                                <div className='shippingNotes'>{item.description}</div>
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
