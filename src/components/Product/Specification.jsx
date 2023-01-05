import React, { Fragment } from 'react'


export const Specification = ({ attributes }) => {
    return (
        <Fragment>
            <div className="col-lg-12">
                <div className="description-details no-bfr-afr text-center">
                    <div className="inner-headngs">
                        <h2>Specification</h2>
                    </div>
                </div>
                <div className="specs-lsts">
                    <table className="table table-bordered">
                        <tbody>
                            {/* <tr className="active">
                                <th className="active" colSpan={3} scope="row" style={{ textAlign: 'center', fontWeight: 'bold', borderBottom: '1px solid #cccccc' }}>Yamaha C7X Grand Piano</th>
                            </tr> */}
                            {
                                attributes && attributes.map((items, i) => (
                                    <tr key={i}>
                                        <th className="active" scope="row">{items.title}</th>
                                        <td className="spectable-colnumber-0"> {items.attribute_values}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </Fragment>
    )
}
