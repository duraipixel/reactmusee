import React from 'react'
import { PackageSupport } from '../components/Home/PackageSupport'
import AddAddress from '../components/Profile/AddAddress'
import ChangePassword from '../components/Profile/ChangePassword'
import EditPersonalDetailsModal from '../components/Profile/EditPersonalDetailsModal'
import ProfileContent from '../components/Profile/ProfileContent'
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import { Fragment } from 'react'
import EditAddress from './../components/Profile/EditAddress';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { CancelOrderRequested } from '../components/OrderSummary/CancelOrderRequested'

export const Profile = () => {

    const [customer, setCustomer] = useState(JSON.parse(window.localStorage.getItem('customer')));
    const [customerAddress, setCustomerAddress] = useState([]);
    const [customerOrders, setCustomerOrders] = useState(JSON.parse(window.localStorage.getItem('orders')));
    const navigate = useNavigate();
    const location = useLocation();
    
    const cAddress = (window.localStorage.getItem('address') && window.localStorage.getItem('address') != 'undefined' ) ? JSON.parse(window.localStorage.getItem('address')) : [];
    const [personalShow, setPersonalShow] = useState(false);
    const [passwordShow, setPasswordShow] = useState(false);

    const [states, setStates] = useState([]);
    const [addressType, setAddressType] = useState([]);

    const [addressFormShow, setAddressFormShow] = useState(false);
    const [editAddressFormShow, setEditAddressFormShow] = useState(false);
    const [updateAddressId, setUpdateAddressId] = useState(0);
    const [addressInfo, setAddressInfo] = useState(null);

    async function getAllStates() {
        await axios({
            url: window.API_URL + '/get/states',
            method: 'GET',
        }).then((res) => {

            setStates(res.data);
        }).catch((err) => {
        })
    }

    const handlePasswordClose = () => {
        document.getElementById('passwordForm').reset();
        setPasswordShow(false)
    };
    const handlePasswordShow = () => setPasswordShow(true);

    const handlePersonalClose = () => {
        document.getElementById('profileForm').reset();
        setPersonalShow(false)
    };
    const handlePersonalShow = () => setPersonalShow(true);

    const handleAddressModalClose = () => {
        setUpdateAddressId(0)
        setAddressInfo(null);
        document.getElementById('addressForm').reset();
        setAddressFormShow(false)

    };
    const handleAddressModalShow = () => {
        setAddressFormShow(true);
        setTimeout(() => {
            document.getElementById('addressForm').reset();
        }, 100);
    }

    const handleEditAddressModalClose = () => {

        document.getElementById('editAddressForm').reset();
        setEditAddressFormShow(false)

    };
    const handleEditAddressModalShow = () => {
        setTimeout(() => {
            setEditAddressFormShow(true);
            document.getElementById('editAddressForm').reset();
        }, 100);
    }

    async function getAddressInfo(id) {
        await axios({
          url: window.API_URL + "/get/customer/address",
          method: "POST",
          data: { address_id: id, customer_id: customer.id },
        })
          .then((res) => {
            
            if( res.data.address_type ) {
              setAddressType( res.data.address_type );
            }
            setAddressInfo(res.data);
          })
          .catch((err) => {});
      }

    useEffect(() => {

        if (!window.localStorage.getItem('customer')) {
            navigate('/login');
        }
        if (states.length === 0) {

            getAllStates()
        }

    }, [])

    useMemo(() => {
        if( customerAddress.length === 0 ) {
            setCustomerAddress(cAddress)
        }
    }, [])

    return (
        <Fragment>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Profile | Musee Musical</title>
                <link rel="canonical" href={window.location.href} />
                <meta name="google-site-verification" content="Sz-Y0bbkprXfafs3xbhe_JgUQh4UABqy_dyTY4TJ9rk" />
            </Helmet>

            <div>
                {
                    customer &&
                    <Fragment>
                        <ProfileContent states={states} getAddressInfo={getAddressInfo} setAddressInfo={setAddressInfo} customer={customer} handlePersonalShow={handlePersonalShow} handlePasswordShow={handlePasswordShow} handleAddressModalShow={handleAddressModalShow} handleAddressModalClose={handleAddressModalClose} customerAddress={customerAddress} setCustomerAddress={setCustomerAddress} setUpdateAddressId={setUpdateAddressId} handleEditAddressModalShow={handleEditAddressModalShow} customerOrders={customerOrders} setCustomerOrders={setCustomerOrders} />
                        <EditPersonalDetailsModal setPersonalShow={setPersonalShow} setCustomer={setCustomer} customer={customer} handlePersonalShow={handlePersonalShow} handlePersonalClose={handlePersonalClose} personalShow={personalShow} />
                        <AddAddress addressType={addressType} states={states} addressInfo={addressInfo} addressFormShow={addressFormShow} handleAddressModalClose={handleAddressModalClose} handleAddressModalShow={handleAddressModalShow} customer={customer} customerAddress={customerAddress} setCustomerAddress={setCustomerAddress} updateAddressId={updateAddressId} />
                        {editAddressFormShow &&
                            <EditAddress addressType={addressType} states={states} addressInfo={addressInfo} editAddressFormShow={editAddressFormShow} handleEditAddressModalClose={handleEditAddressModalClose} customer={customer} setCustomerAddress={setCustomerAddress} />
                        }
                        <PackageSupport />
                    </Fragment>
                }
            </div>
        </Fragment>
    )
}
