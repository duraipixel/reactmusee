import axios from 'axios';
import { Fragment, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { clearCart, fetchCarts } from '../../app/reducer/cartSlice';
import { toast } from 'react-toastify';

import { Button, InputGroup, InputNumber } from 'rsuite';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

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
            data: { cart_id: product.cart_id, customer_id: product.customer_id, quantity: quantity, guest_token:product.guest_token },
        }).then((res) => {
            
            setLoader(false);

            if( res.data.error == 1 ) {
                toast.error(res.data.message);
                setTimeout(() => navigate('/login'), 500)
            } else {

                localStorage.setItem('cart', JSON.stringify(res.data));
                dispatch(fetchCarts(JSON.parse(window.localStorage.getItem('cart'))))

                getShippingRocketCharges('', '');
            }
        }).catch((err) => {

        })
    }

    async function deleteProduct(product) {

        await axios({
            url: window.API_URL + '/delete/cart',
            method: 'POST',
            data: { cart_id: product.cart_id, customer_id: product.customer_id, guest_token:product.guest_token },
        }).then((res) => {

            localStorage.setItem('cart', JSON.stringify(res.data));
            sessionStorage.removeItem('cart_coupon');
            dispatch(fetchCarts(JSON.parse(window.localStorage.getItem('cart'))))
            getShippingRocketCharges('', '');

        }).catch((err) => {

        })

    }

    

    

    return (
        <Fragment>
            <h5 className="text-primary mb-3 fw-bold text-uppercase">Cart Items</h5>
            <div className="card border-0">
                <div>
                    <ul className='list-group '>
                        {
                            cart && Object.entries(cart).map((key, item) => (
                                <li class="list-group-item list-group-item-action">
                                    <div class="row align-items-center">
                                        <div class="col-3 col-md-2">
                                            <img src={cart[item].image} alt="Ecommerce" class="avatar-img rounded border border-white border-3" />
                                        </div>
                                        <div class="col-4 col-md-6 col-lg-5">
                                            <h6 class="mb-0 fs-6">{cart[item].product_name}</h6>
                                            <span><small class="text-secondary">₹{cart[item].price}</small></span>
                                            <div class="mt-2 small lh-1">
                                                <button className='btn-link bg-white p-1 rounded text-danger' onClick={() => removeCartProduct(cart[item])}>
                                                    <i className="fa fa-trash-o me-1" aria-hidden="true"></i>
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                        <div class="col-3 col-md-3 col-lg-3">
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
                                        <div class="col-2 text-lg-end text-start text-md-end col-md-2">
                                            <span class="fw-bold text-primary">₹{cart[item].sub_total}</span>
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
            {/* <table className="table table-bordered desky-verson">
                <thead>
                    <tr>
                        <th></th>
                        <th>Product</th>
                        <th></th>
                        <th width="130">Price</th>
                        <th width="130">Quantity</th>
                        <th width="130">SubTotal</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cart && Object.entries(cart).map((key, item) => (
                            <tr key={key}>
                                <td><button onClick={() => removeCartProduct(cart[item])}><i className="fa fa-trash-o" aria-hidden="true"></i></button></td>
                                <td><img className="prdt-clsimg" src={cart[item].image} /></td>
                                <td>{cart[item].product_name}</td>
                                <td><span className="price">₹{cart[item].price}</span></td>
                                <td><button onClick={() => decreaseCartProduct(cart[item])}><img src="/assets/images/sub.png" /></button><span>{cart[item].quantity}</span><button onClick={() => increaseCartProduct(cart[item])}><img src="/assets/images/add.png" /></button></td>
                                <td><span className="price">₹{cart[item].sub_total}</span></td>
                            </tr>
                        ))
                    }

                    <tr>
                        <td colSpan="4" style={{ border: '0px' }}>Have a Coupon?<input type="text" placeholder="Enter Coupon code here" id="coupon" name="coupon" value={coupon.value.coupon_code} disabled={coupon.value.coupon_code ? 'disabled' : ''} maxLength="6" />
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
            </table> */}

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
                {/* <div className='copon-code'>
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
                </div> */}

            </div>
        </Fragment>
    )
}
