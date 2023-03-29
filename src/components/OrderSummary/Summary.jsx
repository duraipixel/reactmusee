import axios from "axios";
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import './order.css';
import { CancelOrderRequested } from './CancelOrderRequested';
import TimeLineContent from './TimeLineContent'
import { Button } from "@mui/material";

const Summary = () => {
  const [orderInfo, setOrderInfo] = useState([]);
  const [orderId, setOrderId] = useState('');
  const { order_no } = useParams();
  const [cancelShow, setCancelShow] = useState(false);
  const customer = JSON.parse(window.localStorage.getItem('customer')) 

  const handleCancelRequestShow = (id) => {
    setCancelShow(true)
    setOrderId(id);
  }

  const handleCancelRequestClose = () => {
    document.getElementById('cancelOrderForm').reset();
    setCancelShow(false)
  } 

  async function getOrderInfo(order_no) {
    await axios({
      url: window.API_URL + "/get/orderByno",
      method: "POST",
      data: { customer_id: customer.id, order_no: order_no },
    })
      .then((res) => {
        setOrderInfo(res.data);
      })
      .catch((err) => { });
  }

  useMemo(() => {
    getOrderInfo(order_no)
  }, [])

  useMemo(() => {
    window.scroll(0, 0)
  }, [orderInfo])

  return (
    <section className="shop-carts ordes-lsts">
      <div className="container">
        <div className="row justify-content-center">
          {/* <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="order-fist text-left">
              <Link to="/profile">
                <img src="../assets/../assets/images/bckp.png" alt="" /> Back to
                All Orders
              </Link>
            </div>
          </div> */}
          <div className="col-lg-4 ">
            <Link to="/profile" className="ms-3 text-secondary">
              <i claclassName="bi bi-chevron-left"></i> My Orders
            </Link>
            <h4 className="text-primary ms-3 my-3">Your order History</h4>
            {orderInfo.items && orderInfo.items.length > 0 && <TimeLineContent orders={orderInfo} />}
          </div>
          <div className="col-lg-6">
            <div className="card my-3">
              <div className="card-body">
                <h2 claclassName="h5 mb-3">Summary</h2>
                <ul claclassName="list-group">
                  {
                    orderInfo.items && orderInfo.items.length > 0 && orderInfo.items.map((pro, i) => (
                      <li claclassName="list-group-item d-sm-flex  justify-content-between">
                        <div className="d-sm-flex m-0">
                          <div className="py-2">
                            <img src={pro.image} width="50px" className="me-2" />
                          </div>
                          <div className="p-2">
                            <p className="fs-6">{pro.product_name}</p>
                            <b>Qty : </b> {pro.quantity}
                          </div>
                        </div>
                        <div className="text-dark fw-bold p-2">₹ {pro.sub_total}</div>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
            <div className="card my-3">
              <div className="card-body">
                <ul claclassName="list-unstyled fs-sm m-0">
                  <li claclassName="d-flex justify-content-between align-items-center mb-1"><span claclassName="me-2">Subtotal:</span><span claclassName="text-end">₹{orderInfo?.sub_total}</span></li>
                  {orderInfo.tax_amount > 0 && <li claclassName="d-flex justify-content-between align-items-center"><span claclassName="me-2">Taxes:</span><span claclassName="text-end">₹{orderInfo?.tax_amount}</span></li>}
                  {orderInfo.shipping_amount > 0 && <li claclassName="d-flex justify-content-between align-items-center fs-base"><span claclassName="me-2">Total:</span><span claclassName="text-end">₹{orderInfo?.shipping_amount}</span></li>}
                  <li claclassName="text-dark d-flex justify-content-between align-items-center fs-6 mt-2"><span claclassName="me-2 fw-bold">Total:</span><span claclassName="text-end fw-bold fs-5">₹{orderInfo?.amount}</span></li>
                </ul>
              </div>
            </div>
            <div className="text-sm-end text-center">
              <Button variant="contained" className="btn btn-light bg-light text-dark shadow-none border mb-3 ms-2" onClick={() => handleCancelRequestShow(orderInfo.id)}>   Cancel Order </Button>
              <Button onClick={() => window.open(orderInfo.invoice_file, '_blank')} variant="contained" className="rounded mb-3 btn-dark ms-2">  order invoice </Button>
            </div>
          </div>
        </div>
      </div>
      <CancelOrderRequested orderId={orderId} handleCancelRequestShow={handleCancelRequestShow} cancelShow={cancelShow} handleCancelRequestClose={handleCancelRequestClose} customer={customer} />
    </section>
  );
};

export default Summary;
