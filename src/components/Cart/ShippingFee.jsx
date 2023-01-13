import React, { Fragment } from 'react'

export const ShippingFee = () => {
    return (
        <Fragment>
            <table className="table table-borderless customRadio">
                <tbody>
                    <tr>
                        <td>
                            <input type="radio" name="textEditor" id="sublime" /><label htmlFor="sublime">Standard Shipping</label>
                        </td>
                        <td>
                            Free
                        </td>
                    </tr>
                    <tr>
                        <td width="220">
                            <input type="radio" name="textEditor" id="nextime" /><label htmlFor="nextime">2 Days Express Shipping</label>
                        </td>
                        <td>
                            ₹500
                        </td>
                    </tr>
                </tbody>
            </table>
        </Fragment>
    )
}
