import React from 'react'

export const CartButton = ({add, product}) => {
    return (
        <button type='button' className='' onClick={()=>add(product)}> Add to Cart </button>
    )
}
