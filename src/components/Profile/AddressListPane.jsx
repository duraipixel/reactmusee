import { Fragment, useState } from 'react';
import Swal from "sweetalert2";
import axios from 'axios';
import { toast } from 'react-toastify';
// import Button from '@mui/material/Button';
import { Modal, ButtonToolbar, Button, Placeholder } from 'rsuite';
import { fabClasses } from '@mui/material';

export const AddressListPane = ({ handleEditAddressModalShow, setAddressInfo, customerAddress, handleAddressModalShow, handleAddressModalClose, setCustomerAddress, customer, setUpdateAddressId }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentAddresId, setCurrentAddresId] = useState(null);
    

    const updateAddress = (id) => {
        console.log(id, 'id');
        setUpdateAddressId(id);
        setTimeout(() => {
            handleEditAddressModalShow()
            getAddressInfo(id);
        }, 300);
    }

    async function getAddressInfo(id) {
        await axios({
            url: window.API_URL + '/get/customer/address',
            method: 'POST',
            data: { address_id: id, customer_id: customer.id },
        }).then((res) => {
            setAddressInfo(res.data);
        }).catch((err) => {
        })
    }

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
                localStorage.setItem('address', JSON.stringify(res.data.customer_address));
                setCustomerAddress(JSON.parse(window.localStorage.getItem('address')));
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
                    <Button loading={loading} onClick={() => handleDeleteAddress(currentAddresId)} color="red" appearance="primary">
                        Remove
                    </Button>
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
                                    <Button onClick={() => updateAddress(item.id)} size="small" className='text-primary'>Edit</Button>
                                    <Button onClick={() => confirmDelete(item.id)} className='ms-2 text-danger'>Remove</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </Fragment>
    )
}
