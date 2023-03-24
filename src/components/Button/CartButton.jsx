import { Button } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
export const CartButton = ({ add, product, className}) => {
    return (
        <Button type='button' className={`btn-dark btn p-3 py-2 ${className}`} variant='contained' onClick={() => add(product)} >
            <ShoppingCartIcon className='me-2'/>
            Add to Cart
        </Button>
    )
}