import { Fragment, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { isOpenSideBar } from '../../app/reducer/sideMenuBarSlice';
import { useTopMenuQuery } from '../../app/services/topMenuApi';
import './globalsearch.css'

import { SearchMobile } from './SearchMobile';

export default function Topmenu({ isTopPage, topmenu, getSubMenu }) {
    const { data, error, isLoading, isFetching, isSuccess } = useTopMenuQuery();
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    
    const [searchShow, setSearchShow] = useState(false);
    const [menu, setMenu] = useState(false);
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
            <header className={`${isTopPage ? 'fixed-top' : ''}`} id="headerNavbar">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <nav id='cssmenu'>
                                <div className="srch-btn">
                                    <button className='clk-src' onClick={openGlobalMobileSearch}>
                                        <img src="/assets/images/srch.png" />
                                    </button>
                                </div>
                                <div className={`button ${menu ? "menu-opened" : ''}`} onClick={() => setMenu(!menu)}></div>
                                <ul className={`${menu ? "menu-open" : ''}`}>
                                    <li className="having-hamber">
                                        <a className="toggle-button" onClick={openSideBar}>
                                            <img src="/assets/images/hamber.png" alt="" />All
                                        </a>
                                    </li>
                                    {
                                        isSuccess && data.data.length > 0 && data.data.map((item, i) => (
                                            <li key={i}>
                                                <button className={`menu-link ${searchParams.get('category') == item.slug ? 'active' : ''}`} onClick={() => { setMenu(!menu); getSubMenu(item.slug) }}>
                                                    {item.name}
                                                </button>

                                            </li>
                                        ))
                                    }
                                    <li>
                                        <button onClick={() => {setMenu(!menu); navigate('/brand')}} className='menu-link'>Shop by Brand</button>
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
