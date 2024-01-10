import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useQuickLinkQuery } from "../../app/services/quickLinkApi";
import "./footer.css";

export default function Footer({ getSubMenu }) {
  const { data, error, isLoading, isFetching, isSuccess } = useQuickLinkQuery();

  return (
    <Fragment>
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 d-flex justify-content-between">
              <div className="logo-social">
                <a href="">
                  <img
                    src={require("../../assets/images/logo.png")}
                    alt="logo"
                  />
                </a>
                <ul style={{ transform: "translateX(30px)" }}>
                  <li>
                    <Link to="https://www.facebook.com/museemusicalofficial">
                      <i className="fa fa-facebook" aria-hidden="true"></i>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="https://www.instagram.com/museemusical"
                      target="_blank"
                    >
                      <i className="fa fa-instagram" aria-hidden="true"></i>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="https://youtube.com/@musee.musical"
                      target="_blank"
                    >
                      <i className="fa fa-youtube" aria-hidden="true"></i>
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="quick-links">
                <h4>Quick links</h4>
                <ul>
                  {isSuccess &&
                    data.data.length > 0 &&
                    data.data.map((item, i) => (
                      <li key={i}>
                        {/* <label className='footer_links' onClick={() => getSubMenu(item.slug)}> 
                                                    {item.name}
                                                </label> */}
                        <a href={item.url}> {item.name}</a>
                        {/* <Link to={item.url} target="_blank">{item.name}</Link> */}
                      </li>
                    ))}
                </ul>
              </div>

              <div className="quick-links">
                <h5>Information</h5>
                <ul>
                  <li>
                    <Link to="/privacypolicy">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link to="/TermsofUse">Terms of Use</Link>
                  </li>
                  <li>
                    <Link to="/returnpolicy">Returns Policy</Link>
                  </li>
                  <li>
                    <Link to="/shippingpolicy">Shipping Policy</Link>
                  </li>
                </ul>
              </div>

              <div className="contact-links">
                <h6>Contact Us</h6>
                <ul>
                  <li>
                    <a
                      className="text-secondary"
                      target="_blank"
                      href="https://goo.gl/maps/1M68TMxcuZBPk6uPA"
                    >
                      <i className="fa fa-map-marker me-2"></i> 73, Anna Salai,
                      Chennai – 600 002
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-secondary"
                      href="mailto:support@museemusical.in"
                    >
                      <i className="fa fa-envelope me-2"></i>{" "}
                      support@museemusical.in
                    </a>
                  </li>
                  <li>
                    <a className="text-secondary" href="tel:18005710119">
                      <i className="fa fa-phone me-2"></i> 18005710119
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </Fragment>
  );
}
