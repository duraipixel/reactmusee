import { useState, React } from "react";
import { Fragment } from "react";
import './modal.css';
import { useForm } from 'react-hook-form';
import axios from "axios";
import { Alert, Button, Card, CardContent, TextField } from "@mui/material";
import Backdrop from '@mui/material/Backdrop';

const EditPersonalDetailsModal = ({ setPersonalShow, setCustomer, handlePersonalShow, handlePersonalClose, personalShow, customer }) => {
  const [formLoader, setFormLoader] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

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

  async function updateProfile(formData) {
    setFormLoader(true);
    await axios({
      url: window.API_URL + '/update/profile',
      method: 'POST',
      data: formData,
    }).then((res) => {
      setFormLoader(false);
      setSuccessMessage(res.data.message)
      setTimeout(() => {
        setSuccessMessage(null)
        setPersonalShow(false)
      }, 1000);
      localStorage.setItem('customer', JSON.stringify(res.data.customer_data));
      setCustomer(JSON.parse(window.localStorage.getItem('customer')));
      handlePersonalClose();
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
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={personalShow}
      >
        <Card variant="outlined" className="col-md-5 m-2  position-relative">
          {
            successMessage && 
            <Alert severity="success" variant="filled"  className="position-absolute left-0 top-0 w-100" style={{ zIndex:1 }}>
              {successMessage}
            </Alert>
          }
          <form onSubmit={handleSubmit(updateProfile)} >
            <CardContent>
              <h5 className="text-center mb-3 text-primary"> Update Profile</h5>
              <input type="hidden" {...register("customer_id", { required: "Customer id is required" })} id="customer_id" value={customer && customer.id} />
              <TextField
                error={errors.firstName ? true : false}
                size="small"
                label="First name"
                type="text"
                className="w-100 mb-4"
                {...register("firstName", { required: "First Name is required", maxLength: 50 })}
              />
              <TextField
                error={errors.lastName ? true : false}
                size="small"
                label="Last name"
                type="text"
                className="w-100 mb-4"
                {...register("lastName", { required: "Last Name is required", maxLength: 50 })}
              />
              <TextField
                error={errors.email ? true : false}
                size="small"
                label="Email"
                type="email"
                disabled
                className="w-100 mb-4"
                {...register("email", {
                  required: "Email is required", pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
              />
              <TextField
                error={errors.mobileNo ? true : false}
                size="small"
                label="Mobile"
                type="text"
                maxLength={10} onChange={NumericOnly}
                className="w-100"
                {...register("mobileNo", { required: "Mobile Number is required", minLength: { value: 10, message: "Mobile Number is minimum 10 character" }, maxLength: { value: 10, message: "Mobile Number is maximum 10 character" } })}
              />
            </CardContent>
            <div className="p-3 bg-light text-end">
              <Button variant="outlined" onClick={() => setPersonalShow(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" className="float-end rounded bg-primary ms-2" disabled={formLoader} >
                {formLoader ?
                  <span className="spinner-grow spinner-grow-sm me-1"></span>
                  :
                  <span className="bi bi-repeat me-1"></span>
                }
                Save Changes
              </Button>
            </div>
          </form>
        </Card>
      </Backdrop>
    </Fragment >
  );
};

export default EditPersonalDetailsModal;
