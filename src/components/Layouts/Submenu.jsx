import { Fragment, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMenus } from './../../app/reducer/menuSlice';
import { fetchProducts } from './../../app/reducer/productFilterSlice';
import { fetchBrowseCategory } from '../../app/reducer/otherCategorySlice';
import { useState, useMemo } from 'react';

export const Submenu = ({ topSubmenu }) => {

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [menuCategory, setMenuCategory] = useState('');
    const [menuSubCategory, setMenuSubCategory] = useState('');
    const [topSubMenuAll, setTopSubMenuAll] = useState([]);

    const searchParams = new URLSearchParams(location.search);
    const commonUrl = new URL(window.location.href);

    var top_sub_MenuAll = (sessionStorage.getItem('topSubMenu') ? JSON.parse(sessionStorage.getItem('topSubMenu')) : []);

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
        dispatch(fetchProducts('?' + searchParams.toString()));
    }
    // useMemo(() => {
    //     dispatch(fetchProducts('?' + searchParams.toString()));
    //     // dispatch(fetchBrowseCategory(menuCategory));
    // }, [menuCategory, menuSubCategory])

    useEffect(() => {
        if (window.performance) {
            if (performance.navigation.type == 1) {
                if (commonUrl.searchParams.get('category')) {
                    dispatch(fetchMenus(commonUrl.searchParams.get('category')));
                }
            }
        }

    }, [])
    if (top_sub_MenuAll != undefined && top_sub_MenuAll.length > 0) {
        document.querySelector('body').classList.add('padding-top')
    } else {
        document.querySelector('body').classList.remove('padding-top')
    }
    if (top_sub_MenuAll != undefined && top_sub_MenuAll.length > 0) return (
        <Fragment>
            <div className="secondary-menu text-center">
                <div className="container">
                    <div>
                        <button role="button" onClick={() => setUrlCategory('all')} className={`secondary-menu-link ${top_sub_MenuAll[0].slug === searchParams.get('category') && !searchParams.get('scategory') ? 'active' : ''}`} >
                            All {top_sub_MenuAll[0].name}
                        </button>
                        {top_sub_MenuAll != undefined && top_sub_MenuAll.length > 0 && top_sub_MenuAll[0].child && top_sub_MenuAll[0].child.map((item, i) => (
                            <button key={i} onClick={() => setUrlCategory(item.slug)} className={`secondary-menu-link ${item.slug === searchParams.get('scategory') ? 'active' : ''}`}> {item.name} </button>
                        ))}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
