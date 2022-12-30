import React, { Fragment, useEffect, useState } from 'react'
import { Link, useSearchParams, useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMenus } from '../../app/reducer/menuSlice';

export const Submenu = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [paramCategory, setParamCategory] = useState('');
    const [paramSCategory, setParamsCategory] = useState('');
    const [filterMenu, setFilterMenu] = useState([]);

    let params = (new URL(document.location)).searchParams;
 
    const menuData = useSelector((state) => state.menus);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMenus());
    }, [])

    const filterMenuFucn = () => {

        setFilterMenu(menuData.menus.filter(
            menu => {
                return menu.slug === searchParams.get('category');
            }
        ))
     
    }

    const setUrlCategory = (slug) => {
        
        const url = new URL(window.location.href);
        url.searchParams.set('scategory', slug);
        window.history.pushState({}, '', url.toString());
        
        console.log(params);
        var teste = params.map((itparams) => {
            console.log(itparams.cateogry);
        })
        filterMenuFucn()

    }

    useEffect(() => {
        filterMenuFucn()
    }, [])

    
    return (
        <Fragment>
            <div class="secondary-menu text-center">
                <div class="container">
                    <div class="row">
                        <ul>
                            {
                                filterMenu.length > 0 && (
                                    <li>
                                        <a className={`${filterMenu[0].slug === searchParams.get('category') && !searchParams.get('scategory') ? 'active' : ''}`} href="javascript:void(0)">
                                            All {filterMenu[0].name}
                                        </a>
                                    </li>
                                )
                            }
                            {
                                filterMenu.length > 0 && filterMenu[0].child && filterMenu[0].child.map((item, i) => (
                                    <li key={i}>
                                        <a onClick={()=>setUrlCategory(item.slug)} className={`${item.slug === searchParams.get('scategory') ? 'active' : ''}`}> {item.name} </a>
                                    </li>
                                ))
                            }

                        </ul>
                        <span class="fil-optn"><a href="javascript:void(0)">
                            <i class="fa fa-filter" aria-hidden="true"></i>
                            Filter</a></span>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
