import { useState } from "react";
import './modal.css';
import { toast } from 'react-toastify';
import axios from "axios";
import {  Button, Card, CardContent, TextField, MenuItem, FormControl, Select, InputLabel } from "@mui/material";
import Backdrop from '@mui/material/Backdrop';
import { useForm } from 'react-hook-form';

const AddAddress = ({ addressType, states, addressInfo, addressFormShow, handleAddressModalClose, handleAddressModalShow, customer, setCustomerAddress, customerAddress, updateAddressId }) => {
  const [formLoader, setFormLoader] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  async function addUpdateAddress(formData) {
    formData.customer_id = customer.id
    setFormLoader(true);
    await axios({
      url: window.API_URL + '/update/customer/address',
      method: 'POST',
      data: formData,
    }).then((res) => {
      setFormLoader(false);
      if (res.data.error == 1) {
        let error_message = res.data.message;
        error_message.forEach(x => toast.error(x, {
          position: toast.POSITION.BOTTOM_RIGHT
        }));
      } else {
        localStorage.setItem('address', JSON.stringify(res.data.customer_address));
        toast.success(res.data.message)
        setTimeout(() => {
          handleAddressModalClose();
          reset()
          setCustomerAddress(JSON.parse(window.localStorage.getItem('address')));
        }, 1000);
      }
    }).catch((err) => {
    }) 
  }

  return (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={addressFormShow}>
      <Card variant="outlined" className="col-md-5 m-2  position-relative">
        <form onSubmit={handleSubmit(addUpdateAddress)} id="addressForm">
          <CardContent>
            <h5 className="text-center mb-3 text-primary">Create new address</h5>
            <TextField
              size="small"
              label="Name"
              type="text"
              className="w-100 mb-4"
              error={errors.name ? true : false}
              {...register("name", { required: true, maxLength: 50 })}
            />
            <TextField
              size="small"
              label="Mobile"
              type="number"
              className="w-100 mb-4"
              error={errors.mobile_no ? true : false}
              {...register("mobile_no", { required: true, maxLength: 10, minLength: 10 })}
            />
            <FormControl fullWidth>
              <InputLabel size="small" id="address-type-label">Address type</InputLabel>
              <Select
                labelId="address-type-label"
                id="demo-simple-select"
                label="Address type"
                size="small"
                className="mb-4"
                error={errors.address_type_id ? true : false}
                {...register("address_type_id", { required: true })}
              >
                {addressType && addressType.length > 0 && addressType.map((item) => (
                  <MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              size="small"
              label="Building Number, Street Name & Locality"
              type="text"
              className="w-100 mb-4"
              error={errors.address_line ? true : false}
              {...register("address_line", { required: true })}
            />
            <TextField
              size="small"
              label="City"
              type="text"
              className="w-100 mb-4"
              error={errors.city ? true : false}
              {...register("city", { required: true })}
            />
            <TextField
              size="small"
              label="Postcode"
              type="text"
              className="w-100 mb-4"
              error={errors.post_code ? true : false}
              {...register("post_code", { required: true, maxLength: 10 })}
            />
            <FormControl fullWidth>
              <InputLabel size="small" id="state-type-label">State</InputLabel>
              <Select
                labelId="state-type-label"
                id="demo-simple-select"
                label="State"
                size="small"
                className="mb-4"
                error={errors.stateid ? true : false}
                {...register("stateid", { required: true })}
              >
                {states && states.length > 0 && states.map((item) => (
                  <MenuItem value={item.id} key={item.id}>{item.state_name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </CardContent>
          <div className="p-3 bg-light text-end">
            <Button variant="outlined" onClick={handleAddressModalClose}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" className="float-end rounded bg-primary ms-2" disabled={formLoader} >
              {formLoader ?
                <span className="spinner-grow spinner-grow-sm me-1"></span>
                :
                <span className="bi bi-repeat me-1"></span>
              }
              Create
            </Button>
          </div>
        </form>
      </Card>
    </Backdrop>
  )
};

export default AddAddress;
