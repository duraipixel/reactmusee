import { Fragment } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { fetchProducts } from './../../app/reducer/productFilterSlice';
import { CardActionArea } from '@mui/material';

export const DiscountSkeletonItem = ({ discountCollectionData }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);

    const goToProductListPage = (discount_slug, category_slug = '') => {
        const url = new URL(window.location.href);
        const SUrl = "/products/pfilter";

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
                discountCollectionData.length > 0 ? (
                    <>
                        {
                            discountCollectionData.map((item) => (
                                <div className="col-lg-3 col-md-6 col-sm-12 xol-xs-12" key={item.id}>
                                    <div className="deals-box p-3 card-box">
                                        <div className='fw-bold fs-6 text-primary mb-3'>
                                            <label className='m-0' onClick={() => goToProductListPage(item.slug)}>
                                                {item.collection_name} <span>20% OFF</span>
                                            </label>
                                        </div>
                                        <div className='row m-0'>
                                            {
                                                item.products.length > 0 ? (
                                                    item.products.map((productItems, i) => (
                                                        <div className="col-6 p-1" key={i}>
                                                            <CardActionArea key={i} className="text-center p-1" onClick={() => goToProductListPage(item.slug, productItems.category_slug)}>
                                                                <div className="deal-image-wrapper">
                                                                    <img src={productItems.image} className="deal-image" />
                                                                </div>
                                                                <small className='d-block mt-1'>{productItems.category} </small>
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
                ) :
                    Array.from(
                        { length: 4 },
                        (_, i) => (
                            <div className="col-lg-3 col-md-6 col-sm-12 xol-xs-12" key={i}>
                                <div className="deals-box">
                                    <Skeleton />
                                    <ul>
                                        <li>
                                            <Skeleton width={100} height={100} />
                                            <Skeleton />
                                        </li>
                                        <li>
                                            <Skeleton width={100} height={100} />
                                            <Skeleton />
                                        </li>
                                        <li>
                                            <Skeleton width={100} height={100} />
                                            <Skeleton />
                                        </li>
                                        <li>
                                            <Skeleton width={100} height={100} />
                                            <Skeleton />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )
                    )
            }
        </Fragment>
    )
}
