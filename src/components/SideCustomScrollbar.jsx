import React, { Fragment, useEffect } from 'react'
import { Accordion } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { isOpenSideBar } from '../app/reducer/sideMenuBarSlice';
import { useNavigate } from 'react-router-dom';
import './sideMenuBar.css';
import { useState } from 'react';
import { fetchProducts } from './../app/reducer/productFilterSlice';
import { fetchMenus } from './../app/reducer/menuSlice';

export default function SideCustomScrollbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isSideBarOpen = useSelector((state) => state.sideMenuBar.value);
    const openSideBar = () => {

        dispatch(isOpenSideBar());

    }

    const cUrl = new URL(window.location.href);

    const getSubMenu = (categorySlug, subCategorySlug) => {
        //?category=keyboard-case-keyboard&scategory=gator-keyboard-case-keyboard-case
        const url = new URL(window.location.href);
        const SUrl = "/products/pfilter";
        url.searchParams.set("category", categorySlug);
        url.searchParams.set("scategory", subCategorySlug);
        navigate(SUrl + url.search);
        dispatch(isOpenSideBar());
        dispatch(fetchProducts());
        dispatch(fetchMenus(categorySlug));

    }

    const [menuall, setMenuAll] = useState([]);

    async function getAllMenu() {
        
        const response =  await fetch(window.API_URL+'/get/allMenu')
                            .then((response) => response.json())
                            .then((data) => setMenuAll(data.data))
                            .catch((err) => {
                                // console.log(err.message)
                            });
    }

    useEffect(() => {
        getAllMenu();
    }, [])

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
                            menuall && menuall.map((item, i) => (
                                <Accordion.Item eventKey={i}>
                                    <Accordion.Header>
                                        {item.name}
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <ul>
                                            {
                                                item.child && item.child.length > 0 && item.child.map((items) => (
                                                    <li>
                                                        <button className='sidemenu-button' onClick={() => getSubMenu(item.slug, items.slug)}>
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
