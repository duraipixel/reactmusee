import React from 'react'

export const CartButton = ({add, product}) => {
    return (
        <button type='button' className='btn btn-primary' onClick={()=>add(product)}> Add to Cart </button>
    )
}
