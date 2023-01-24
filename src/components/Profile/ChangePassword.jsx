import { useState, React } from "react";
import './modal.css';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from "axios";
import { ErrorMessage } from '@hookform/error-message';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ChangePassword = ({passwordShow, handlePasswordClose, handlePasswordShow, customer}) => {
  const [formLoader, setFormLoader] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = (data) => {
    updatePassword(data);
  };

  async function updatePassword(formData) {

    setFormLoader(true);
    await axios({
      url: window.API_URL + '/change/password',
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

        handlePasswordClose();
      }
    }).catch((err) => {
    })

  }
  return (
    <Modal className='passwordModal' show={passwordShow} onHide={handlePasswordClose}>
      <Modal.Header closeButton>
        <Modal.Title> Change Password </Modal.Title>
      </Modal.Header>
      <form id="passwordForm" onSubmit={handleSubmit(onSubmit)} >
        <Modal.Body>
          <div className="row">
            <div className="mb-3 col-lg-12">
              <input className="form-control" type="password" {...register("currentPassword", { required: "Current Password is required", maxLength: 20 })} placeholder="Current Password" />
              <ErrorMessage errors={errors} name="currentPassword" as="p" />
              <input type="hidden" {...register("customer_id", { required: "Customer id is required"})} id="customer_id" value={customer && customer.id} />
            </div>
            <div className="mb-3 col-lg-12">
              <input className="form-control" type="password" {...register("password", { required: "New Password is required", maxLength: 20 })} placeholder="New Password" />
              <ErrorMessage errors={errors} name="password" as="p" />
            </div>
            <div className="mb-3 col-lg-12" >
              <input className="form-control" type="password" {...register("confirmPassword", {
                required: "Confirm Password is required", validate: (val) => {
                  if (watch('password') != val) {
                    return "Your password does not match";
                  }
                },
              })} placeholder="Re-Enter New Password" />
              <ErrorMessage errors={errors} name="confirmPassword" as="p" />
            </div>
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlePasswordClose}>
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

  );
};

export default ChangePassword;
