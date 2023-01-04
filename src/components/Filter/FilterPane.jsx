import React, { Fragment } from 'react'
import { FilterItems } from './FilterItems';
import { ProductSkeletonItem } from './../Skeleton/ProductSkeletonItem';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, createSearchParams } from 'react-router-dom';
import { fetchProducts } from './../../app/reducer/productFilterSlice';

export const FilterPane = (props) => {
    const dispatch = useDispatch();
    const navaigate = useNavigate();
    const filterData = useSelector((state) => state.products);

    const products = filterData.products.products;
    const from = filterData.products.from;
    const to = filterData.products.to;
    const total_count = filterData.products.total_count;

    const loadMoreProduct = () => {

        let page = parseInt(to) / parseInt(window.productLimit);
        const url = new URL(window.location.href);
        
        url.searchParams.set("page", page);       
        navaigate(url.search);

        dispatch(fetchProducts());
        
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

            </div>
        </Fragment>
    )
}
