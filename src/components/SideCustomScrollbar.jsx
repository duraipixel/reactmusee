import React, { Fragment } from 'react'
import { Accordion } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { isOpenSideBar } from '../app/reducer/sideMenuBarSlice';

export default function SideCustomScrollbar() {
    const dispatch = useDispatch();

    const isSideBarOpen = useSelector((state) => state.sideMenuBar.value);
    const openSideBar = () => {

        dispatch(isOpenSideBar());
    }
    
    return (
        <Fragment>
            <div className={`togle-menu mCustomScrollbar ${isSideBarOpen ? 'show' : ''}`} data-mcs-theme="dark">
                <div className="togmenu-header">
                    <a href="javascript:void(0)" className="clse-menu"  onClick={openSideBar}><img src="/assets/images/close.png" /></a>
                    <h4>What are you looking<br /> for today?</h4>
                </div>
                <div className="togmenu-lists">
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>
                                Pianos
                            </Accordion.Header>
                            <Accordion.Body>
                                <ul>
                                    <li><a href="all-pianos.html">- All Pianos</a></li>
                                    <li><a href="">- Grand Pianos</a></li>
                                    <li><a href="">- Acoustic Pianos</a></li>
                                    <li><a href="">- Digital Pianos</a></li>
                                </ul>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>
                                Guitars
                            </Accordion.Header>
                            <Accordion.Body>
                                <ul>
                                    <li><a href="">- Acoustic Guitars</a></li>
                                    <li><a href="">- Classical Guitars</a></li>
                                    <li><a href="">- Electric Guitars</a></li>
                                    <li><a href="">- Bass Guitars</a></li>
                                    <li><a href="">- Ukuleles</a></li>
                                    <li><a href="">- Mandolin</a></li>
                                </ul>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>
                                Keyboards
                            </Accordion.Header>
                            <Accordion.Body>
                                <ul>
                                    <li><a href="">- Compact Keyboards</a></li>
                                    <li><a href="">- Portable Keyboards</a></li>
                                    <li><a href="">- Midi Keyboards</a></li>
                                    <li><a href="">- Synthesizers</a></li>
                                    <li><a href="">- Workstation</a></li>
                                </ul>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
            </div>
        </Fragment>
    )
}
