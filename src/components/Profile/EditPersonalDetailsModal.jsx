import { useState, React } from "react";
import { Fragment } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './modal.css';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from "axios";
import { ErrorMessage } from '@hookform/error-message';

const EditPersonalDetailsModal = ({ setCustomer, handlePersonalShow, handlePersonalClose, personalShow, customer }) => {
  const [formLoader, setFormLoader] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      firstName: customer.first_name || '',
      lastName: customer.last_name || '',
      email: customer.email || '',
      mobileNo: customer.mobile_no || '',

    }
  });

  const onSubmit = (data) => {
    updateProfile(data);
  };

  async function updateProfile(formData) {

    setFormLoader(true);
    await axios({
      url: window.API_URL + '/update/profile',
      method: 'POST',
      data: formData,
    }).then((res) => {
      setFormLoader(false);
      if (res.data.error == 1) {
        let error_message = res.data.message;
        error_message.forEach(x => toast.error(x, {
          position: toast.POSITION.BOTTOM_RIGHT
        }));
        reset();
      } else {
        toast.success(res.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT
        });

        localStorage.setItem('customer', JSON.stringify(res.data.customer_data));
        setCustomer(JSON.parse(window.localStorage.getItem('customer')));
        handlePersonalClose();
      }
    }).catch((err) => {
    })

  }

  const NumericOnly = (e) => {
    const reg = /^[0-9\b]+$/
    let preval = e.target.value
    if (e.target.value === '' || reg.test(e.target.value)) return true
    else e.target.value = preval.substring(0, (preval.length - 1))
  }

  return (
    <Fragment>

      <Modal className='cstmzed' show={personalShow} onHide={handlePersonalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit your Personal details</Modal.Title>
        </Modal.Header>
        <form id="profileForm" onSubmit={handleSubmit(onSubmit)} >
          <Modal.Body>
            <div className="row">
              <div className="mb-3 col-lg-6">
                <input type="text" className="form-control" {...register("firstName", { required: "First Name is required", maxLength: 50 })} id="firstName" placeholder="First Name" />
                <ErrorMessage errors={errors} name="firstName" as="p" />
                <input type="hidden" {...register("customer_id", { required: "Customer id is required" })} id="customer_id" value={customer && customer.id} />
              </div>
              <div className="mb-3 col-lg-6">
                <input type="text" className="form-control" {...register("lastName", { required: "Last Name is required", maxLength: 50 })} id="lastName" placeholder="Last Name" />
                <ErrorMessage errors={errors} name="lastName" as="p" />
              </div>
              <div className="mb-3 col-lg-6">
                <input className="form-control" type="email" {...register("email", {
                  required: "Email is required", pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })} placeholder="E-mail" />
                <ErrorMessage errors={errors} name="email" as="p" />
              </div>
              <div className="mb-3 col-lg-6">
                <input type="text" {...register("mobileNo", { required: "Mobile Number is required", minLength: { value: 10, message: "Mobile Number is minimum 10 character" }, maxLength: { value: 10, message: "Mobile Number is maximum 10 character" } })} className="form-control" id="mobileNo" placeholder="Mobile Number" maxLength={10} onChange={NumericOnly} />
                <ErrorMessage errors={errors} name="mobileNo" as="p" />
              </div>
            </div>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handlePersonalClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={formLoader} >
              {formLoader && (
                <span className="spinner-grow spinner-grow-sm"></span>
              )}
              Save Changes
            </Button>
          </Modal.Footer>
        </form>
      </Modal >
    </Fragment >
  );
};

export default EditPersonalDetailsModal;
