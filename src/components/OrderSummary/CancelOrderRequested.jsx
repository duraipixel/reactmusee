import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ErrorMessage } from "@hookform/error-message";
import Modal from "react-bootstrap/Modal";
import {
  Button,
  FormLabel,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";

export const CancelOrderRequested = ({
  orderId,
  handleCancelRequestShow,
  cancelShow,
  handleCancelRequestClose,
  customer,
}) => {
  const [formLoader, setFormLoader] = useState(false);
  const [cancelOrderInputRadio, setCancelOrderInputRadio] = useState(false);
  const [textFieldNotShow, setTextFieldNotShow] = useState(true);
  const [radioValue, setRadioValue] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    updateCancelOrder(data);
  };
  const handleChange = (e) => {
    setRadioValue(e.target.value);
  };
  async function updateCancelOrder(formData) {

    setFormLoader(true);
    await axios({
      url: window.API_URL + '/cancel/request/orders',
      method: 'POST',
      data: formData,
    }).then((res) => {
      setFormLoader(false);
      if (res.data.error == 1) {
        toast.error(res.data.message);
        reset();
      } else {
        toast.success(res.data.message);
        handleCancelRequestClose();
      }
    }).catch((err) => {
    })

  }

  async function CancelOrder() {
    await axios({
      url: window.API_URL + "/get/orderCancelReason",
      method: "get",
    })
      .then((res) => {
        setCancelOrderInputRadio(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    CancelOrder();
  },[]);
  useEffect(()=>{
    if (radioValue === "other") {
      setTextFieldNotShow(false);
    } else {
      setTextFieldNotShow(true);
    }
  })
  return (
    <Modal
      className="passwordModal cstmzed"
      size="md"
      backdrop="static"
      keyboard={false}
      show={cancelShow}
      onHide={handleCancelRequestClose}
    >
      <Modal.Header closeButton className="bg-light">
        <Modal.Title>
          {" "}
          <h5 className="text-primary fw-bold">Request Cancel Order</h5>{" "}
        </Modal.Title>
      </Modal.Header>
      <form id="cancelOrderForm" onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <div className="row">
            <div className="col-lg-12">
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label" className="h3">
                  Reason
                </FormLabel>
                <RadioGroup
                  className="mt-1"
                  onChange={handleChange}
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="none"
                  name="radio-buttons-group"
                >
                  {cancelOrderInputRadio &&
                    cancelOrderInputRadio.map((item, i) => {
                      return (
                        <FormControlLabel
                          key={i}
                          value={item.name}
                          control={<Radio />}
                          label={item.name}
                          className="fs-6"
                        />
                      );
                    })}
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              </FormControl>
              <TextField
                className="mt-3"
                hidden={textFieldNotShow}
                id="outlined-textarea"
                label="Your comments"
                placeholder="Type here...."
                multiline
                rows={8}
                autoFocus={true}
                errors={errors.cancelReason ? true : false}
                fullWidth
                inputProps={{ maxLength: 500 }}
                {...register("cancelReason", { required: true })}
              />
              <input
                type="hidden"
                {...register("customer_id", {
                  required: "Customer id is required",
                })}
                id="customer_id"
                value={customer && customer.id}
              />
              <input
                type="hidden"
                {...register("order_id", { required: "Order id is required" })}
                id="order_id"
                value={orderId && orderId}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-end">
          <Button
            variant="secondary"
            className="bg-light border me-2"
            onClick={handleCancelRequestClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="btn-dark text-white"
            disabled={formLoader}
          >
            {formLoader ? (
              <span className="spinner-grow spinner-grow-sm me-1"></span>
            ) : (
              <i className="bi bi-send-fill me-1"></i>
            )}
            Send request
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
