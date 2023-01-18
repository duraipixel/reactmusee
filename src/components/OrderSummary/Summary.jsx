import React from "react";
import { Link } from "react-router-dom";

const Summary = () => {
  return (
    <section className="shop-carts ordes-lsts">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="order-fist text-left">
              <Link to="/profile">
                <img src="../assets/../assets/images/bckp.png" alt="" /> Back to
                All Orders
              </Link>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="common-heads text-left">
              <h2>Your order has been shipped and it’s out for delivery</h2>
            </div>
            <div className="ordercart-list">
              <ul className="track-order">
                <li className="active">
                  <span>
                    <img src="../assets/images/tick.png" alt="" />
                  </span>
                  <h5>10:30 AM - 25 October 2022</h5>
                  <p>Your order has been placed successfully</p>
                </li>
                <li className="active">
                  <span>
                    <img src="../assets/images/tick.png" alt="" />
                  </span>
                  <h5>10:30 AM - 25 October 2022</h5>
                  <p>Your order has been placed successfully</p>
                </li>
                <li className="active nearby">
                  <span>
                    <img src="../assets/images/tick.png" alt="" />
                  </span>
                  <h5>10:30 AM - 25 October 2022</h5>
                  <p>Your order has been placed successfully</p>
                </li>
                <li>
                  <span>
                    <img src="../assets/images/tick.png" alt="" />
                  </span>
                  <h4>Your order will reach you shortly</h4>
                </li>
              </ul>
            </div>
            <div className="status-delvry">
              <h4>Delivery By</h4>
              <h5>
                Blue Dart <span>AWB No: 123-12345678</span>
              </h5>
            </div>
          </div>

          <div className="col-lg-7">
            <div className="cart-boduy">
              <h4>Order Summary</h4>
              <div className="order-frequent">
                <table className="table table-borderless">
                  <tbody>
                    <tr>
                      <th>Product</th>
                      <th>&nbsp;</th>
                      <th width="120">Quantitty</th>
                      <th width="120">Price</th>
                    </tr>
                    <tr>
                      <td>
                        <img src="../assets/images/sum-2.png" alt="" />
                      </td>
                      <td>Yamaha PSR-I500 Portable Keyboard</td>
                      <td>1</td>
                      <td>₹21,498</td>
                    </tr>
                    <tr>
                      <td>
                        <img src="../assets/images/sum-1.png" alt="" />
                      </td>
                      <td>Yamaha FC5 Sustain Pedal for Keyboards and Pianos</td>
                      <td>1</td>
                      <td>₹21,498</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="dwd-order">
                <table className="table table-borderless">
                  <tbody>
                    <tr>
                      <td width="350">
                        <a href="">Get Help with this Order</a>
                        <a className="dwd-qry" href="">
                          {" "}
                          Download Order Summary{" "}
                        </a>
                      </td>
                      <td>
                        <table className="table table-borderless">
                          <tbody>
                            <tr>
                              <td>
                                <h3>Sub Total</h3>
                              </td>
                              <td width="180">
                                <span>₹22,897</span>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <h3>Taxes</h3>
                              </td>
                              <td width="180">
                                <span>₹22,897</span>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <h3>Shipping</h3>
                              </td>
                              <td width="180">
                                <span>₹500</span>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <h4>Grand Total</h4>
                              </td>
                              <td width="180">
                                <h5>₹27,515.22</h5>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Summary;
