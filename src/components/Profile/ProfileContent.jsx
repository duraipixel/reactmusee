import axios from "axios";
import { useMemo, useState } from "react";
import { Container } from "react-bootstrap"
import { AddressListPane } from "./AddressListPane";
import ChangePassword from "./ChangePassword";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Button, LinearProgress, Tooltip } from "@mui/material";
import { BsFillPinFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom"
import EmptyData from "../EmptyData";
import { clearCart } from "../../app/reducer/cartSlice";
import { logoutCustomer } from "../../app/reducer/customerSlice";
import { useDispatch } from "react-redux";

function ProfileContent({
  states,
  getAddressInfo,
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
}) {
  const handleOpenAddressAddForm = () => {
    setUpdateAddressId(0);
    handleAddressModalShow();
    getAddressInfo(0);
  };

  const join_date = new Date(customer.created_at);
  const [loadingOrderItems, setLoadingOrderItems] = useState(false);
  const [menu, setMenu] = useState("MY_ORDERS");
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setMenu(newValue);
  };

  const logout = () => {
    sessionStorage.removeItem('customer');
    dispatch(clearCart());
    dispatch(logoutCustomer());
    sessionStorage.removeItem('shipping_address');
    sessionStorage.removeItem('cart');
    sessionStorage.removeItem('shiprocket_charges');
    sessionStorage.removeItem('address');
    sessionStorage.removeItem('cart_coupon')
    navigate('/login'); 
}

  function getOrderInfo(id) {
    setLoadingOrderItems(true);
    axios({
      url: window.API_URL + "/get/orders",
      method: "POST",
      data: { customer_id: customer.id },
    }).then((res) => {
      setCustomerOrders(res.data);
      setLoadingOrderItems(false);
    }).catch((err) => { });
  }
  useMemo(() => {
    getOrderInfo()
  }, [])

  return (
    <Container className="py-3 pt-lg-5" style={{ minHeight: '100vh' }}>
      <TabContext value={menu}>
        <div className="card m-0 mt-lg-2">
          <div className="h-200px rounded-top" style={{
            backgroundImage: "url('https://cdn.pixabay.com/photo/2018/07/28/11/08/guitar-3567767_960_720.jpg')",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat"
          }}></div>
          <div className="card-body py-0">
            <div className="d-sm-flex align-items-start text-center text-sm-start">
              <div> 
                <div className="avatar avatar-xxl mt-n5 mb-3">
                  <img className="avatar-img rounded-circle border border-white border-3" src={customer.profile_image !== "" ? customer.profile_image : 'https://cdn.pixabay.com/photo/2016/09/27/23/03/guitar-1699501_960_720.jpg'} alt={customer.first_name} />
                </div>
              </div>
              <div className="ms-sm-4 mt-sm-3">
                <h1 className="mb-0 h5">{customer.first_name} {customer.last_name} <i className="bi bi-patch-check-fill text-success small"></i></h1>
                <p>{customer.email}</p>
              </div>
              <div className="d-flex mt-3 justify-content-center ms-sm-auto">
                <Button variant="contained" color="secondary" type="button" className="me-2 text-white shadow-none border" onClick={() => handlePersonalShow()}>
                  <i className="bi bi-pencil-fill me-1"></i>
                  Edit profile
                </Button>
                <Tooltip title="click to logout your account" arrow placement="top">
                  <Button variant="contained" color="error" type="button" size="sm" onClick={logout}>
                    <i className="bi bi-power fa-fw me-1"></i> Logout
                  </Button>
                </Tooltip>
              </div>
            </div>
            <ul className="list-inline mb-0 text-center text-sm-start mt-3 mt-sm-0 bg-secondary">
              <li className="list-inline-item"><i className="bi bi-telephone me-1"></i> {customer.mobile_no}</li>
              <li className="list-inline-item ms-2"><i className="bi bi-calendar2-plus me-1"></i> Joined on {join_date.getDay()}/{join_date.getMonth()}/{join_date.getFullYear()}</li>
            </ul>
          </div>
          <div className="card-footer mt-3 p-0" style={{ overflow: 'hidden' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} variant="scrollable" scrollButtons="auto" >
                <Tab label="My Orders" value="MY_ORDERS" />
                <Tab label="Address book" value="ADDRESS_BOOK" />
                <Tab label="Change password" value="CHNAGE_PASSWORD" />
              </TabList>
            </Box>
          </div>
        </div>
        <TabPanel value="MY_ORDERS" className="p-0">
          <>
            {
              loadingOrderItems ?
                // <div className="spinner-border text-dark" role="status"></div>
                <LinearProgress />
                :
                customerOrders !== null ?
                  customerOrders.length > 0 ?
                    customerOrders.map((item, i) => (
                      <div className="card card-body mb-3" key={i}>
                        <div className="d-sm-flex align-items-center justify-content-between">
                          <div>
                            <h5 className="mb-1 text-primary fw-light">#{item.order_no}</h5>
                            <p className="small mb-0 text-dark fw-bold"><i className="bi bi-currency-rupee "></i>{item.amount}</p>
                          </div>
                          <div>
                            <Button onClick={() => navigate(`/ordersummary/${item.order_no}`)} variant="contained" color="dark" className="text-white" type="button" size="sm">
                              <BsFillPinFill className="me-1" />
                              Track Order
                            </Button>
                          </div>
                        </div>
                        <ul className="list-group mt-2">
                          {
                            item.items.map((product, i) => (
                              <div key={i} className="d-sm-flex align-items-center py-2 list-group-item list-group-item-action">
                                <div className="avatar">
                                  <a href="#!"><img className="avatar-img rounded border border-white border-3" src={product.image} alt="" /></a>
                                </div>
                                <div className="ms-sm-3 mt-2 mt-sm-0">
                                  <a className="text-secondary fw-semibold"> {product.product_name} </a>
                                  <ul className="nav nav-stack small">
                                    <li className="nav-item text-primary">
                                      <i className="bi bi-currency-rupee"></i> {product.price}
                                    </li>
                                    <li className="nav-item">/  Quantity : <b>{product.quantity}</b></li>
                                  </ul>
                                </div>
                              </div>
                            ))
                          }
                        </ul>
                      </div>
                    ))
                    : <EmptyData title="No Order History Available"/>
                  : null
            }
          </>
        </TabPanel>
        <TabPanel value="ADDRESS_BOOK" className="p-0">
          <>
            <div className="card card-body">
              <div className="d-flex justify-content-between mb-3 align-items-center">
                <b>Address</b>
                <Button variant="outlined" onClick={() => handleOpenAddressAddForm()}>Add a new address </Button>
              </div>
              <div className="row">
                <AddressListPane states={states} handleEditAddressModalShow={handleEditAddressModalShow} setAddressInfo={setAddressInfo} customerAddress={customerAddress} handleAddressModalClose={handleAddressModalClose} handleAddressModalShow={handleAddressModalShow} setCustomerAddress={setCustomerAddress} customer={customer} setUpdateAddressId={setUpdateAddressId} />
              </div>
            </div>
          </>
        </TabPanel>
        <TabPanel value="CHNAGE_PASSWORD" className="p-0">
          <ChangePassword customer={customer} />
        </TabPanel>
      </TabContext>
    </Container>
  )
}

export default ProfileContent