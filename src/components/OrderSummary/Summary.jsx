import axios from "axios";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Summary = () => {

  const [orderInfo, setOrderInfo] = useState([]);
  const { order_no } = useParams();

  const customer = JSON.parse(window.localStorage.getItem('customer'))

  async function getOrderInfo(order_no) {
    await axios({
      url: window.API_URL + "/get/orderByno",
      method: "POST",
      data: { customer_id: customer.id, order_no: order_no },
    })
      .then((res) => {
        console.log(res.data);
        setOrderInfo(res.data);
      })
      .catch((err) => { });
  }

  useMemo(() => {
    getOrderInfo(order_no)
  }, [])

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
              {/* {
                orderInfo && orderInfo.tracking.length > 0 && end(orderInfo.tracking).map((orderdata) => (
                  console.log(orderdata)
                ))
              } */}
              <h2>Your order History</h2>
            </div>
            <div className="ordercart-list">
              <ul className="track-order">
                {
                  orderInfo && orderInfo.tracking && orderInfo.tracking.length > 0 && orderInfo.tracking.map((item) => (
                    <li className="active">
                      <span>
                        <img src="../assets/images/tick.png" alt="" />
                      </span>
                      <h5>{item.created_at}</h5>
                      <p>{item.description}</p>
                    </li>
                  ))
                }
                {
                  orderInfo.status !== 'delivered' ?
                    <li>
                      <span>
                        <img src="../assets/images/tick.png" alt="" />
                      </span>
                      <h4>Your order will reach you shortly</h4>
                    </li> :
                    null
                }

              </ul>
            </div>
            {/* <div className="status-delvry">
              <h4>Delivery By</h4>
              <h5>
                Blue Dart <span>AWB No: 123-12345678</span>
              </h5>
            </div> */}
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
                    {
                      orderInfo.items && orderInfo.items.length > 0 && orderInfo.items.map((pro) => (
                        <tr>
                          <td>
                            <img src={pro.image} alt="" />
                          </td>
                          <td>{pro.product_name}</td>
                          <td>{pro.quantity}</td>
                          <td>₹{pro.sub_total}</td>
                        </tr>
                      ))
                    }

                  </tbody>
                </table>
              </div>
              <div className="dwd-order">
                <table className="table table-borderless">
                  <tbody>
                    <tr>
                      <td width="350">
                        <a href="">Get Help with this Order</a>
                        <a className="dwd-qry" href={orderInfo.invoice_file}>
                          Download Order Summary
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
                                <span>₹{orderInfo.sub_total}</span>
                              </td>
                            </tr>
                            {
                              orderInfo.tax_amount > 0 &&
                              <tr>
                                <td>
                                  <h3>Taxes</h3>
                                </td>
                                <td width="180">
                                  <span>₹{orderInfo.tax_amount}</span>
                                </td>
                              </tr>
                            }
                            {
                              orderInfo.shipping_amount > 0 &&
                              <tr>
                                <td>
                                  <h3>Shipping</h3>
                                </td>
                                <td width="180">
                                  <span>₹{orderInfo.shipping_amount}</span>
                                </td>
                              </tr>
                            }
                            <tr>
                              <td>
                                <h4>Grand Total</h4>
                              </td>
                              <td width="180">
                                <h5>₹{orderInfo.amount}</h5>
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
