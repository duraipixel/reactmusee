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
    const [topSubMenuAll, setTopSubMenuAll] = useState([]);
    const searchParams = new URLSearchParams(location.search);
    const commonUrl = new URL(window.location.href);

    var top_sub_MenuAll = (sessionStorage.getItem('topSubMenu') ? JSON.parse(sessionStorage.getItem('topSubMenu')) : [] );
    
    const setUrlCategory = (slug) => {
        
        const SUrl = "/products/pfilter";
        if (slug == 'all') {
            searchParams.set("category", top_sub_MenuAll[0].slug);
            searchParams.delete("scategory");
        } else {
            searchParams.set("category", top_sub_MenuAll[0].slug);
            searchParams.set("scategory", slug);
        }
        navigate(SUrl + '?' + searchParams.toString());
        setMenuCategory(top_sub_MenuAll[0].slug);
        setMenuSubCategory(slug);
    }

   
    
    useMemo(() => {
        dispatch(fetchProducts('?' + searchParams.toString()));
        // dispatch(fetchBrowseCategory(menuCategory));
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
                                top_sub_MenuAll != undefined && top_sub_MenuAll.length > 0 && (
                                    <li>
                                        <a role="button" onClick={() => setUrlCategory('all')} className={`${top_sub_MenuAll[0].slug === searchParams.get('category') && !searchParams.get('scategory') ? 'active' : ''}`} >
                                            All {top_sub_MenuAll[0].name}
                                        </a>
                                    </li>
                                )
                            }
                            {
                                top_sub_MenuAll != undefined && top_sub_MenuAll.length > 0 && top_sub_MenuAll[0].child && top_sub_MenuAll[0].child.map((item, i) => (
                                    <li key={i} role="button">
                                        <a onClick={() => setUrlCategory(item.slug)} className={`${item.slug === searchParams.get('scategory') ? 'active' : ''}`}> {item.name} </a>
                                    </li>
                                ))
                            }
                        </ul>
                        
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
