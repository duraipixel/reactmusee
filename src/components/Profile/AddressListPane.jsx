import { Fragment } from 'react';
import Swal from "sweetalert2";
import axios from 'axios';
import { toast } from 'react-toastify';

export const AddressListPane = ({ handleEditAddressModalShow, setAddressInfo, customerAddress, handleAddressModalShow, handleAddressModalClose, setCustomerAddress, customer, setUpdateAddressId }) => {
    const updateAddress = (id) => {
        console.log( id, 'id');
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

        await axios({
            url: window.API_URL + '/delete/customer/address',
            method: 'POST',
            data: { address_id: id, customer_id: customer.id },
        }).then((res) => {
            if (res.data.error == 1) {
                let error_message = res.data.message;
                error_message.forEach(x => toast.error(x, {
                    position: toast.POSITION.BOTTOM_RIGHT
                }));

            } else {
                localStorage.setItem('address', JSON.stringify(res.data.customer_address));
                setCustomerAddress(JSON.parse(window.localStorage.getItem('address')));
                Swal.fire(
                    'Deleted!',
                    'Your address has been deleted.',
                    'success'
                )
            }
        }).catch((err) => {
        })
    }

    const deleteAddress = (id) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this address!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                handleDeleteAddress(id)
            }
        })
    } 
    return (
        <Fragment>
            {
                customerAddress && customerAddress.length > 0 && customerAddress.map((item) => (
                    <div className="col-md-4 mb-4" key={item.id}>
                      <div className="card">
                        <div className="card-body p-6">
                          <div className="form-check mb-2">
                            <input className="form-check-input" type="radio" name="is_default" id={`defalutAdd_${item.id}`}  />
                            <label className="form-check-label text-dark fw-semi-bold" for={`defalutAdd_${item.id}`}>
                              {item?.sub_category?.name}
                            </label>
                          </div>
                          <h6 >{item.name}</h6>
                          <p className="mb-6">
                            {item.address_line1} <br /> {item.address_line2} {item.city}, {item.state},<br /> {item.country} {item.post_code}
                          </p>
                          <div className="mt-4">
                            <button onClick={() => updateAddress(item.id)} className="text-inherit btn btn-link">Edit </button>
                            <button onClick={() => deleteAddress(item.id)} className="text-danger ms-3 btn btn-link">Remove </button>
                          </div>
                        </div>
                      </div>
                    </div> 
                ))
            }
        </Fragment>
    )
}
