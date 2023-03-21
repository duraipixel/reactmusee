import { useState, React } from "react";
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from "axios";
import { ErrorMessage } from '@hookform/error-message';
import { Card } from "react-bootstrap";
import { Alert, Button, TextField } from "@mui/material";

const ChangePassword = ({ customer }) => {
  const [formLoader, setFormLoader] = useState(false);
  const [errorMssage, seterrorMssage] = useState(null);
  const [successMessage, setsuccessMessage] = useState(null);

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
        }, 4000);
        reset();
      } else {
        setsuccessMessage(res.data.message)
        setTimeout(() => {
          setsuccessMessage(null)
        }, 2000);
      }
    }).catch((err) => {
    })

  }
  return (
    <form id="passwordForm" className="card col-lg-5" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      {errorMssage && <Alert severity="error" className="border border-danger">{errorMssage}</Alert>}
      {successMessage && <Alert severity="success" className="border border-success" >{successMessage}</Alert>}
      <Card.Body>
        <div className="mb-3 fw-bold">Reset your account password</div>
        <TextField
          error={errors.currentPassword ? true : false}
          size="small"
          label="Current Password"
          type="password"
          className="w-100 mb-4"
          {...register("currentPassword", { required: "Current Password is required", maxLength: 20 })}
        />
        <TextField
          error={errors.password ? true : false}
          size="small"
          label="New Password"
          type="password"
          className="w-100 mb-4"
          {...register("password", { required: "New Password is required", maxLength: 20 })}
        />
        <TextField
          error={errors.confirmPassword ? true : false}
          size="small"
          label="Re-Enter the new password"
          type="password"
          className="w-100"
          {...register("confirmPassword", {
            required: "Confirm Password is required", validate: (val) => {
              if (watch('password') != val) {
                return "Your password does not match";
              }
            },
          })}
        />
        <input type="hidden" {...register("customer_id", { required: "Customer id is required" })} id="customer_id" value={customer && customer.id} />
      </Card.Body>
      <Card.Footer>
        <Button type="submit" variant="contained" className="float-end rounded bg-primary" disabled={formLoader} >
          {formLoader ? 
            <span className="spinner-grow spinner-grow-sm me-1"></span>
            :
            <span className="bi bi-repeat me-1"></span>
          }
          Change password
        </Button>
      </Card.Footer>
    </form >
  );
};

export default ChangePassword;
