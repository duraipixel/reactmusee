import React from 'react'
import { Fragment } from 'react';
import Swal from "sweetalert2";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { computeHeadingLevel } from '@testing-library/react';

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
                    <div className="col-lg-4" key={item.id}>
                        <div className="adres-det">
                            <div className="d-flex justify-content-between">
                                <h4>{item.name}</h4>
                                {item.is_default ?
                                <span>
                                    <img src="../assets/images/locate.png" /> Default
                                    Address
                                </span>
                                :null
                                }
                            </div>
                            <ul>
                               
                                <li>
                                    {item.address_line1}
                                </li>
                                <li>{item.city} - {item.post_code}</li>
                                <li>{item.state}, {item.country.toUpperCase()}</li>
                                <li>Phone: +91 {item.mobile_no}</li>
                            </ul>
                            <ul className="lst-edit">
                                <li>
                                    <button onClick={() => updateAddress(item.id)}>
                                        Edit
                                    </button>
                                </li>
                                <li>
                                    <button onClick={() => deleteAddress(item.id)}> Remove </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                ))
            }
        </Fragment>

    )
}
