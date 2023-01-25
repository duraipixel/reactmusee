import React, { Fragment } from 'react'

export const AttributeCollection = () => {
    return (
        <Fragment>
            <div className="filter-lists">
                <ul>
                    <h4> Specification </h4>

                    <li >
                        <label className="cstm-chkbx">
                            namdesf

                            <input type="checkbox" name='discounts[]' className='filter_discounts' />
                            <span className="checkmark"></span>
                        </label>
                    </li>

                </ul>
            </div>
        </Fragment>
    )
}
