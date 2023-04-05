import axios from 'axios';
import { Fragment, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { clearCart, fetchCarts } from '../../app/reducer/cartSlice';
import { toast } from 'react-toastify';

import { Button, InputGroup, InputNumber } from 'rsuite';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { setCoupon } from '../../app/reducer/couponSlice';

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
        let max_quantity = product.max_quantity;
        if (product.quantity == 1) {
            toast.error('Minimum quantity should be 1');
        } else {
            let quantity = product.quantity - 1;
            updateProduct(product, quantity);
        }
    }

    const removeCartProduct = (product) => {
        deleteProduct(product)
    }

    async function clearCustomerCart() {

        let customer = JSON.parse(window.localStorage.getItem('customer'));

        await axios({
            url: window.API_URL + '/clear/cart',
            method: 'POST',
            data: { customer_id: customer?.id || '', guest_token: localStorage.getItem('guest_token') || '' },
        }).then((res) => {

            localStorage.setItem('cart', JSON.stringify(res.data));
            dispatch(clearCart());
            localStorage.removeItem('shipping_address');
            localStorage.removeItem('shiprocket_charges');
            getShippingRocketCharges('', '');
            dispatch(setCoupon(''));
            let cancelApplyBtn = document.getElementById('coupon');
            cancelApplyBtn.value = '';

            toast.success('Cart Cleared Successfully');

        }).catch((err) => {

        })
    }

    async function updateProduct(product, quantity) {
        // console.log( product );
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

                localStorage.setItem('cart', JSON.stringify(res.data));
                dispatch(fetchCarts(JSON.parse(window.localStorage.getItem('cart'))))
                dispatch(setCoupon(''));
                let cancelApplyBtn = document.getElementById('coupon');
                cancelApplyBtn.value = '';
                getShippingRocketCharges('', '');
            }
        }).catch((err) => {

        })
    }

    async function deleteProduct(product) {

        await axios({
            url: window.API_URL + '/delete/cart',
            method: 'POST',
            data: { cart_id: product.cart_id, customer_id: product.customer_id, guest_token: product.guest_token },
        }).then((res) => {

            localStorage.setItem('cart', JSON.stringify(res.data));
            sessionStorage.removeItem('cart_coupon');
            dispatch(fetchCarts(JSON.parse(window.localStorage.getItem('cart'))))
            getShippingRocketCharges('', '');
            dispatch(setCoupon(''));
            let cancelApplyBtn = document.getElementById('coupon');
            cancelApplyBtn.value = '';

        }).catch((err) => {

        })

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
                                            <span><small className="text-secondary">₹{cart[item].price}</small></span>
                                            <div className="mt-2 small lh-1">
                                                <button className='btn-link bg-white p-1 rounded text-danger' onClick={() => removeCartProduct(cart[item])}>
                                                    <i className="fa fa-trash-o me-1" aria-hidden="true"></i>
                                                    Remove
                                                </button>
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
