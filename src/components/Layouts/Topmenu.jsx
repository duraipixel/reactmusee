import React, { Fragment, useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { isOpenSideBar } from '../../app/reducer/sideMenuBarSlice';

export default function Topmenu({isTopPage}) {

    const [topmenu, setTopmenu] = useState([]);

    useEffect(()=>{

        async function getTopMenu() {
            const response =  await fetch(window.API_URL+'/get/topMenu')
                                .then((response) => response.json())
                                .then((data) => setTopmenu(data.data))
                                .catch((err) => {
                                    // console.log(err.message)
                                });
        }

        getTopMenu();
       
    }, []);

    const dispatch = useDispatch();
    const openSideBar = () => {
        dispatch(isOpenSideBar());
    }
    // console.log(topmenu);

    return (
        <Fragment>
            <header className={`${isTopPage ? 'fixed-top' : ''}`}>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <nav id='cssmenu'>
                                <div className="srch-btn">
                                    <a href="#" className="clk-srch" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                        <img src="assets/images/srch.png" />
                                    </a>
                                </div>

                                <div className="button"></div>

                                <ul>
                                    <li className="having-hamber">
                                        <a href="javascript:void(0)" className="toggle-button" onClick={openSideBar}>
                                            <img src="assets/images/hamber.png" alt="" />All
                                            </a>
                                    </li>
                                    <li>
                                        <a href="#">Today’s Top Deals</a>
                                    </li>
                                    <li>
                                        <a href="#">New Arrivals</a>
                                    </li>
                                    {
                                        topmenu && topmenu.map((item) => (
                                            <li key={item.id}>
                                                <a href="#">{item.name}</a>
                                            </li>
                                        ))
                                    }
                                    <li>
                                        <a href="shop-by-brand.html">Shop by Brand</a>
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
