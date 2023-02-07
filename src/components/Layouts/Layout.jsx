import React, { Fragment, useEffect, useMemo, useState } from 'react'
import { Outlet } from 'react-router-dom';
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

export const Layout = () => {

    const [isTopPage, setIsTopPage] = useState(false);
    const [topmenu, setTopmenu] = useState([]);
    const [topSubmenu, setTopSubmenu] = useState([]);
    const dispatch = useDispatch();

    async function getAllMenu() {
        console.log('feticn');
        const response = await fetch(window.API_URL + '/get/allMenu')
            .then((response) => response.json())
            .then((data) => {
                localStorage.setItem('allMenu', JSON.stringify(data.data));
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
    const menuAll = localStorage.getItem('allMenu') ? JSON.parse(localStorage.getItem('allMenu')) : []

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

        const topMenuAll = sessionStorage.getItem('topMenu') ? JSON.parse(sessionStorage.getItem('topMenu')) : [];

        var subMenus = topMenuAll.filter(
            menu => {
                return (
                    menu.slug.toLowerCase().includes(category.toLocaleLowerCase())
                )
            }
        );

        sessionStorage.setItem('topSubMenu', JSON.stringify(subMenus));
        setTopSubmenu(category)
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
                <Submenu topSubmenu={topSubmenu} />
                <Outlet />
                <Footer />
                <Copyrights />
                <MobileFooter />
                <div className={`overlay ${isSideBarOpen ? 'overlay-bg' : ''}`} onClick={openSideBar}></div>
            </div>
        </Fragment>
    )
}
