import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';



export default function Footer() {
    return (
        <Fragment>
            <footer>
                <div className="container">
                    <div className="row">

                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 d-flex justify-content-between">

                            <div className="logo-social">
                                <a href=""><img src="/assets/images/bottom-logo.png" /></a>
                                <ul>
                                    <li>
                                        <Link to='https://www.facebook.com/museemusicalofficial'>
                                            <i className="fa fa-facebook" aria-hidden="true"></i>
                                        </Link>
                                        
                                    </li>
                                    <li>
                                        <Link to='https://www.instagram.com/museemusical' target="_blank">
                                            <i className="fa fa-instagram" aria-hidden="true"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='https://youtube.com/@musee.musical' target="_blank">
                                            <i className="fa fa-youtube" aria-hidden="true"></i>
                                        </Link>
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
                                <li>
                                    <Link to='/privacypolicy'>Privacy Policy</Link>
                                </li>
                                <li>
                                    <Link to='/TermsofUse'>Terms of Use</Link>
                                </li>
                                <li>
                                    <Link to='/returnpolicy'>Returns Policy</Link>
                                </li>
                                <li>
                                    <Link to='/shippingpolicy'>Shipping Policy</Link>
                                </li> 
                                </ul>
                            </div>

                            <div className="contact-links">
                                <h4>Information</h4>
                                <ul>
                                    <li>
                                        <img src="/assets/images/loc.png" /> 73, Anna Salai, near Devi Theatre,<br />Mount Road, Border Thottam, Padupakkam, <br />Triplicane, Chennai, Tamil Nadu 600002
                                    </li>
                                    <li>
                                        <img src="/assets/images/mail.png" /> support@museemusical.in
                                    </li>
                                    <li>
                                        <img src="/assets/images/call.png" /> +91 9940046621 
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
