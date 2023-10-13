import { Fragment } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { fetchProducts } from './../../app/reducer/productFilterSlice';
import { CardActionArea } from '@mui/material';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import './collection.css';


export const DiscountSkeletonItem = ({ discountCollectionData }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);

    const goToProductListPage = (discount_slug, category_slug = '') => {
        const url = new URL(window.location.href);
        const SUrl = "/products/search";

        searchParams.set("discount", discount_slug);
        if (category_slug) {
            searchParams.set("category", category_slug);
        }

        navigate(SUrl + '?' + searchParams.toString());
        dispatch(fetchProducts('?' + searchParams.toString()));
    }

    
    return (
        <Fragment>
            {
                discountCollectionData.length > 0 && (
                    <>
                        {
                            discountCollectionData.map((item) => (
                                <div className="col-md-6" key={item.id}>
                                    <div className='p-3 rounded d-flex align-items-center justify-content-center'
                                        style={{
                                            background: `linear-gradient(rgb(0 0 0 / 46%), rgb(0 0 0 / 67%)), url(${window.AUTH_BG})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center center',
                                            backgroundAttachment: 'fixed',
                                            minHeight: 230
                                        }}>
                                        <div className='row g-3 w-100'>
                                            <div className='col-12 fw-bold fs-6 text-white mb-2 text-center ' onClick={() => goToProductListPage(item.slug)}>
                                                {item.collection_name} <span></span>
                                            </div>
                                            {
                                                item.products.length > 0 ? (
                                                    item.products.map((productItems, i) => (
                                                        <div className="col-lg-3 col-6" key={i}>
                                                            <CardActionArea key={i} className="text-center rounded bg-light p-2" onClick={() => goToProductListPage(item.slug, productItems.category_slug)}>
                                                                <div className="deal-image-wrapper border rounded shadow-sm">
                                                                    <LazyLoadImage effect='blur' src={productItems.image} alt={productItems.product_name} className="deal-image" />
                                                                </div>
                                                                <div className='product-label-collection'>

                                                                    <small className='text-dark'>{productItems.product_name}</small>
                                                                </div>
                                                                {/* <small className='d-block mt-1 text-dark'>{productItems.category} </small> */}
                                                            </CardActionArea>
                                                        </div>
                                                    ))
                                                ) : null
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))
                        }

                    </>
                )
            }
        </Fragment>
    )
}
