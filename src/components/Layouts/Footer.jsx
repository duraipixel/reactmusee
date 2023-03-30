import { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { useTopMenuQuery } from '../../app/services/topMenuApi';
import './footer.css';


export default function Footer({getSubMenu}) {
    const { data, error, isLoading, isFetching, isSuccess } = useTopMenuQuery();
    return (
        <Fragment>
            <footer>
                <div className="container">
                    <div className="row">

                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 d-flex justify-content-between">

                            <div className="logo-social">
                                <a href=""><img src={require('../../assets/images/logo.png')} /></a>
                                <ul style={{ transform: 'translateX(30px)' }}>
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
                                {
                                        isSuccess && data.data.length > 0 && data.data.map((item, i) => (
                                            <li key={i}>
                                                <label className='footer_links' onClick={() => getSubMenu(item.slug)}> 
                                                    {item.name}
                                                </label>
                                            </li>
                                        ))
                                    }
                                    <li>
                                        <Link to='/brand'>Shop by Brand</Link>
                                    </li>
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
                                <h4>Contact Us</h4>
                                <ul>
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
