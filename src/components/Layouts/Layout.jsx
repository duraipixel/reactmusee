import React, { Fragment, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom';
import Topbar from './Topbar'
import Topmenu from './Topmenu'

export const Layout = () => {

    const [isTopPage, setIsTopPage] = useState(false);

    useEffect(() => {

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

    return (
        <Fragment>
            <div className="main-content">
                <Topbar isTopPage={isTopPage} />
                <Topmenu isTopPage={isTopPage} />
                
                <Outlet />
            </div>
        </Fragment>
    )
}
