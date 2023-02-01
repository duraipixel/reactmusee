import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { ErrorMessage } from '@hookform/error-message';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export const CancelOrderRequested = ({ orderId, handleCancelRequestShow, cancelShow, handleCancelRequestClose, customer}) => {

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
            toast.error(res.data.message, {
              position: toast.POSITION.BOTTOM_RIGHT
            });
            reset();
          } else {
            toast.success(res.data.message, {
              position: toast.POSITION.BOTTOM_RIGHT
            });
    
            handleCancelRequestClose();
          }
        }).catch((err) => {
        })
    
      }

    return (
        <Modal className='passwordModal cstmzed' show={cancelShow} onHide={handleCancelRequestClose}>
            <Modal.Header closeButton>
                <Modal.Title> Request Cancel Order </Modal.Title>
            </Modal.Header>
            <form id="cancelOrderForm" onSubmit={handleSubmit(onSubmit)} >
                <Modal.Body>
                    <div className="row">
                        <div className="mb-3 col-lg-12">
                            <textarea className='form-control' {...register("cancelReason", { required: "Cancel Reason is required"})}></textarea>
                            <ErrorMessage errors={errors} name="cancelReason" as="p" />
                            <input type="hidden" {...register("customer_id", { required: "Customer id is required" })} id="customer_id" value={customer && customer.id} />
                            <input type="hidden" {...register("order_id", { required: "Order id is required" })} id="order_id" value={orderId && orderId} />
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancelRequestClose}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="primary" disabled={formLoader} >
                        {formLoader && (
                            <span className="spinner-grow spinner-grow-sm"></span>
                        )}
                        Save
                    </Button>
                </Modal.Footer>
            </form>
        </Modal >
    )
}
