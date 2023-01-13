import React, { Fragment} from 'react'


export const ShippingAddress = ({ customerAddress, setCustomerAddress, shipping_address, handleSetShippingAddress }) => {
    
    return (
        <Fragment>
            <div className="ship-list">
                <h3>Ship to</h3>
                <div className="line-spacer"></div>
                {
                    customerAddress && customerAddress.length > 0 && customerAddress.map((item, i) => (
                        <div className="addres-que customRadio" key={i}>
                            <input type="radio" name="ship_address" id={`addrs${item.id}`} value={item.id} onChange={() => handleSetShippingAddress(item)} checked={`${shipping_address.id == item.id ? 'selected' : ''}`} />
                            <label htmlFor={`addrs${item.id}`}>
                                <span> {item.name} </span>
                                {item.address_line1} 
                                {item.city} { item.state} {item.post_code}
                            </label>
                        </div>
                    ))
                }
                
            </div>
        </Fragment>
    )
}
