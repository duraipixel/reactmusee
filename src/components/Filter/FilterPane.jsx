import React, { Fragment, useState } from 'react'
import { FilterItems } from './FilterItems';
import { ProductSkeletonItem } from './../Skeleton/ProductSkeletonItem';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, createSearchParams, useLocation } from 'react-router-dom';
import { fetchProducts } from './../../app/reducer/productFilterSlice';
import { PongSpinner } from 'react-spinners-kit';
import './filter.css';

export const FilterPane = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [startLoadMore, setStartLoadMore] = useState(false);

    const filterData = useSelector((state) => state.products);

    const products = filterData.products != undefined ? filterData.products.products : [];
    // const from = filterData.products.from;
    const to = filterData.products != undefined ? filterData.products.to : 0;
    // const total_count = filterData.products.total_count;

    const loadMoreProduct = () => {
        setStartLoadMore(true)
        let page = parseInt(to) / parseInt(window.productLimit);
        const url = new URL(window.location.href);
        const SUrl = "/products/pfilter";

        searchParams.set("page", page);
        navigate(SUrl + '?' + searchParams.toString());

        dispatch(fetchProducts('?' + searchParams.toString()));
        setStartLoadMore(false)

    }

    return (
        <Fragment>
            <div className="col-lg-12 col-md-12 col-sm-12
                                    main-det-prdt">
                <div className="row">
                    {
                        !filterData.loading && products ? (
                            <FilterItems />
                        ) :
                            Array.from(
                                { length: 6 },
                                (_, i) => (
                                    <ProductSkeletonItem key={i} />
                                )
                            )
                    }

                </div>

                <div className={`col-lg-12 text-center ${filterData.products && filterData.products.to >= filterData.products.total_count ? 'hide' : ''}`} >
                    <div className="load-btn">
                        <button className='loadmore' onClick={() => loadMoreProduct()}>
                            Load More
                        </button>
                    </div>
                </div>
                <div className='loadmore-loading'>
                    <PongSpinner
                        size={100}
                        color="#0a1d4a"
                        loading={startLoadMore}
                        style={{ top: '50%', left: '45%' }}

                    />
                </div>

            </div>
        </Fragment>
    )
}
