import { Fragment } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { fetchProducts } from './../../app/reducer/productFilterSlice';

export const DiscountSkeletonItem = ({discountCollectionData}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location  = useLocation();

    const searchParams = new URLSearchParams(location.search);

    const goToProductListPage = (discount_slug, category_slug = '' ) => {
        const url = new URL(window.location.href);
        const SUrl = "/products/pfilter";
        
        searchParams.set("discount", discount_slug);
        if( category_slug ) {
            searchParams.set("category", category_slug);
        }

        navigate(SUrl + '?'+ searchParams.toString());
        dispatch(fetchProducts('?'+ searchParams.toString()));
    }

    return (
        <Fragment>
            {

                discountCollectionData.length > 0 ? (
                    <>
                    {
                        discountCollectionData.map((item) => (

                            <div className="col-lg-3 col-md-6 col-sm-12 xol-xs-12" key={item.id}>
                                <div className="deals-box">
                                    <h4>
                                        
                                        <label role={`button`} onClick={() => goToProductListPage(item.slug)}>
                                            {item.collection_name} <span>20% OFF</span>
                                        </label>
                                        
                                    </h4>
                                    <ul>
                                        {
                                            item.products.length > 0 ? (

                                                item.products.map((productItems, i) => (
                                                    <li key={i} >
                                                        <label role={`button`} onClick={() => goToProductListPage(item.slug, productItems.category_slug)}>
                                                            <img src={productItems.image} />
                                                            <span>{productItems.category} </span>
                                                        </label>

                                                    </li>
                                                    
                                                ))
                                                
                                            ):null
                                        }
                                       
                                    </ul>
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
