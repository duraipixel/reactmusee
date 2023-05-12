import { Fragment, useState, useMemo } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Modal, Button as RButton } from 'rsuite';
import { Card, CardContent, TextField, MenuItem, FormControl, Select, InputLabel, Button } from "@mui/material";
import Backdrop from '@mui/material/Backdrop';
import { useForm, Controller } from 'react-hook-form';
export const AddressListPane = ({ handleEditAddressModalShow, states, setAddressInfo, customerAddress, handleAddressModalShow, handleAddressModalClose, setCustomerAddress, customer, setUpdateAddressId }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentAddresId, setCurrentAddresId] = useState(null);
    const [currentAddress, setCurrentAddress] = useState(null);

    async function handleDeleteAddress(id) {
        setLoading(true)
        await axios({
            url: window.API_URL + '/delete/customer/address',
            method: 'POST',
            data: { address_id: id, customer_id: customer.id },
        }).then((res) => {
            if (res.data.error == 1) {
                let error_message = res.data.message;
                error_message.forEach(x => toast.error(x));
            } else {
                toast.success(res.data.message)
                sessionStorage.setItem('address', JSON.stringify(res.data.customer_address));
                setCustomerAddress(JSON.parse(window.sessionStorage.getItem('address')));
                setOpen(false)
            }
            setLoading(false)
        }).catch((err) => {
        })
    }
    const confirmDelete = (id) => {
        setOpen(true)
        setCurrentAddresId(id)
    }
    const editAddress = (id) => {
        axios.post(window.API_URL + "/get/customer/address", {
            address_id: id,
            customer_id: customer.id
        }).then((res) => {
            setCurrentAddress(res.data);
        })
    } 
    return (
        <Fragment>
            <Modal size="xs" open={open} onClose={() => setOpen(false)}>
                <Modal.Header>
                    <Modal.Title className='text-danger'>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>You won't be able to revert this address!</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setOpen(false)} appearance="subtle">
                        Cancel
                    </Button>
                    <RButton loading={loading} appearance="primary" color="red" onClick={() => handleDeleteAddress(currentAddresId)} className='ms-2'>
                        Remove
                    </RButton>
                </Modal.Footer>
            </Modal>
            {
                customerAddress && customerAddress.length > 0 && customerAddress.map((item) => (
                    <div className="col-md-4 mb-4" key={item.id}>
                        <div className="card">
                            <div className="card-body p-6">
                                <div className="form-check mb-2">
                                    <input className="form-check-input" type="radio" name="is_default" id={`defalutAdd_${item.id}`} />
                                    <label className="form-check-label text-dark fw-semi-bold" for={`defalutAdd_${item.id}`}>
                                        {item?.sub_category?.name}
                                    </label>
                                </div>
                                <h6 >{item.name}</h6>
                                <p className="mb-6">
                                    {item.address_line1} <br /> {item.address_line2} {item.city}, {item.state},<br /> {item.country} {item.post_code}
                                </p>
                                <div className="mt-4">
                                    <Button size="small" onClick={() => editAddress(item.id)} className='text-primary'>Edit</Button>
                                    <Button onClick={() => confirmDelete(item.id)} className='ms-2 text-danger'>Remove</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
            {customerAddress.length == 0 ? <div className="col-md-4">No Address Yet</div> : ''}
            {currentAddress !== null ? <EditAddress customer={customer} states={states} currentAddress={currentAddress} setCustomerAddress={setCustomerAddress} /> : ''}
        </Fragment>
    )
}
const EditAddress = ({ currentAddress, states, customer, setCustomerAddress }) => {
    const [formLoader, setFormLoader] = useState(false);
    const [Modal, setModal] = useState(false);
    const { register, control, handleSubmit, setValue, formState: { errors }, reset } = useForm({
        defaultValues: { 
            name           : currentAddress?.name,
            mobile_no      : currentAddress?.mobile_no,
            address_type_id: currentAddress?.address_type_id,
            address_line   : currentAddress?.address_line,
            city           : currentAddress?.city,
            post_code      : currentAddress?.post_code,
            state          : currentAddress?.state,
            state_id       : currentAddress.stateid
        }
    });
    const cancel = () => {
        setModal(!Modal)
        reset()
    }
    useMemo(() => {
        setModal(!Modal)
        setValue('name', currentAddress?.name)
        setValue('mobile_no', currentAddress?.mobile_no)
        setValue('address_type_id', currentAddress?.address_type_id)
        setValue('address_line', currentAddress?.address_line)
        setValue('city', currentAddress?.city)
        setValue('post_code', currentAddress?.post_code)
        setValue('state', currentAddress?.state)
        setValue("company", String(currentAddress.address_type_id), { shouldValidate: true });
        setValue("state_id", String(currentAddress.stateid), { shouldValidate: true });
    }, [currentAddress])

    const updateAddress = (formData) => {
        setFormLoader(true); 
        formData.address_id  = currentAddress.address_id
        formData.customer_id = customer.id
        axios.post(window.API_URL + '/update/customer/address', formData).then((res) => {
            setFormLoader(false);
            if (res.data.error == 1) {
                let error_message = res.data.message;
                error_message.forEach(x => toast.error(x));
            } else {
                toast.success(res.data.message)
                setCustomerAddress(res.data.customer_address)
                setModal(!Modal)
            }
        });
    }
    if (currentAddress !== null) return (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={Modal}>
            <Card variant="outlined" className="col-md-5 m-2  position-relative">
                <form onSubmit={handleSubmit(updateAddress)} id="editAddressForm">
                    <CardContent>
                        <h5 className="text-center mb-3 text-primary">Update address</h5>
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
                            <InputLabel size="small"  className='bg-white px-1' id="address-type-label">Address type {currentAddress.address_type_id}</InputLabel>
                            <Controller
                                name="address_type_id"
                                control={control}
                                defaultValue=""
                                render={({ field: { onChange, value } }) => (
                                    <Select
                                        defaultValue="1"
                                        labelId="Address type"
                                        className="mb-4"
                                        id="address_type_id"
                                        size="small"
                                        disabled={!currentAddress?.address_type?.length}
                                        value={value}
                                        onChange={onChange}
                                    >
                                        {currentAddress?.address_type.map((c, i) => (
                                            <MenuItem key={`c-${i}`} value={c.id}>
                                                {c.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
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
                            <InputLabel size="small" id="address-type-label" className='bg-white px-1'>State  </InputLabel>
                            <Controller
                                name="state_id"
                                control={control}
                                defaultValue=""
                                render={({ field: { onChange, value } }) => (
                                    <Select
                                        defaultValue="1"
                                        labelId="state"
                                        className="mb-4"
                                        id="state_id"
                                        size="small"
                                        disabled={!states?.length}
                                        value={value}
                                        onChange={onChange}
                                    >
                                        {states?.map((item) => (
                                            <MenuItem value={item.id} key={item.id}>{item.state_name}</MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                        </FormControl>
                    </CardContent>
                    <div className="p-3 bg-light text-end">
                        <Button variant="outlined" onClick={cancel}> Cancel </Button>
                        <Button type="submit" variant="contained" className="float-end rounded bg-primary ms-2" disabled={formLoader} >
                            {formLoader ?
                                <span className="spinner-grow spinner-grow-sm me-1"></span>
                                :
                                <span className="bi bi-repeat me-1"></span>
                            }
                            Update
                        </Button>
                    </div>
                </form>
            </Card>
        </Backdrop>
    )
}