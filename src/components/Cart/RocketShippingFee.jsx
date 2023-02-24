import React from 'react'

export const RocketShippingFee = () => {

    const shiprocket_charges = localStorage.getItem('shiprocket_charges') ? JSON.parse(localStorage.getItem('shiprocket_charges')) : [];

    return (
        <div>
            {
                shiprocket_charges && shiprocket_charges.length > 0 && shiprocket_charges.map((item, key) => (
                    <div style={{ display: 'inline-flex', width: '100%' }} key={key}>
                        <div style={{ width: '25%', justifyContent: 'center', display: 'inline-flex', verticalAlign: 'middle' }}>
                            <input type="radio" name='rocket_charges' id="charges1" className='' style={{ width: '25px' }} />
                        </div>
                        <div htmlFor="charges1" className=''>
                            <article>
                                <label htmlFor='charges1'> {item.courier_name} </label>
                            </article>
                            <article>
                                {/* <table>
                                    <tr>
                                        <td>
                                            <small >
                                                Width : {item.measurement.breadth}px
                                            </small>
                                        </td>
                                        <td>
                                            <small>
                                                Height : {item.measurement.height}px
                                            </small>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td> 
                                            <small>
                                                Length : {item.measurement.length}px
                                            </small>
                                        </td>
                                        <td> 
                                            <small>
                                                Weight : {item.measurement.weight}kg 
                                            </small>
                                        </td>
                                    </tr>
                                </table> */}

                            </article>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
