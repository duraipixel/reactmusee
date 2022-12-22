import React, { Fragment } from 'react'

import 'font-awesome/css/font-awesome.min.css';

export default function Footer() {
  return (
    <Fragment>
        <footer>
            <div className="container">
                <div className="row">

                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 d-flex justify-content-between">

                        <div className="logo-social">
                            <a href=""><img src="assets/images/bottom-logo.png" /></a>
                            <ul>
                                <li>
                                    <a href=""> <i className="fa fa-facebook" aria-hidden="true"></i> </a>
                                </li>
                                <li>
                                    <a href=""> <i className="fa fa-instagram" aria-hidden="true"></i> </a>
                                </li>
                                <li>
                                    <a href=""> <i className="fa fa-twitter" aria-hidden="true"></i> </a>
                                </li>
                            </ul>
                        </div>

                        <div className="quick-links">
                            <h4>Quick links</h4>
                            <ul>
                                <li><a href="">Musical Instruments</a></li>
                                <li><a href="">Accessories</a></li>
                                <li><a href="">Music Books</a></li>
                                <li><a href="">Professional Audio</a></li>
                                <li><a href="">Shop by Brand</a></li>
                                <li><a href="">Yamaha Music Hub</a></li>
                            </ul>
                        </div>

                        <div className="quick-links">
                            <h4>Information</h4>
                            <ul>
                                <li><a href="">Privacy Policy</a></li>
                                <li><a href="">Terms Of Use</a></li>
                                <li><a href="">Returns Policy</a></li>
                                <li><a href="">Shipping Policy</a></li>
                            </ul>
                        </div>

                        <div className="contact-links">
                            <h4>Information</h4>
                            <ul>
                                <li>
                                    <a href=""><img src="assets/images/loc.png" /> 73, Anna Salai, Chennai – 600 002 </a>
                                </li>
                                <li>
                                    <a href=""><img src="assets/images/mail.png" /> info@museemusical.in </a>
                                </li>
                                <li>
                                    <a href=""><img src="assets/images/call.png" /> +91 44 2852 2780 <br />+91 44 2851 6474 </a>
                                </li>
                            </ul>
                        </div>

                    </div>

                </div>
            </div>
        </footer>
    </Fragment>
  )
}
