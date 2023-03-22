import { useState, useEffect, Fragment } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './modal.css';
import { toast } from 'react-toastify';
import axios from "axios";

const EditAddress = ({ addressType, states, addressInfo, editAddressFormShow, handleEditAddressModalClose, customer, setCustomerAddress }) => {

    let site_info = JSON.parse(window.localStorage.getItem('site_info'));
    const [formLoader, setFormLoader] = useState(false);   
    const defaultValues = {
        name: '',
        email: '',
        mobile_no: '',
        address_line: '',
        city: '',
        state: '',
        stateid: '',
        post_code: '',
        address_type_id: '',
        customer_id: '',
    }
    const [inputValues, setInputValue] = useState(defaultValues)
    const [validation, setValidation] = useState({
        name: '',
        email: '',
        mobile_no: '',
        address_line: '',
        city: '',
        state: '',
        post_code: '',
        address_type_id: '',
    });

    //handle submit updates
    function handleChange(event) {
        const { name, value } = event.target;
        setInputValue({ ...inputValues, [name]: value });
    }

    const makeResetFromClose = () => {
        setInputValue(defaultValues)
        handleEditAddressModalClose();
    }

    async function getApiAddressInfo(id) {
        var checkOb = Object.values(inputValues).every(x => x === null || x === '');
        if( checkOb ) {
            await axios({
                url: window.API_URL + '/get/customer/address',
                method: 'POST',
                data: { address_id: id, customer_id: customer.id },
            }).then((res) => {
                setInputValue(res.data);
            }).catch((err) => {
            })
        }

    }

    async function addUpdateAddress(formData) {

        setFormLoader(true);
        await axios({
            url: window.API_URL + '/update/customer/address',
            method: 'POST',
            data: formData,
        }).then((res) => {
            setFormLoader(false);
            if (res.data.error == 1) {
                let error_message = res.data.message;
                error_message.forEach(x => toast.error(x));

            } else {
                toast.success(res.data.message);

                localStorage.setItem('address', JSON.stringify(res.data.customer_address));
                setCustomerAddress(JSON.parse(window.localStorage.getItem('address')));
                setInputValue(defaultValues);
                makeResetFromClose();
            }
        }).catch((err) => {
        })

    }

    const checkValidation = () => {
        let errors = validation;
        //first Name validation
        if (Object.keys(inputValues).length > 0) {
        
            if (!inputValues.name.trim()) {
                errors.name = "First name is required";
            } else {
                errors.name = "";
            }

            //Mobile Number validation
            var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
            if (!inputValues.mobile_no.trim()) {
                errors.mobile_no = "Mobile no  is required";
            } else if (!re.test(inputValues.mobile_no)) {
                errors.email = "Please enter a valid Mobile number";
            } else {
                errors.mobile_no = "";
            }

            //Address validation
            if (!inputValues.address_line.trim()) {
                errors.address_line = "Address is required";
            } else {
                errors.address_line = "";
            }

            //City validation
            if (!inputValues.city.trim()) {
                errors.city = "City is required";
            } else {
                errors.city = "";
            }

            //State validation
            if (!inputValues.state.trim()) {
                errors.state = "State is required";
            } else {
                errors.state = "";
            }

            //Post code validation
            if (!inputValues.post_code.trim()) {
                errors.post_code = "Post Code is required";
            } else {
                errors.post_code = "";
            }
            //Address type validation
            if (!inputValues.address_type_id.trim()) {
                errors.address_type_id = "Address type is required";
            } else {
                errors.address_type_id = "";
            }

            // email validation
            var emailCond = "/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/";
            var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

            if (!inputValues.email.trim()) {
                errors.email = "Email is required";
            } else if (!filter.test(inputValues.email)) {
                errors.email = "Please enter a valid email address";
            } else {
                errors.email = "";
            }

            setValidation(errors);
        }
    };



useEffect(() => {
   
    checkValidation();
    if( addressInfo ) {

        getApiAddressInfo(addressInfo.address_id)
    }
}, [inputValues, addressInfo])



const NumericOnly = (e) => {
    const reg = /^[0-9\b]+$/
    let preval = e.target.value
    if (e.target.value === '' || reg.test(e.target.value)) return true
    else e.target.value = preval.substring(0, (preval.length - 1))
}

const handleSubmit = (e) => {
    e.preventDefault();
    var isPassValidation = Object.values(validation).every(x => x === null || x === '');
    if (isPassValidation) {
        addUpdateAddress(inputValues);
        document.getElementById('addressForm').reset();
    } else {
        console.log('validation has errors');
    }
};

return (
    <Modal className='cstmzed' show={editAddressFormShow} onHide={makeResetFromClose}>

        <Fragment>
            <Modal.Header closeButton>
                <Modal.Title id='addressFormTitle'> Update Shipping Address</Modal.Title>
            </Modal.Header>
            <form id="editAddressForm" onSubmit={handleSubmit} >
                <Modal.Body>

                    <div className="modal-body">

                        <h4>Contact Details</h4>
                        <div className="row">
                            <div className="mb-3 col-lg-6">
                                <input type="text" name="name" className="form-control" onChange={(e) => handleChange(e)}
                                    value={inputValues.name} placeholder="Name" />
                                {validation.name && <p>{validation.name}</p>}
                            </div>
                            <div className="mb-3 col-lg-6">
                                <input type="text" className="form-control" name="mobile_no" placeholder="Mobile Number" onChange={(e) => handleChange(e)}
                                    value={inputValues.mobile_no} />
                                {validation.mobile_no && <p>{validation.mobile_no}</p>}
                            </div>

                            <div className="mb-3 col-lg-6">
                                <input className="form-control" type="email" name="email" onChange={(e) => handleChange(e)}
                                    value={inputValues.email} placeholder="E-mail" />
                                {validation.email && <p>{validation.email}</p>}
                            </div>
                            <div className="mb-3 col-lg-6">

                                <select className="form-control" value={addressInfo?.address_type_id} name="address_type_id" onChange={(e) => handleChange(e)}
                                >
                                    <option value="">Address Type</option>
                                    {
                                        addressType && addressType.length > 0 && addressType.map((item) => (
                                            <option value={item.id} key={item.id}>{item.name}</option>
                                        ))
                                    }
                                </select>
                                {validation.address_type_id && <p>{validation.address_type_id}</p>}
                            </div>
                        </div>
                        <h4>Address</h4>
                        <div className="row">
                            <div className="mb-3 col-lg-12">
                                <input type="text" className="form-control" name="address_line" onChange={(e) => handleChange(e)}
                                    value={inputValues.address_line} placeholder="Building Number, Street Name & Locality" />
                                {validation.address_line && <p>{validation.address_line}</p>}
                            </div>
                            <div className="mb-3 col-lg-6">
                                <input type="text" className="form-control" name="city" placeholder="City" onChange={(e) => handleChange(e)}
                                    value={inputValues.city} />
                                {validation.city && <p>{validation.city}</p>}
                            </div>
                            <div className="mb-3 col-lg-6">
                                <input type="text" className="form-control" name="post_code" id="post_code" placeholder="Pincode" onChange={(e) => handleChange(e)}
                                    value={inputValues.post_code} />
                                {validation.post_code && <p>{validation.post_code}</p>}
                            </div>
                            <div className="mb-3 col-lg-6">
                                <select className="form-control" id="state" name="state" onChange={(e) => handleChange(e)}
                                >
                                    <option value="">SelectState</option>
                                    {states && states.map((item) => (
                                        <option value={item.id} key={item.id} selected={inputValues.stateid == item.id ? true: false}>{item.state_name}</option>
                                    ))}
                                </select>
                                {validation.state && <p>{validation.state}</p>}
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={makeResetFromClose}>
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
        </Fragment>

    </Modal>

);
};

export default EditAddress;
