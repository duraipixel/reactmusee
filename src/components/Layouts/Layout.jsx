import React, { Fragment, useEffect, useMemo, useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Topbar from './Topbar'
import Topmenu from './Topmenu'
import Footer from './Footer';
import { Copyrights } from './Copyrights';
import { MobileFooter } from './MobileFooter';
import { useDispatch, useSelector } from 'react-redux';
import { isOpenSideBar } from '../../app/reducer/sideMenuBarSlice';
import { setAllBrand } from '../../app/reducer/brandSlice';
import SideCustomScrollbar from './../SideCustomScrollbar';
import { Submenu } from './Submenu';
import { computeHeadingLevel } from '@testing-library/react';
import { fetchProducts } from './../../app/reducer/productFilterSlice';
import { WaveSpinner } from 'react-spinners-kit';

export const Layout = () => {

    const [isTopPage, setIsTopPage] = useState(false);
    const [topmenu, setTopmenu] = useState([]);
    const [topSubmenu, setTopSubmenu] = useState([]);
    const [isPageLoaded, setIsPageLoaded] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);

    async function getAllMenu() {

        const response = await fetch(window.API_URL + '/get/allMenu')
            .then((response) => response.json())
            .then((data) => {
                sessionStorage.setItem('allMenu', JSON.stringify(data.data));
            }
            )
            .catch((err) => {
                // console.log(err.message)
            });
    }

    async function getTopMenu() {
        const response = await fetch(window.API_URL + '/get/topMenu')
            .then((response) => response.json())
            .then((data) => {
                sessionStorage.setItem('topMenu', JSON.stringify(data.data));
                setTopmenu(data.data);
            }
            )
            .catch((err) => {
                // console.log(err.message)
            });
    }

    const topMenuAll = sessionStorage.getItem('topMenu') ? JSON.parse(sessionStorage.getItem('topMenu')) : []
    const menuAll = sessionStorage.getItem('allMenu') ? JSON.parse(sessionStorage.getItem('allMenu')) : []


    useMemo(() => {

        if (menuAll.length === 0) {
            getAllMenu();
        }
        if (topMenuAll.length === 0) {
            getTopMenu();
        }

    }, [])

    const stickNavbar = () => {
        if (window !== undefined) {
            let windowHeight = window.scrollY;

            if (windowHeight >= 100) {
                setIsTopPage(isTopPage => true);
                document.body.classList.add('pad-top');
            } else {
                setIsTopPage(isTopPage => false);
                document.body.classList.remove('pad-top');
            }
        }
    };

    const getSubMenu = (category) => {
        setIsPageLoaded(true);
        sessionStorage.setItem('isPageLoaded', true);

        const topMenuAll = sessionStorage.getItem('topMenu') ? JSON.parse(sessionStorage.getItem('topMenu')) : [];

        var subMenus = topMenuAll.filter(
            menu => {
                return (
                    menu.slug.toLowerCase().includes(category.toLocaleLowerCase())
                )
            }
        );

        sessionStorage.setItem('topSubMenu', JSON.stringify(subMenus));
         
        const SUrl = "/products/pfilter";
            searchParams.set("category", category);
            searchParams.delete("scategory");
            searchParams.delete("page");
            // searchParams.delete("brand");
            searchParams.delete("availability");
            searchParams.delete("booking");
      
        dispatch(fetchProducts('?' + searchParams.toString()));
        navigate(SUrl + '?' + searchParams.toString());
    }

    const openSideBar = () => {
        dispatch(isOpenSideBar());
    }
    const isSideBarOpen = useSelector((state) => state.sideMenuBar.value);
    
    return (
        <Fragment>
            <div className="main-content">
                <SideCustomScrollbar menuAll={menuAll} getSubMenu={getSubMenu} />
                <Topbar isTopPage={isTopPage} />
                <Topmenu isTopPage={isTopPage} topmenu={topMenuAll} getSubMenu={getSubMenu} />
                <Submenu topSubmenu={topSubmenu} setIsPageLoaded={setIsPageLoaded} />
                <Outlet context={[isPageLoaded, setIsPageLoaded]} />
                <Footer />
                <Copyrights />
                <MobileFooter />
                {
                    isPageLoaded &&
                    <div id="cart-loader" >
                        <div className='loader-wrapper'>
                            <WaveSpinner
                                size={100}
                                color="#0a1d4a"
                                loading={true}

                                style={{ top: '50%', left: '45%' }}

                            />
                        </div>
                    </div>
                }
                <div className={`overlay ${isSideBarOpen ? 'overlay-bg' : ''}`} onClick={openSideBar}></div>
            </div>
        </Fragment>
    )
}
