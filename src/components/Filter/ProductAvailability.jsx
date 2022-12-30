import React, { Fragment } from 'react'

export const ProductAvailability = ({product_availability}) => {

    // console.log(product_availability, 'product_availability');
    return (
        <Fragment>
            {
                product_availability && (
            
                <ul>
                    <h4>Product Availability</h4>
                    {
                        Object.entries( product_availability ).map((item, i) => (
                            <li key={i}>
                                <label class="cstm-chkbx">{item[1]}
                                    <input type="checkbox" name='product_availability[]' value={item[0]} />
                                    <span class="checkmark"></span>
                                </label>
                            </li>
                        ))
                    }
                   
                </ul>
                )
            }
        </Fragment>
    )
}
