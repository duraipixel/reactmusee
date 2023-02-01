import React from "react";
import { Link } from "react-router-dom";

const OrderListItems = ({ customerOrders, loadingOrderItems }) => {
  // console.log(customerOrders, 'customerOrders')
  return (
    <div
      className="tab-pane fade"
      id="orders"
      role="tabpanel"
      aria-labelledby="orders-tab"
    >
      {customerOrders && customerOrders.length > 0 ? (
        customerOrders.map((item, i) => (
          <div className="myorders-lsts" key={i}>
            <div className="col-lg-12">
              <table className="table">
                <tbody>
                  <tr>
                    <td width="180">
                      <h5>
                        Order placed on: <span>{item.order_date}</span>
                      </h5>
                    </td>
                    <td width="180">
                      <h5>
                        Order ID: <span>{item.order_no}</span>
                      </h5>
                    </td>
                    <td>
                      <h5>
                        Ship to: <span>{item.customer.first_name}</span>
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
                        {item.items &&
                          item.items.map((item, i) => (
                            <li key={i}>
                              <img
                                src={item.image}
                                style={{
                                  maxWidth: "12rem",
                                  maxHeight: "8rem",
                                }}
                              />
                              <h4>{item.product_name}</h4>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="amt-prc text-center">
                      <h4>₹{item.amount}</h4>
                      {
                        item.tracking.length > 0 &&
                        <Link className="trc-ordr" to={`/ordersummary/${item.order_no}`}>
                          Track Order
                        </Link>
                      }
                      <a
                        className="in-vce"
                        href={item.invoice_file}
                        target="_blank"
                      >
                        View Invoice
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (


        loadingOrderItems ?
          <section className="shop-carts">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <div className="common-heads text-center">
                    <h2>Please wait checking your orders.....</h2>
                  </div>
                </div>
              </div>
            </div>
          </section>
          :


          <section className="shop-carts">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <div className="common-heads text-center">
                    <h2>Your basket is empty!</h2>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="finalcart-list text-center">
                    <img
                      className="no-order-image"
                      src="../../assets/illustrations/sigma-1/9-dark.png"
                      alt="call"
                    />
                    <br />
                    <div className="load-btn">
                      <a href="/"> Shop today’s deals </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
      )}
    </div>
  );
};

export default OrderListItems;
