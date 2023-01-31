import React, { Fragment } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchProducts } from './../../app/reducer/productFilterSlice';

export const SortBy = ({sort_by}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const getProducts = () => {
        
        const url   = new URL(window.location.href);
        const SUrl  = "/products/pfilter";
        var array   = []
        var sortby  = document.getElementById('sort_by').value
        
        if (sortby != '' || sort_by != 'undefined' || sort_by != null ) {
            searchParams.set( "sort", sortby );
        } else {
            searchParams.delete( "sort" );
        }
        navigate(SUrl + '?' +searchParams.toString());
        dispatch(fetchProducts('?' +searchParams.toString()));
        
    }
    
    return (
        <Fragment>
            <div className="sort-order">
                <span> Sort by</span>
                <select className="form-control filter_sort_by" id="sort_by"  name="sort_by" onChange={() => getProducts()}>
                    <option value="">--select--</option>
                    {
                        sort_by && sort_by.map((item, i) => (
                            <option value={item.slug} key={i}>{item.name}</option>
                        ))
                    }
                </select>
            </div>
        </Fragment>
    )
}
