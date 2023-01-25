import React from "react";
import { AddressListPane } from "./AddressListPane";
import axios from 'axios';
import './modal.css';
import OrderListItems from "../OrderSummary/OrderListItems";



const ProfileContent = ({
  setAddressInfo,
  customer,
  handlePersonalShow,
  handlePasswordShow,
  handleAddressModalShow,
  customerAddress,
  handleAddressModalClose,
  setCustomerAddress,
  setUpdateAddressId,
  handleEditAddressModalShow,
  customerOrders,
  setCustomerOrders,
}) => {
  const handleOpenAddressAddForm = () => {
    setUpdateAddressId(0);
    handleAddressModalShow();
    getAddressInfo(0);
  };

  async function getAddressInfo(id) {
    await axios({
      url: window.API_URL + "/get/customer/address",
      method: "POST",
      data: { address_id: id, customer_id: customer.id },
    })
      .then((res) => {
        setAddressInfo(res.data);
      })
      .catch((err) => {});
  }
  async function getOrderInfo(id) {
    await axios({
      url: window.API_URL + "/get/orders",
      method: "POST",
      data: { customer_id: customer.id },
    })
      .then((res) => {
        setCustomerOrders(res.data);
      })
      .catch((err) => {});
  }
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
                  onClick={() => getOrderInfo()}
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
                          className="edit_btn"
                          onClick={() => handlePersonalShow()}
                        >
                          <img src="../assets/images/edit.png" /> Edit{" "}
                        </button>
                      </div>
                      <div className="frame-detils">
                        <h5>First Name</h5>
                        <span>{customer.first_name}</span>
                      </div>
                      <div className="frame-detils">
                        <h5>Last Name</h5>
                        <span>{customer.last_name || "N/A"}</span>
                      </div>
                      <div className="frame-detils">
                        <h5>E-mail</h5>
                        <span>{customer.email}</span>
                      </div>
                      <div className="frame-detils">
                        <h5>Contact Number</h5>
                        <span>{customer.mobile_no}</span>
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
                            {/* <span>Last Profile Changed: {customer.updated_at}</span> */}
                          </div>
                          <div className="load-btn">
                            <button onClick={() => handlePasswordShow()}>
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
                          className="addressAddBtn"
                          onClick={() => handleOpenAddressAddForm()}
                        >
                          <img src="../assets/images/plus.png" />
                          <span>Add Address</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <AddressListPane handleEditAddressModalShow={handleEditAddressModalShow} setAddressInfo={setAddressInfo} customerAddress={customerAddress} handleAddressModalClose={handleAddressModalClose} handleAddressModalShow={handleAddressModalShow} setCustomerAddress={setCustomerAddress} customer={customer} setUpdateAddressId={setUpdateAddressId} />

                </div>
              </div>              
              <OrderListItems customerOrders={customerOrders} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileContent;
