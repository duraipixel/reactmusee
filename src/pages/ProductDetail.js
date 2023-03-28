import { Fragment, useMemo, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { CartButton } from '../components/Button/CartButton';
import { ImagePane } from '../components/Product/ImagePane';
import { Specification } from '../components/Product/Specification';
import { RelatedProduct } from './../components/Product/RelatedProduct';
import { useDispatch, useSelector } from 'react-redux';
import { PopupWidget } from "react-calendly";
import { attemptToCart } from '../app/reducer/attemptedCartSlice';
import { fetchCarts } from '../app/reducer/cartSlice';
import { Helmet } from 'react-helmet';
import { WaveSpinner } from 'react-spinners-kit';
import './product.css';
import { Button, Chip, Tooltip } from '@mui/material';
import { InputGroup, InputNumber } from 'rsuite';
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

export const ProductDetail = () => {
    const [productInfo, SetProductInfo] = useState(null);
    const [productSelectedQuantity, setProductSelectedQuantity] = useState(1);
    const customer = useSelector((state) => state.customer);
    const { product_url } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
                SetProductInfo(data);
                setRecentProduct(product_url);
            })
            .catch((err) => {
            });
    }

    const reduceCart = () => {
        if (productSelectedQuantity == 1) {

        } else {
            setProductSelectedQuantity(productSelectedQuantity - 1);
        }
    }

    const increaseCart = () => {

        if (productInfo.max_quantity == productSelectedQuantity) {
            toast.error('Product quantity reached max limit');
        } else {
            setProductSelectedQuantity(productSelectedQuantity + 1);
        }
    }

    const handleAddToCart = (product) => {

        if (customer.value) {
            addCartProduct(product);
        } else {

            toast.error('Login to add Carts');

            dispatch(attemptToCart(product));
            setTimeout(() => {
                navigate('/login');
            }, 200);
        }
    }

    async function addCartProduct(item) {

        let customer = JSON.parse(window.localStorage.getItem('customer'));
        const res_data = { ...item, customer_id: customer.id, quantity: productSelectedQuantity };

        await axios({
            url: window.API_URL + '/add/cart',
            method: 'POST',
            data: res_data,
        }).then((res) => {
            toast.success('Product added successfully ');
            localStorage.setItem('cart', JSON.stringify(res.data));
            dispatch(fetchCarts(JSON.parse(window.localStorage.getItem('cart'))))

        }).catch((err) => {

        })
    }

    useMemo(() => {
        getProductsInfo();
    }, [product_url])

    function hideMagnify() {
        document.getElementById('myresult').style.visibility = "hidden";
    }
    // console.log( productInfo.sale_prices, 'productInfo');
    return (
        <Fragment>

            {
                productInfo !== null && (
                    <>
                        {
                        /* <Helmet>

                            <title> { productInfo.meta && productInfo.meta !== null ? productInfo.meta.meta_title : ''} | Musee Musical</title>
                            <link rel="canonical" href={window.location.href} />
                            {
                                productInfo.meta && productInfo.meta.meta_keyword &&
                                <meta name="keyword" content={productInfo.meta.meta_keyword} />
                            }
                            {
                                productInfo.meta && productInfo.meta.meta_description &&
                                <meta name="description" content={productInfo.meta.meta_description} />
                            }
                        </Helmet> */}
                        <section className="section product-details">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="accordion-table text-left">
                                            <ul>
                                                <li>{productInfo.parent_category_name}</li>
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

                                    <ImagePane productInfo={productInfo} hideMagnify={hideMagnify} />
                                    <div class="col-md-6">
                                        <div class="small mb-1">SKU: {productInfo.sku}</div>
                                        <h1 class="fw-bolder h3">{productInfo.product_name}</h1>
                                        <div class="fs-5 mb-3 text-dark">
                                            {productInfo.sale_prices.strike_rate_original > 0 && <span class="text-decoration-line-through">₹{productInfo.sale_prices.strike_rate}</span>}
                                            <span>₹{productInfo.sale_prices.price}</span>
                                        </div>
                                        <div class="lead text-dark" dangerouslySetInnerHTML={{ __html: productInfo.description }}></div>
                                        {productInfo.stock_status != 'out_of_stock'
                                            ?
                                            <>
                                                <div className='d-inline-flex mt-2'>
                                                    <InputGroup className='border me-2' style={{ width: '120px' }}>
                                                        <InputGroup.Button onClick={reduceCart}>
                                                            <AiOutlineMinus />
                                                        </InputGroup.Button>
                                                        <InputNumber className={'custom-input-number fw-bold'} value={productSelectedQuantity} />
                                                        <InputGroup.Button onClick={increaseCart}>
                                                            <AiOutlinePlus />
                                                        </InputGroup.Button>
                                                    </InputGroup>
                                                    <CartButton product={productInfo} add={handleAddToCart} className="me-2" />
                                                    <Tooltip title="Book a video shopping" arrow placement="top">
                                                        <span>
                                                            <PopupWidget url="https://calendly.com/museemusical/30min" text="&#xF3C3;" rootElement={document.getElementById("root")} />
                                                        </span>
                                                    </Tooltip>
                                                </div>
                                            </>
                                            : <Chip label="Out Of Stock" className='rounded' color='error' />}
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="tab-of-sectors" >
                            <div className="container">
                                <div className="row">

                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <ul className="nav nav-tabs text-center justify-content-between" id="myTab" role="tablist">
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link active" id="description-tab" data-bs-toggle="tab" data-bs-target="#description" type="button" role="tab" aria-controls="description" aria-selected="true">Description</button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link" id="specification-tab" data-bs-toggle="tab" data-bs-target="#specification" type="button" role="tab" aria-controls="specification" aria-selected="false">Specification</button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link" id="audio-tab" data-bs-toggle="tab" data-bs-target="#audio" type="button" role="tab" aria-controls="audio" aria-selected="false">Audio & Video</button>
                                            </li>
                                        </ul>
                                        <div className="tab-content" id="myTabContent">
                                            <div className="tab-pane fade show active" id="description" role="tabpanel" aria-labelledby="description-tab">
                                                <div className="col-lg-12">
                                                    <div className="description-details text-center" dangerouslySetInnerHTML={{ __html: productInfo.specification }}>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="specification" role="tabpanel" aria-labelledby="specification-tab">
                                                {
                                                    productInfo.attributes.length > 0 ? (
                                                        <Specification attributes={productInfo.attributes} />
                                                    ) : (
                                                        <div>
                                                            No Specification available
                                                        </div>
                                                    )
                                                }

                                            </div>
                                            <div className="tab-pane fade" id="audio" role="tabpanel" aria-labelledby="audio-tab">
                                                <div className="col-lg-12">
                                                    <div className="description-details no-bfr-afr text-center">
                                                        <div className="inner-headngs">
                                                            <h2>Audio & Video</h2>
                                                        </div>
                                                        <div className="aadeo-vedeo">
                                                            <div className="row">
                                                                {
                                                                    productInfo.videolinks.length > 0 ? (
                                                                        productInfo.videolinks.map((items, i) => (
                                                                            <div className="col-lg-4" key={i}>
                                                                                <div className="fav-img">
                                                                                    <img src="/assets/images/favorite/fav-1.jpg" />
                                                                                    {/* <a id="play-video" className="video-play-button" href="#" tabIndex={-1}>
                                                                                        <span></span>
                                                                                    </a> */}
                                                                                    <iframe className='product_details_video' src={items.url} width="100%" height="269px">
                                                                                    </iframe>
                                                                                </div>
                                                                            </div>
                                                                        ))

                                                                    ) : (
                                                                        <div>No Links available</div>
                                                                    )
                                                                }

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </>
                )
            }

            {
                productInfo !== null && productInfo.related_products && productInfo.related_products.length > 0 && (
                    <section className="similar-products new-arrivals pt-0">
                        <div className="container">
                            <div className="row">

                                <div className="col-lg-12">
                                    <div className="inner-headngs">
                                        <h2>Other similar products</h2>
                                    </div>

                                    <RelatedProduct related_products={productInfo.related_products} />
                                </div>

                            </div>
                        </div>
                    </section>
                )
            }

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

            {/* <FrequentlyPurchased /> */}

        </Fragment>
    )
}
