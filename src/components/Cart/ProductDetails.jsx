import axios from 'axios';
import { Fragment, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { clearCart, fetchCarts } from '../../app/reducer/cartSlice';
import { toast } from 'react-toastify';
import { setCoupon } from '../../app/reducer/couponSlice';

export const ProductDetails = ({ cart, cart_total, getShippingRocketCharges }) => {

    const coupon = useSelector((state) => state.coupon);
    const dispatch = useDispatch();

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
            data: { customer_id: customer.id },
        }).then((res) => {

            localStorage.setItem('cart', JSON.stringify(res.data));
            dispatch(clearCart());
            localStorage.removeItem('shipping_address');
            localStorage.removeItem('shiprocket_charges');
            getShippingRocketCharges('', '');
            
            toast.success('Cart Cleared Successfully');

        }).catch((err) => {

        })
    }

    async function updateProduct(product, quantity) {

        await axios({
            url: window.API_URL + '/update/cart',
            method: 'POST',
            data: { cart_id: product.cart_id, customer_id: product.customer_id, quantity: quantity },
        }).then((res) => {

            localStorage.setItem('cart', JSON.stringify(res.data));
            dispatch(fetchCarts(JSON.parse(window.localStorage.getItem('cart'))))

            getShippingRocketCharges('', '');

        }).catch((err) => {

        })
    }

    async function deleteProduct(product) {

        await axios({
            url: window.API_URL + '/delete/cart',
            method: 'POST',
            data: { cart_id: product.cart_id, customer_id: product.customer_id },
        }).then((res) => {

            localStorage.setItem('cart', JSON.stringify(res.data));
            sessionStorage.removeItem('cart_coupon');
            dispatch(fetchCarts(JSON.parse(window.localStorage.getItem('cart'))))
            getShippingRocketCharges('', '');

        }).catch((err) => {

        })

    }

    const applyCoupon = () => {

        var coupon_code = document.getElementById('coupon').value;

        if (coupon_code == '') {
            toast.error('Coupon code is required');
            document.getElementById('coupon').focus();
            return false;
        }
        let customer = JSON.parse(window.localStorage.getItem('customer'));

        axios({
            url: window.API_URL + '/apply/coupon',
            method: 'POST',
            data: { coupon_code: coupon_code, customer_id: customer.id },

        }).then((res) => {

            if (res.data.status == 'error') {
                toast.error(res.data.message);
            } else if (res.data.status == 'success') {
                toast.success(res.data.message);
            }
            dispatch(setCoupon(res.data));
            localStorage.setItem('cart', JSON.stringify(res.data.cart_info));
            sessionStorage.setItem('cart_coupon', JSON.stringify(res.data.coupon_info));
            dispatch(fetchCarts(JSON.parse(window.localStorage.getItem('cart'))))

        }).catch((err) => {

        })

    }

    async function fetchCartProducts() {

        let customer = JSON.parse(window.localStorage.getItem('customer'));

        await axios({
            url: window.API_URL + '/get/cart',
            method: 'POST',
            data: { customer_id: customer.id },
        }).then((res) => {

            localStorage.setItem('cart', JSON.stringify(res.data));
            dispatch(fetchCarts(JSON.parse(window.localStorage.getItem('cart'))))

        }).catch((err) => {

        })
    }

    const cancelCoupon = () => {

        fetchCartProducts();
        dispatch(setCoupon(''));
        let cancelApplyBtn = document.getElementById('coupon');
        cancelApplyBtn.value = '';
    }

    return (
        <Fragment>
            <table className="table table-bordered desky-verson">
                <thead>
                    <tr>
                        <th>&nbsp;</th>
                        <th>Product</th>
                        <th>&nbsp;</th>
                        <th width="130"> Price </th>
                        <th width="130"> Quantity </th>
                        <th width="130"> SubTotal </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cart && Object.entries(cart).map((key, item) => (
                            <tr key={key}>
                                <td>
                                    <button onClick={() => removeCartProduct(cart[item])}><i className="fa fa-trash-o" aria-hidden="true"></i></button>
                                </td>
                                <td>
                                    <img className="prdt-clsimg" src={cart[item].image} />
                                </td>
                                <td>
                                    {cart[item].product_name}
                                </td>
                                <td>
                                    <span className="price"> ₹{cart[item].price} </span>
                                </td>
                                <td>
                                    <button onClick={() => decreaseCartProduct(cart[item])}><img src="/assets/images/sub.png" /></button>
                                    <span>{cart[item].quantity}</span>
                                    <button onClick={() => increaseCartProduct(cart[item])}><img src="/assets/images/add.png" /></button>
                                </td>
                                <td>
                                    <span className="price"> ₹{cart[item].sub_total} </span>
                                </td>
                            </tr>
                        ))
                    }

                    <tr>
                        <td colSpan="4" style={{ border: '0px' }}>
                            Have a Coupon?
                            <input type="text" placeholder="Enter Coupon code here" id="coupon" name="coupon" value={coupon.value.coupon_code} disabled={coupon.value.coupon_code ? 'disabled' : ''} maxLength="6" />
                            {
                                cart_total.coupon_code ?
                                    <button type='button' onClick={() => cancelCoupon()} >Cancel</button>
                                    :
                                    <button type='button' onClick={() => applyCoupon()}>Apply</button>
                            }
                        </td>
                        <td colSpan="2" style={{ textAlign: 'right', border: '0px' }}>
                            <button className="refreshing" onClick={() => clearCustomerCart()}>
                                <img src="/assets/images/refresh.png" />
                                Refresh Cart
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className='mobile-cartlst'>
                {
                    cart && Object.entries(cart).map((key, item) => (
                        <div className='cat-fntion' key={key}>
                            <button className='del-btm' onClick={() => removeCartProduct(cart[item])}><i className="fa fa-trash-o" aria-hidden="true"></i></button>
                            <h4> {cart[item].product_name}</h4>
                            <h5><span>Price : </span>₹{cart[item].price}</h5>
                            <div className='m-flex'>
                                <img src={cart[item].image} />
                                <div className="prce-btm">
                                    <button><img src="/assets/images/sub.png" onClick={() => decreaseCartProduct(cart[item])} /></button>
                                    {cart[item].quantity}
                                    <button><img src="/assets/images/add.png" onClick={() => increaseCartProduct(cart[item])} /></button>
                                </div>
                            </div>
                            <h5 className='m-0 mt-3'><span>Sub Total : </span>₹{cart[item].sub_total}</h5>
                        </div>
                    ))
                }
                <div className='copon-code'>
                    <table>
                        <tr>
                            <td colSpan="4" style={{ border: '0px' }}>
                                Have a Coupon?
                                <input type="text" placeholder="Enter Coupon code here" id="coupon" name="coupon" value={cart_total.coupon_code} disabled={cart_total.coupon_code ? 'disabled' : ''} maxLength="6" />
                                {
                                    cart_total.coupon_code ?
                                        <button type='button' onClick={() => cancelCoupon()} >Cancel</button>
                                        :
                                        <button type='button' onClick={() => applyCoupon()}>Apply</button>
                                }
                            </td>
                            <td colSpan="2" style={{ textAlign: 'right', border: '0px' }}>
                                <button className="refreshing" onClick={() => clearCustomerCart()}>
                                    <img src="/assets/images/refresh.png" />
                                    Refresh Cart
                                </button>
                            </td>
                        </tr>
                    </table>
                </div>

            </div>
        </Fragment>
    )
}
