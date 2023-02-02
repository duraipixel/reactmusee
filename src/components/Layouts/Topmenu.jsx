import axios from 'axios';
import React, { Fragment, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { isOpenSideBar } from '../../app/reducer/sideMenuBarSlice';
import { fetchMenus } from './../../app/reducer/menuSlice';
import { fetchProducts } from './../../app/reducer/productFilterSlice';
import { fetchBrowseCategory } from './../../app/reducer/otherCategorySlice';

export default function Topmenu({ isTopPage, topmenu, getSubMenu }) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    
    const [isFetchUrl, setIsFetchUrl] = useState('');
    const [menu, setMenu] = useState('');

    const searchParams = new URLSearchParams(location.search);
    const cUrl = new URL(window.location.href);

    

    // useMemo(() => {
    //     if( menu ) {
    //         dispatch(fetchMenus(menu));
    //     }
    // }, [menu])
    
    const openSideBar = () => {
        dispatch(isOpenSideBar());
    }

    return (
        <Fragment>
            <header className={`${isTopPage ? 'fixed-top' : ''}`}>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <nav id='cssmenu'>
                                <div className="srch-btn">
                                    <a href="#" className="clk-srch" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                        <img src="/assets/images/srch.png" />
                                    </a>
                                </div>

                                <div className="button"></div>

                                <ul>
                                    <li className="having-hamber">
                                        <a className="toggle-button" onClick={openSideBar}>
                                            <img src="/assets/images/hamber.png" alt="" />All
                                        </a>
                                    </li>
                                    {
                                        topmenu.length !== 0 ? topmenu.map((item, i) => (
                                            <li key={i}>
                                                <button className={`menu-link ${cUrl.searchParams.get('category') == item.slug ? 'active' : ''}`} onClick={() => getSubMenu(item.slug)}>
                                                    {item.name}
                                                </button>

                                            </li>
                                        ))
                                            : ''
                                    }
                                    <li>
                                        <Link to='/brand'>Shop by Brand</Link>
                                    </li>
                                </ul>
                            </nav>

                        </div>
                    </div>
                </div>
            </header>
        </Fragment>
    )
}
