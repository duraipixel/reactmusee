import { useState, React } from "react";
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from "axios";
import { ErrorMessage } from '@hookform/error-message';
import Button from 'react-bootstrap/Button';
import { Card } from "react-bootstrap";

const ChangePassword = ({ customer }) => {
  const [formLoader, setFormLoader] = useState(false);
  const [errorMssage, seterrorMssage] = useState(null);
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
        seterrorMssage(res.data.message)
        setTimeout(() => {
          seterrorMssage(null)
        }, 2500);
        reset();
      } else {
        toast.success(res.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      }
    }).catch((err) => {
    })

  }
  return (
    <form id="passwordForm" className="card col-lg-8" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <Card.Body>
        <div>
          {errorMssage && <p className="text-end text-danger small mb-2" onClick={() => seterrorMssage(null)}>{errorMssage}</p>}
          <div className="mb-3 row m-0">
            <label class="form-label col-md-4 p-0 text-dark">Current Password</label>
            <div className="col-md p-0">
              <input className="form-control" type="password" {...register("currentPassword", { required: "Current Password is required", maxLength: 20 })} placeholder="********" />
              <ErrorMessage errors={errors} name="currentPassword" as="p" className="text-danger" />
            </div>
            <input type="hidden" {...register("customer_id", { required: "Customer id is required" })} id="customer_id" value={customer && customer.id} />
          </div>
          <div className="mb-3 row m-0">
            <label class="form-label col-md-4 p-0 text-dark">New Password</label>
            <div className="col-md p-0">
              <input className="form-control" type="password" {...register("password", { required: "New Password is required", maxLength: 20 })} placeholder="********" />
              <ErrorMessage errors={errors} name="password" as="p" className="text-danger" />
            </div>
          </div>
          <div className="row m-0" >
            <label class="form-label col-md-4 p-0 text-dark">Re-Enter New Password</label>
            <div className="col-md p-0">
              <input className="form-control" type="password" {...register("confirmPassword", {
                required: "Confirm Password is required", validate: (val) => {
                  if (watch('password') != val) {
                    return "Your password does not match";
                  }
                },
              })} placeholder="********" />
              <ErrorMessage errors={errors} name="confirmPassword" as="p" className="text-danger" />
            </div>
          </div>
        </div>
      </Card.Body>
      <Card.Footer>
        <Button type="submit" variant="primary" className="float-end" disabled={formLoader} >
          {formLoader && (
            <span className="spinner-grow spinner-grow-sm"></span>
          )}
          Change password
        </Button>
      </Card.Footer>
    </form>
  );
};

export default ChangePassword;
