import React, { Fragment } from 'react'

export const ShippingFee = ({ shippCharges }) => {
    return (
        <Fragment>
            <table className="table table-borderless customRadio">
                <tbody>
                    {
                        shippCharges && shippCharges.map((item) => (
                            <tr>
                                <td>
                                    <input type="radio" name="textEditor" id="sublime" value={item.id} checked={`${item.is_free == 'yes' ? 'checked' : ''}`} />
                                    <label htmlFor="sublime">{item.shipping_title}</label>
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
    )
}
