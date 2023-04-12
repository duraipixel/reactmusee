import { Fragment, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchProducts } from './../../app/reducer/productFilterSlice';
import { PongSpinner } from 'react-spinners-kit';
import './filter.css';
import ProductCardGroup from '../FilterPannel';
import { Button } from '@mui/material';

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
            <div className="filter-product-list">
                {!filterData.loading && products && <ProductCardGroup />}
            </div>
            <div className='my-4'>
                <div className={`text-center `} >
                    {
                        filterData.products && filterData.products.to >= filterData.products.total_count ? null :
                            <Button variant='outlined' onClick={() => loadMoreProduct()}>
                                Load More
                            </Button>
                    }
                    <Button variant='text' onClick={() => window.scroll(0,0)} className='m-md-2 m-4 float-md-end'>
                       <i className="fa fa-arrow-up me-3"></i> Scroll to top
                    </Button>
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
