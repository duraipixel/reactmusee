import { Fragment, useMemo, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { CartButton } from '../components/Button/CartButton';
import { ImagePane } from '../components/Product/ImagePane';
import { BsChat } from "react-icons/bs";
import { RelatedProduct } from './../components/Product/RelatedProduct';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCarts } from '../app/reducer/cartSlice';
import { WaveSpinner } from 'react-spinners-kit';
import './product.css';
import { Button, Chip } from '@mui/material';
import { InputGroup, InputNumber } from 'rsuite';
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import ProductFeatures from '../components/ProductFeatures';
import { v4 as uuid } from 'uuid';
import { PopupWidget } from 'react-calendly';
import { Helmet } from 'react-helmet';
import { setCartCount } from '../app/reducer/cartCountSlice';


export const ProductDetail = () => {
    const unique_id = uuid();

    const [productInfo, SetProductInfo] = useState(null);
    const [productSelectedQuantity, setProductSelectedQuantity] = useState(1);
    const customer = useSelector((state) => state.customer);
    const { product_url } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loader, setloader] = useState(false);

    var calendlyPrefill = {
        name: "",
        email: "",
        customAnswers: {
            a1: '',
            a2: '',
            a3: window.location.href,
            a4: "I want to see the video demo for the product"
        }
    };

    const [prefillCalend, setPrefillCalend] = useState(calendlyPrefill);

    const setRecentProduct = (product_url) => {
        const customer = JSON.parse(window.localStorage.getItem('customer'));
        axios({
            url: window.API_URL + '/set/recent',
            method: 'POST',
            data: { product_url: product_url, customer_id: customer.id },
        }).then((res) => {

            if (res.data.error == 1) {

            } else {

            }
        }).catch((err) => {
        })
    }

    function getProductsInfo() {

        fetch(window.API_URL + '/get/products/by/slug/' + product_url)
            .then((response) => response.json())
            .then((data) => {

                setPrefillCalend({
                    name: "",
                    email: "",
                    customAnswers: {
                        a1: data.product_name,
                        a2: data.sku,
                        a3: window.location.href,
                        a4: "I want to see the video demo for the product"
                    }
                });
                SetProductInfo(data);
                setRecentProduct(product_url);
            })
            .catch((err) => {
            });
    }

    const reduceCart = () => {
        if (productSelectedQuantity == 1) {
            //can do this alert
        } else {
            setProductSelectedQuantity(productSelectedQuantity - 1);
        }
    }

    const increaseCart = () => {

        if (productInfo.max_quantity == productSelectedQuantity) {
            // toast.error('Product quantity reached max limit');
        } else {
            setProductSelectedQuantity(productSelectedQuantity + 1);
        }
    }

    const handleAddToCart = (product) => {

        setloader(true)
        addCartProduct(product);

    }

    async function addCartProduct(item) {
        let customer = JSON.parse(window.localStorage.getItem('customer'));
        if (!window.localStorage.getItem('guest_token') && !customer?.id) {
            localStorage.setItem('guest_token', unique_id);
        }

        const res_data = { ...item, customer_id: customer?.id || '', guest_token: localStorage.getItem('guest_token') || '', quantity: productSelectedQuantity };

        await axios({
            url: window.API_URL + '/add/cart',
            method: 'POST',
            data: res_data,
        }).then((res) => {

            if (res.data.error == 1) {
                toast.error(res.data.message);
                setTimeout(() => navigate('/login'), 500)
            } else {
                
                toast.success('Product added successfully ');
                localStorage.setItem('cart', JSON.stringify(res.data));
                dispatch(setCartCount(res.data.cart_count));
                setTimeout(() => setloader(false), 500)
                dispatch(fetchCarts(res.data))
            }

        });
    }

    useMemo(() => {
        getProductsInfo();
    }, [product_url])
    function hideMagnify() {
        document.getElementById('myresult').style.visibility = "hidden";
    }
    
    return (
        <Fragment>

            {
                productInfo !== null && (
                    <>
                        <Helmet>
                            <title> {productInfo.meta && productInfo.meta !== null ? productInfo.meta.meta_title : ''} | Musee Musical</title>
                            <link rel="canonical" href={window.location.href} />
                            {productInfo.meta && productInfo.meta.meta_keyword && <meta name="keyword" content={productInfo.meta.meta_keyword} />}
                            {productInfo.meta && productInfo.meta.meta_description && <meta name="description" content={productInfo.meta.meta_description} />}
                        </Helmet>
                        <div className="py-md-5 py-3 bg-white">
                            <div className="container py-md-3">
                                <div className='row' >
                                    <div className="col-lg-12">
                                        <div className="accordion-table text-left pb-4">
                                            <ul>
                                                {productInfo.parent_category_name && <li>{productInfo.parent_category_name}</li>}
                                                <li>
                                                    <Link to={`/products/pfilter?category=${productInfo.parent_category_slug}&scategory=${productInfo.category_slug}`} >
                                                        {productInfo.category_name}
                                                    </Link>
                                                </li>
                                                <li>
                                                    {productInfo.product_name}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className='col-lg-6'>
                                        <ImagePane productInfo={productInfo} hideMagnify={hideMagnify} />
                                    </div>
                                    <div className='col-lg-6'>
                                        <div className="small mb-1">SKU: {productInfo.sku}</div>
                                        <h1 className="fw-bolder text-secondary h3">{productInfo.product_name}</h1>
                                        <div className="fs-5 mb-3 text-dark">
                                            {productInfo.sale_prices.strike_rate_original > 0 && <small className="text-decoration-line-through text-danger">₹{productInfo.sale_prices.strike_rate}</small>}
                                            <div className='fs-4 fw-bold text-primary mt-2'>₹{productInfo.sale_prices.price}</div> 
                                        </div>
                                        <div className="d-flex align-items-center mb-3">
                                            <span>Qty : </span>
                                            <InputGroup className='border ms-2' style={{ width: '120px' }}>
                                                <InputGroup.Button onClick={reduceCart} className="border-end">
                                                    <AiOutlineMinus />
                                                </InputGroup.Button>
                                                <InputNumber className={'custom-input-number fw-bold'} value={productSelectedQuantity} />
                                                {productInfo.max_quantity == productSelectedQuantity ?
                                                    <InputGroup.Button className="border-start">
                                                        <AiOutlinePlus />
                                                    </InputGroup.Button>
                                                    :
                                                    <InputGroup.Button onClick={increaseCart} className="border-start">
                                                        <AiOutlinePlus />
                                                    </InputGroup.Button>
                                                }
                                            </InputGroup>
                                        </div>
                                        <div className="lead text-dark" dangerouslySetInnerHTML={{ __html: productInfo.description }}></div>
                                        {productInfo.stock_status.includes('in_stock')
                                            ?
                                            <div>
                                                <div className='text-center d-sm-inline-flex'>
                                                    <CartButton product={productInfo} disabled={false} add={handleAddToCart} loader={loader} className="me-2 my-2" />
                                                    <span className='my-2'>
                                                        <PopupWidget url="https://calendly.com/museemusical/30min" text="Talk to our experts" prefill={prefillCalend} rootElement={document.getElementById("root")} />
                                                    </span>
                                                </div>
                                            </div>
                                            : <Chip label={productInfo.stock_status.replace('_', ' ')} size='large' className='rounded p-3 py-4 text-uppercase mt-4 product-chip' color='error' />}
                                        {
                                            productInfo?.feature_information &&
                                            <div className="abt-prduct">
                                                <h4>About This Product</h4>
                                                <div dangerouslySetInnerHTML={{ __html: productInfo.feature_information }}></div>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <ProductFeatures data={productInfo?.product_extra_information} />
                            </div>
                        </div>
                    </>
                )
            }
            <RelatedProduct related_products={productInfo?.related_products} />
            {
                productInfo === null &&
                <div id="cart-loader" >
                    <div className='loader-wrapper'>
                        <WaveSpinner
                            size={100}
                            color="#0a1d4a"
                            loading={true}
                            style={{ top: '50%', left: '45%' }}
                        />
                    </div>
                </div>
            }
        </Fragment>
    )
}
