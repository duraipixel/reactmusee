import { Fragment, useEffect, useMemo } from 'react'
import { Accordion } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { isOpenSideBar } from '../app/reducer/sideMenuBarSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import './sideMenuBar.css';
import { useState } from 'react';
import { fetchProducts } from './../app/reducer/productFilterSlice';
import { fetchMenus } from './../app/reducer/menuSlice';
import { useAllMenuQuery } from '../app/services/allMenuApi';

export default function SideCustomScrollbar({ menuAll, getSubMenu, setIsPageLoaded }) {
    const { data, isSuccess } = useAllMenuQuery();
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const isSideBarOpen = useSelector((state) => state.sideMenuBar.value);
    const openSideBar = () => {

        dispatch(isOpenSideBar());

    }

    const cUrl = new URL(window.location.href);

    const handleSubMenu = (categorySlug, subCategorySlug) => {
        //?category=keyboard-case-keyboard&scategory=gator-keyboard-case-keyboard-case
        
        const SUrl = "/products/pfilter";
        searchParams.set("category", categorySlug);
        searchParams.set("scategory", subCategorySlug);
        searchParams.delete("page");
        searchParams.delete("brand");
        searchParams.delete("availability");
        searchParams.delete("booking");
        // getSubMenu(categorySlug, 'sidemenu');
        dispatch(fetchProducts('?' + searchParams.toString()));
        
        navigate(SUrl + '?' + searchParams.toString());
        dispatch(isOpenSideBar());

    }

    return (
        <Fragment>
            <div className={`togle-menu  ${isSideBarOpen ? 'show' : ''}`} >
                <div className="togmenu-header">
                    <a className="clse-menu" onClick={openSideBar}><img src="/assets/images/close.png" alt="close"/></a>
                    <h1>What are you looking<br /> for today?</h1>
                </div>
                <div className="togmenu-lists">
                    <Accordion defaultActiveKey="0">
                        {
                            isSuccess && data.data.length > 0 && data.data.map((item, i) => (
                                <Accordion.Item eventKey={i} key={i}>
                                    <Accordion.Header>
                                        {item.name}
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <ul>
                                            {item.child && item.child.length > 0 && item.child.map((items, j) => (
                                                <li key={j} className='d-flex align-items-start'>
                                                    -
                                                    <button className='sidemenu-button' onClick={() => handleSubMenu(item.slug, items.slug)}>
                                                        {items.name}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </Accordion.Body>
                                </Accordion.Item>
                            ))
                        } 
                    </Accordion>
                </div>
            </div>
        </Fragment>
    )
}
