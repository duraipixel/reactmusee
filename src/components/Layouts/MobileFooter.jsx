import React, { Fragment } from 'react'
import { useDispatch } from 'react-redux';
import { isOpenSideBar } from '../../app/reducer/sideMenuBarSlice';

export const MobileFooter = () => {

    const dispatch = useDispatch();

    const openSideBar = () => {
        dispatch(isOpenSideBar());
    }

    return (
        <Fragment >
            <div className="mobile-footer">
                <a className="toggle-button" data-toggle="tooltip" title="Download Your Reports" onClick={openSideBar}>
                    <img src="assets/images/mob-ic-1.png" alt="" className="img-fluid" /> Products
                </a>
                <a href="" data-toggle="tooltip" title="Current Location">
                    <img src="assets/images/mob-ic-2.png" alt="" className="img-fluid" /> Login
                </a>
                <a href="" data-toggle="tooltip" title="Login to view your Profile">
                    <img src="assets/images/mob-ic-4.png" alt="" className="img-fluid" /> Compare
                </a>
                <a href="" data-toggle="tooltip" title="Cart Details">
                    <img src="assets/images/mob-ic-3.png" alt="" className="img-fluid" /> Cart
                </a>
                <a href="" target="_blank" data-toggle="tooltip" title="Call Us">
                    <img src="assets/images/mob-ic-5.png" alt="" className="img-fluid" /> Call Us
                </a>
            </div>
        </Fragment>
    )
}
