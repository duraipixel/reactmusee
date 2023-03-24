import axios from 'axios';
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { ErrorMessage } from '@hookform/error-message';
import Modal from 'react-bootstrap/Modal';
import { Button, TextField } from '@mui/material';

export const CancelOrderRequested = ({ orderId, handleCancelRequestShow, cancelShow, handleCancelRequestClose, customer }) => {

  const [formLoader, setFormLoader] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = (data) => {
    updateCancelOrder(data);
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

  return (
    <Modal
      className='passwordModal cstmzed'
      size="md"
      backdrop="static"
      keyboard={false}
      show={cancelShow}
      onHide={handleCancelRequestClose}
    >
      <Modal.Header closeButton className='bg-light'>
        <Modal.Title> <h5 className='text-primary fw-bold'>Request Cancel Order</h5> </Modal.Title>
      </Modal.Header>
      <form id="cancelOrderForm" onSubmit={handleSubmit(onSubmit)} >
        <Modal.Body>
          <div className="row">
            <div className="col-lg-12">
              <TextField
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
              <input type="hidden" {...register("customer_id", { required: "Customer id is required" })} id="customer_id" value={customer && customer.id} />
              <input type="hidden" {...register("order_id", { required: "Order id is required" })} id="order_id" value={orderId && orderId} />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className='justify-content-end'>
          <Button variant="secondary" className='bg-light border me-2' onClick={handleCancelRequestClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" className='btn-dark text-white' disabled={formLoader} >
            {formLoader ? (
              <span className="spinner-grow spinner-grow-sm me-1"></span>
            ) : <i className='bi bi-send-fill me-1'></i>}
            Send request
          </Button>
        </Modal.Footer>
      </form>
    </Modal >
  )
}
