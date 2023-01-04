import React, { Fragment, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMenus } from './../../app/reducer/menuSlice';
import { fetchProducts } from './../../app/reducer/productFilterSlice';

export const Submenu = () => {
    const navigate = useNavigate();
    const menuData = useSelector((state) => state.menus);
    const dispatch = useDispatch();
    const commonUrl = new URL(window.location.href);

    const setUrlCategory = (slug) => {
        const url = new URL(window.location.href);
        const SUrl = "/products/pfilter";
        if (slug == 'all') {
            url.searchParams.set("category", menuData.menus[0].slug);
            url.searchParams.delete("scategory");
        } else {
            url.searchParams.set("category", menuData.menus[0].slug);
            url.searchParams.set("scategory", slug);
        }
        navigate(SUrl + url.search);
        dispatch(fetchProducts());

    }

    useEffect(() => {
        if (window.performance) {
            if (performance.navigation.type == 1) {
                if (commonUrl.searchParams.get('category')) {
                    dispatch(fetchMenus(commonUrl.searchParams.get('category')));
                }
            }
        }
        // setSubmenuData( menuData, 'submenus');
    }, [])

    // console.log(menuData);

    return (
        <Fragment>
            <div className="secondary-menu text-center">
                <div className="container">
                    <div className="row">
                        <ul>
                            {
                                menuData.menus.length > 0 && (
                                    <li>
                                        <a role="button" onClick={() => setUrlCategory('all')} className={`${menuData.menus[0].slug === commonUrl.searchParams.get('category') && !commonUrl.searchParams.get('scategory') ? 'active' : ''}`} >
                                            All {menuData.menus[0].name}
                                        </a>
                                    </li>
                                )
                            }
                            {
                                menuData.menus.length > 0 && menuData.menus[0].child && menuData.menus[0].child.map((item, i) => (
                                    <li key={i} role="button">
                                        <a onClick={() => setUrlCategory(item.slug)} className={`${item.slug === commonUrl.searchParams.get('scategory') ? 'active' : ''}`}> {item.name} </a>
                                    </li>
                                ))
                            }

                        </ul>
                        <span className="fil-optn"><a href="javascript:void(0)">
                            <i className="fa fa-filter" aria-hidden="true"></i>
                            Filter</a></span>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
