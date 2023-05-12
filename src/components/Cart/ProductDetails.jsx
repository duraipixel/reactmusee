import axios from 'axios';
import { Fragment, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { clearCart, fetchCarts } from '../../app/reducer/cartSlice';
import { toast } from 'react-toastify';

import { InputGroup, Button } from 'rsuite';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { setCoupon } from '../../app/reducer/couponSlice';
import { CircularProgress } from '@mui/material';
import { setCartCount } from '../../app/reducer/cartCountSlice';

export const ProductDetails = ({ cart, cart_total, getShippingRocketCharges }) => {

    const coupon = useSelector((state) => state.coupon);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loader, setLoader] = useState(false)
    const increaseCartProduct = (product) => {
        let max_quantity = product.max_quantity;
        if (max_quantity == product.quantity) {
            toast.error('Product quantity reached max limit');
        } else {
            let quantity = product.quantity + 1;
            updateProduct(product, quantity);
        }
    }

    const decreaseCartProduct = (product) => {
        if (product.quantity == 1) {
            toast.error('Minimum quantity should be 1');
        } else {
            let quantity = product.quantity - 1;
            updateProduct(product, quantity);
        }
    }

    const [deleteLoader, setDeleteLoader] = useState(null)

    const removeCartProduct = (product, key) => {
        setDeleteLoader(key[0])
        deleteProduct(product, key[0])
    }

    async function clearCustomerCart() {
        let customer = JSON.parse(window.sessionStorage.getItem('customer'));
        await axios({
            url: window.API_URL + '/clear/cart',
            method: 'POST',
            data: { customer_id: customer?.id || '', guest_token: sessionStorage.getItem('guest_token') || '' },
        }).then((res) => {
            sessionStorage.setItem('cart', JSON.stringify(res.data));
            dispatch(clearCart());
            sessionStorage.removeItem('shipping_address');
            sessionStorage.removeItem('shiprocket_charges');
            getShippingRocketCharges('', '');
            dispatch(setCoupon(''));
            let cancelApplyBtn = document.getElementById('coupon');
            cancelApplyBtn.value = '';
            toast.success('Cart Cleared Successfully');
        })
    }

    async function updateProduct(product, quantity) {
        setLoader(true)
        await axios({
            url: window.API_URL + '/update/cart',
            method: 'POST',
            data: { cart_id: product.cart_id, customer_id: product.customer_id, quantity: quantity, guest_token: product.guest_token },
        }).then((res) => {
            setLoader(false);
            if (res.data.error == 1) {
                toast.error(res.data.message);
                setTimeout(() => navigate('/login'), 500)
            } else {
                sessionStorage.setItem('cart', JSON.stringify(res.data));
                dispatch(fetchCarts(JSON.parse(window.sessionStorage.getItem('cart'))))
                dispatch(setCoupon(''));
                document.getElementById('coupon').value = '';
                getShippingRocketCharges('', '');
            }
        });
    }

    async function deleteProduct(product) {
        await axios({
            url: window.API_URL + '/delete/cart',
            method: 'POST',
            data: { cart_id: product.cart_id, customer_id: product.customer_id, guest_token: product.guest_token },
        }).then((res) => {
            setDeleteLoader(null);

            sessionStorage.setItem('cart', JSON.stringify(res.data));
            sessionStorage.removeItem('cart_coupon');
            dispatch(fetchCarts(JSON.parse(window.sessionStorage.getItem('cart'))))
            getShippingRocketCharges('', '');
            dispatch(setCoupon(''));
            document.getElementById('coupon').value = '';
            dispatch(setCartCount(res.data.cart_count || 0))
        });
    }
    
    return (
        <Fragment>
            <h5 className="text-primary my-3 fw-bold text-uppercase">Cart Items</h5>
            <div className="card border-0">
                <div>
                    <ul className='list-group '>
                        {
                            cart && Object.entries(cart).map((key, item) => (
                                <li className="list-group-item list-group-item-action" key={key}>
                                    <div className="row align-items-center">
                                        <div className="p-max-sm-2 col-sm-3 col-md-2">
                                            <img src={cart[item].image} alt="Ecommerce" className="product-list-image" />
                                        </div>
                                        <div className="p-max-sm-2 col-sm-4 col-md-6 col-lg-5">
                                            <h6 className="mb-0 fs-6">{cart[item].product_name}</h6>
                                            <span>
                                                <small className="text-secondary">₹{cart[item].sale_prices.price}</small>
                                                {cart[item]?.sale_prices?.strike_rate &&
                                                    <small className="text-decoration-line-through text-danger ms-1">₹{cart[item].sale_prices.strike_rate}</small>
                                                }
                                            </span>
                                            <div className="mt-2 small lh-1">
                                                <Button size='sm' className='border-0' color="red" loading={deleteLoader == key[0] ? true : false} appearance="ghost" onClick={(event) => removeCartProduct(cart[item], key)}>
                                                    <i className="fa fa-trash-o me-1" aria-hidden="true"></i> Remove
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="p-max-sm-2 col-6 col-sm-3 col-md-3 col-lg-3">
                                            <InputGroup className='border me-2' style={{ width: '120px' }}>
                                                <InputGroup.Button size='sm' onClick={() => decreaseCartProduct(cart[item])} className="border-end">
                                                    <AiOutlineMinus />
                                                </InputGroup.Button>
                                                <Button loading={loader} ripple={false} className={'custom-input-number fw-bold bg-white w-100 rounded-0'}>{cart[item].quantity}</Button>
                                                <InputGroup.Button size='sm' onClick={() => increaseCartProduct(cart[item])} className="border-start">
                                                    <AiOutlinePlus />
                                                </InputGroup.Button>
                                            </InputGroup>
                                        </div>
                                        <div className="p-max-sm-2 col-6 col-sm-2 text-end text-start text-md-end col-md-2">
                                            <span className="fw-bold text-primary fs-max-20">₹{cart[item].sub_total}</span>
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </Fragment>
    )
}
