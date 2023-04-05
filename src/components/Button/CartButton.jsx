// import { Button } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Button } from 'rsuite';
export const CartButton = ({ add, product, className, loader, disabled}) => {
    return (
        <Button type='button' disabled={disabled} loading={loader} className={`btn-dark CartButton text-white btn p-3 py-2 ${className}`} variant='contained' onClick={() => add(product)} >
            <ShoppingCartIcon className='me-2'/>
            ADD TO CART
        </Button>
    )
}