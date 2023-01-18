import React from "react";
import { Link } from "react-router-dom";

const ProfileContent = () => {
  return (
    <section className="tab-of-sectors">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="common-heads text-center">
              <h2>My Account</h2>
            </div>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12">
            <ul
              className="nav nav-tabs text-center justify-content-between"
              id="myTab"
              role="tablist"
            >
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#profile"
                  type="button"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="true"
                >
                  My Profile
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="addressbook-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#addressbook"
                  type="button"
                  role="tab"
                  aria-controls="addressbook"
                  aria-selected="false"
                >
                  Address Book
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="orders-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#orders"
                  type="button"
                  role="tab"
                  aria-controls="orders"
                  aria-selected="false"
                >
                  My Orders
                </button>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="profile"
                role="tabpanel"
                aria-labelledby="profile-tab"
              >
                <div className="row justify-content-center">
                  <div className="col-lg-10">
                    <div className="presonal-detils">
                      <div className="deatils-fill d-flex justify-content-between">
                        <h4 className="accnt-deti">Personal Details</h4>
                        <button
                          data-bs-toggle="modal"
                          className="link-btn"
                          data-bs-target="#exampleModal"
                        >
                          <img src="../assets/images/edit.png" /> Edit{" "}
                        </button>
                      </div>
                      <div className="frame-detils">
                        <h5>First Name</h5>
                        <span>Kabir</span>
                      </div>
                      <div className="frame-detils">
                        <h5>Last Name</h5>
                        <span>Oberoi</span>
                      </div>
                      <div className="frame-detils">
                        <h5>E-mail</h5>
                        <span>kabir.o_6396@gmail.com</span>
                      </div>
                      <div className="frame-detils">
                        <h5>Contact Number</h5>
                        <span>+91 12345 12345</span>
                      </div>

                      <div className="deatils-fill">
                        <h4 className="accnt-deti">Security Settings</h4>

                        <div className="frame-detils mb-0 d-flex justify-content-between align-items-center">
                          <div className="paswrd-set">
                            <h5>Password</h5>
                            <ul>
                              <li></li>
                              <li></li>
                              <li></li>
                              <li></li>
                              <li></li>
                              <li></li>
                              <li></li>
                              <li></li>
                              <li></li>
                            </ul>
                            <span>Last Changed: 4 May 2022</span>
                          </div>
                          <div className="load-btn">
                            <button
                              data-bs-toggle="modal"
                              className="link-btn"
                              data-bs-target="#passwordModal"
                            >
                              Change Password
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="tab-pane fade"
                id="addressbook"
                role="tabpanel"
                aria-labelledby="addressbook-tab"
              >
                <div className="row">
                  <div className="col-lg-4">
                    <div className="adres-det ad-ing d-flex align-items-center">
                      <div className="text-center w-100">
                        <button
                          data-bs-toggle="modal"
                          className="link-btn"
                          data-bs-target="#addressModal"
                        >
                          <img src="../assets/images/plus.png" />
                          <span>Add Address</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="adres-det">
                      <div className="d-flex justify-content-between">
                        <h4>Kabir L</h4>
                        <span>
                          <img src="../assets/images/locate.png" /> Default
                          Address
                        </span>
                      </div>
                      <ul>
                        <li>
                          1833, 18th Main Road, Thiruvalluvar Colony, Anna Nagar
                          West
                        </li>
                        <li>Chennai - 600040</li>
                        <li>Tamil Nadu, India</li>
                        <li>Phone: +91 00000 00000</li>
                      </ul>
                      <ul className="lst-edit">
                        <li>
                          <a href=""> Edit </a>
                        </li>
                        <li>
                          <a href=""> Remove </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="adres-det">
                      <div className="d-flex justify-content-between">
                        <h4>Naya</h4>
                      </div>
                      <ul>
                        <li>
                          1833, 18th Main Road, Thiruvalluvar Colony, Anna Nagar
                          West
                        </li>
                        <li>Chennai - 600040</li>
                        <li>Tamil Nadu, India</li>
                        <li>Phone: +91 00000 00000</li>
                      </ul>
                      <ul className="lst-edit">
                        <li>
                          <a href=""> Edit </a>
                        </li>
                        <li>
                          <a href=""> Remove </a>
                        </li>
                        <li>
                          <a href=""> Set as Default </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="adres-det">
                      <div className="d-flex justify-content-between">
                        <h4>Inaya</h4>
                      </div>
                      <ul>
                        <li>
                          1833, 18th Main Road, Thiruvalluvar Colony, Anna Nagar
                          West
                        </li>
                        <li>Chennai - 600040</li>
                        <li>Tamil Nadu, India</li>
                        <li>Phone: +91 00000 00000</li>
                      </ul>
                      <ul className="lst-edit">
                        <li>
                          <a href=""> Edit </a>
                        </li>
                        <li>
                          <a href=""> Remove </a>
                        </li>
                        <li>
                          <a href=""> Set as Default </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="tab-pane fade"
                id="orders"
                role="tabpanel"
                aria-labelledby="orders-tab"
              >
                <div className="myorders-lsts">
                  <div className="col-lg-12">
                    <table className="table">
                      <tbody>
                        <tr>
                          <td width="180">
                            <h5>
                              Order placed on: <span>25 October 2022</span>
                            </h5>
                          </td>
                          <td width="180">
                            <h5>
                              Order ID: <span>403-9499889-4551543</span>
                            </h5>
                          </td>
                          <td>
                            <h5>
                              Ship to: <span>Kabir L</span>
                            </h5>
                          </td>
                          <td>
                            <a className="" href="">
                              View Order Details
                              <img src="../assets/images/bckp.png" />
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="productlist-detail">
                      <div className="row align-items-center">
                        <div className="col-lg-9">
                          <div className="prodtlst-detils align-items-center">
                            <ul>
                              <li>
                                <img src="../assets/images/det-1.jpg" />
                                <h4>Yamaha PSR-I500 Portable Keyboard</h4>
                              </li>
                              <li>
                                <img src="../assets/images/det-2.jpg" />
                                <h4>
                                  Yamaha FC5 Sustain Pedal for Keyboards and
                                  Pianos
                                </h4>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <div className="amt-prc text-center">
                            <h4>₹27,515.22</h4>
                            <Link className="trc-ordr" to="/ordersummary">
                              Track Order
                            </Link>
                            <a className="in-vce" href="">
                              View Invoice
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="myorders-lsts">
                  <div className="col-lg-12">
                    <table className="table">
                      <tbody>
                        <tr>
                          <td width="180">
                            <h5>
                              Order placed on: <span>25 October 2022</span>
                            </h5>
                          </td>
                          <td width="180">
                            <h5>
                              Order ID: <span>403-9499889-4551543</span>
                            </h5>
                          </td>
                          <td>
                            <h5>
                              Ship to: <span>Kabir L</span>
                            </h5>
                          </td>
                          <td>
                            <a className="" href="">
                              View Order Details
                              <img src="../assets/images/accordion-arrow.png" />
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="productlist-detail">
                      <div className="row align-items-center">
                        <div className="col-lg-9">
                          <div className="prodtlst-detils align-items-center">
                            <ul>
                              <li>
                                <img src="../assets/images/det-3.jpg" />
                                <h4>
                                  Yamaha FC5 Sustain Pedal for Keyboards and
                                  Pianos
                                </h4>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <div className="amt-prc text-center">
                            <h4>₹9,515.22</h4>
                            <a className="trc-ordr" href="">
                              Buy it Again
                            </a>
                            <a className="in-vce" href="">
                              View Invoice
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileContent;
