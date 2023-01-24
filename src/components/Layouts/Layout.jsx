import React, { Fragment, useEffect, useState } from 'react'
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

export const Layout = () => {

    const [isTopPage, setIsTopPage] = useState(false);
    const [topmenu, setTopmenu] = useState([]);

    const dispatch = useDispatch();

    const [menuall, setMenuAll] = useState([]);

    async function getAllMenu() {
        const response =  await fetch(window.API_URL+'/get/allMenu')
                            .then((response) => response.json())
                            .then((data) => setMenuAll(data.data))
                            .catch((err) => {
                                // console.log(err.message)
                            });
    }

    async function getTopMenu() {
        const response =  await fetch(window.API_URL+'/get/topMenu')
                            .then((response) => response.json())
                            .then((data) => setTopmenu(data.data))
                            .catch((err) => {
                                // console.log(err.message)
                            });
    }


    useEffect(() => {
        if( menuall.length === 0 ){
            getAllMenu();
        }
        if( topmenu.length === 0 ) {
            getTopMenu();
        }
        window.addEventListener('scroll', stickNavbar);
        return () => {
            window.removeEventListener('scroll', stickNavbar);
        };

    }, []);

    const stickNavbar = () => {
        if (window !== undefined) {
            let windowHeight = window.scrollY;
            
            if( windowHeight >= 100 ) {
                setIsTopPage(isTopPage => true);
                document.body.classList.add('pad-top');
            } else {
                setIsTopPage(isTopPage => false);
                document.body.classList.remove('pad-top');
            }   
        }
    };

    const openSideBar = () => {
        dispatch(isOpenSideBar());
    }
    const isSideBarOpen = useSelector((state) => state.sideMenuBar.value);

    return (
        <Fragment>
            <div className="main-content">
                <SideCustomScrollbar  />
                <Topbar isTopPage={isTopPage} />
                <Topmenu isTopPage={isTopPage} topmenu={topmenu} />
                
                <Outlet />
                <Footer />
                <Copyrights />
                <MobileFooter />
                <div className={`overlay ${isSideBarOpen ? 'overlay-bg' : '' }`} onClick={openSideBar}></div>
            </div>
        </Fragment>
    )
}
