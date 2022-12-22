import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';

export default function Topbar({isTopPage}) {
  return (
    <Fragment>
        <div className={`top-bar ${isTopPage ? "top-fix":""}`} >
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="top-logo">
                                <Link to="/">
                                    <img src="/assets/images/logo.svg" alt="" />
                                </Link>
                            </div>
                            <div className="top-search">
                                <div className="">
                                    <select className="form-control" id="enq" name="enq">
                                    <option value="">All Products</option>
                                    <option value="Dealer">Dealer</option>
                                    <option value="Dealer">Distributor</option>
                                    <option value="Dealer">Bulk Enquiry</option>
                                    <option value="Dealer">Importer</option>
                                    <option value="Dealer">Exporter</option>
                                    <option value="Dealer">Retailer</option>
                                    <option value="Dealer">Interior Designer</option>
                                    <option value="Dealer">Architect</option>
                                    <option value="Dealer">Builder</option>
                                    <option value="Dealer">Project </option>
                                    <option value="Dealer">Hotel </option>
                                    <option value="Dealer">Restaurants</option>
                                    <option value="Dealer">Hospital</option>
                                    <option value="Dealer">School/ University/ Hostel</option>
                                    <option value="Dealer">Others</option>
                                    </select>
                                </div>
                                <div className="form-data">
                                    <input className="src-blnk" type="search" placeholder="Search..." />
                                    <ul className="src-fndings">
                                        <li>
                                            <a href="">
                                                <img src="/assets/images/sum-1.png" /> Yamaha FC5 Sustain Pedal for Keyboards and Pianos
                                                <span>Home | Products | Yamaha | FC5 Sustain Pedal for Keyboards and Pianos</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="top-icons">
                                <ul>
                                    <li>
                                        <a href="shopping-cart.html"><img src="/assets/images/cart.png" alt="" /></a>
                                        <span className="cart-tpimg">2</span>
                                    </li>
                                    <li>
                                        <a href="my-account.html"><img src="/assets/images/user.png" alt="" /></a>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
  )
}
