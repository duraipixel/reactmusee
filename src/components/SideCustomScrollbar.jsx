import React, { Fragment, useEffect, useMemo } from 'react'
import { Accordion } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { isOpenSideBar } from '../app/reducer/sideMenuBarSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import './sideMenuBar.css';
import { useState } from 'react';
import { fetchProducts } from './../app/reducer/productFilterSlice';
import { fetchMenus } from './../app/reducer/menuSlice';

export default function SideCustomScrollbar({menuAll, getSubMenu, setIsPageLoaded}) {
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
        getSubMenu(categorySlug);
        navigate(SUrl +'?'+ searchParams.toString());
        dispatch(isOpenSideBar());
        dispatch(fetchProducts('?'+ searchParams.toString()));

    }

    return (
        <Fragment>
            <div className={`togle-menu mCustomScrollbar ${isSideBarOpen ? 'show' : ''}`} data-mcs-theme="dark">
                <div className="togmenu-header">
                    <a className="clse-menu" onClick={openSideBar}><img src="/assets/images/close.png" /></a>
                    <h4>What are you looking<br /> for today?</h4>
                </div>
                <div className="togmenu-lists">
                    <Accordion defaultActiveKey="0">
                        {
                            menuAll && menuAll.map((item, i) => (
                                <Accordion.Item eventKey={i} key={i}>
                                    <Accordion.Header>
                                        {item.name}
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <ul>
                                            {
                                                item.child && item.child.length > 0 && item.child.map((items, j) => (
                                                    <li key={j}>
                                                        <button className='sidemenu-button' onClick={() => handleSubMenu(item.slug, items.slug)}>
                                                           - {items.name}
                                                        </button>
                                                    </li>

                                                ))
                                            }
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
