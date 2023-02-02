import React, { Fragment, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMenus } from './../../app/reducer/menuSlice';
import { fetchProducts } from './../../app/reducer/productFilterSlice';
import { fetchBrowseCategory } from '../../app/reducer/otherCategorySlice';
import { useState, useMemo } from 'react';

export const Submenu = ({ topSubmenu }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const [menuCategory, setMenuCategory] = useState('');
    const [menuSubCategory, setMenuSubCategory] = useState('');

    const searchParams = new URLSearchParams(location.search);
    const commonUrl = new URL(window.location.href);

    const topSubMenuAll = localStorage.getItem('topSubMenu') ? JSON.parse(localStorage.getItem('topSubMenu')) : [];

    const setUrlCategory = (slug) => {
        
        const SUrl = "/products/pfilter";
        if (slug == 'all') {
            searchParams.set("category", topSubMenuAll[0].slug);
            searchParams.delete("scategory");
        } else {
            searchParams.set("category", topSubMenuAll[0].slug);
            searchParams.set("scategory", slug);
        }
        navigate(SUrl + '?' + searchParams.toString());
        setMenuCategory(topSubMenuAll[0].slug);
        setMenuSubCategory(slug);
    }

    useMemo(() => {
        dispatch(fetchProducts('?' + searchParams.toString()));
        if (menuCategory) {

            dispatch(fetchBrowseCategory(menuCategory));
        }
    }, [menuCategory, menuSubCategory])

    useEffect(() => {
        if (window.performance) {
            if (performance.navigation.type == 1) {
                if (commonUrl.searchParams.get('category')) {
                    dispatch(fetchMenus(commonUrl.searchParams.get('category')));
                }
            }
        }
    }, [])
    
    return (
        <Fragment>
            <div className="secondary-menu text-center">
                <div className="container">
                    <div className="row">
                        <ul>
                            {
                                topSubMenuAll != undefined && topSubMenuAll.length > 0 && (
                                    <li>
                                        <a role="button" onClick={() => setUrlCategory('all')} className={`${topSubMenuAll[0].slug === commonUrl.searchParams.get('category') && !commonUrl.searchParams.get('scategory') ? 'active' : ''}`} >
                                            All {topSubMenuAll[0].name}
                                        </a>
                                    </li>
                                )
                            }
                            {
                                topSubMenuAll != undefined && topSubMenuAll.length > 0 && topSubMenuAll[0].child && topSubMenuAll[0].child.map((item, i) => (
                                    <li key={i} role="button">
                                        <a onClick={() => setUrlCategory(item.slug)} className={`${item.slug === commonUrl.searchParams.get('scategory') ? 'active' : ''}`}> {item.name} </a>
                                    </li>
                                ))
                            }
                        </ul>
                        <span className="fil-optn">
                            <i className="fa fa-filter" aria-hidden="true"></i>
                            Filter
                        </span>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
