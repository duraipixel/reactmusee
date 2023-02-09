import React, { Fragment, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { isOpenSideBar } from '../../app/reducer/sideMenuBarSlice';
import './globalsearch.css'

import { SearchMobile } from './SearchMobile';

export default function Topmenu({ isTopPage, topmenu, getSubMenu }) {

    const dispatch = useDispatch();
    const location = useLocation();
    const [searchShow, setSearchShow] = useState(false);
    const searchParams = new URLSearchParams(location.search);
    
    const openSideBar = () => {
        dispatch(isOpenSideBar());
    }

    const openGlobalMobileSearch = () => {
        setSearchShow(true)
    }

    const handleSearchModalClose = () => {
        setSearchShow(false)
    }

    return (
        <Fragment>
            <header className={`${isTopPage ? 'fixed-top' : ''}`}>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <nav id='cssmenu'>
                                <div className="srch-btn">
                                    <button className='clk-src' onClick={openGlobalMobileSearch}>
                                        <img src="/assets/images/srch.png" />
                                    </button>
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
                                                <button className={`menu-link ${searchParams.get('category') == item.slug ? 'active' : ''}`} onClick={() => getSubMenu(item.slug)}>
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
            <SearchMobile searchShow={searchShow} handleSearchModalClose={handleSearchModalClose} />
        </Fragment>
    )
}
