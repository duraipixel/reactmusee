import { Fragment, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { MagicSpinner } from 'react-spinners-kit';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { forwardRef } from 'react';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const SearchMobile = ({ searchShow, handleSearchModalClose }) => {

    const [searchStart, setSearchStart] = useState(false);
    const [searchData, setSearchData] = useState([]);
    const navigate = useNavigate()

    const globalSearch = (event) => {
        setSearchStart(true)
        var search_type = 'product';
        var search_field = event.target.value;
        var element = document.getElementById('mobile_search_pane');
        element.classList.add('bluebg')
        getAllStates(search_type, search_field);
    }

    async function getAllStates(search_type, search_field) {
        await axios({
            url: window.API_URL + '/get/global/search',
            method: 'POST',
            data: { search_type: search_type, search_field: search_field }
        }).then((res) => {
            setSearchData(res.data.products);
            setSearchStart(false)
        }).catch((err) => {
        })
    }
    const showProduct = (url) => {
        navigate(`/product/${url}`)
        handleSearchModalClose()
    }
    return (
        <>
            <Dialog
                fullScreen
                open={searchShow}
                onClose={handleSearchModalClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <Typography sx={{ flex: 1 }} variant="h6" component="div">
                            <img src="/assets/images/logo.svg" width={80} />
                        </Typography>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleSearchModalClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <div className='modal-body p-3'>
                    <div id='mobile_search_pane'>
                        <strong>Search</strong>
                        <input type="search" className='form-control form-control-sm mt-2' placeholder="Search for products, brands and more ..." onChange={globalSearch} />
                        <ul className="list-group mt-3" style={{ height: '70vh', overflow: 'auto' }}>
                            {searchData.length > 0 ? searchData.map((item, i) => (
                                <li key={i} className='list-group-item list-group-item-action'>
                                    {
                                        item.has_data === 'yes' ?
                                            item.product_name ?
                                                <div onClick={() => showProduct(item.product_url)} className="w-100 text-dark" >
                                                    <div className='row'>
                                                        <div className='col-3'>
                                                            <img src={item.image} style={{ objectFit:'contain',height:'100px' }}  />
                                                        </div>
                                                        <div className='col ps-0'>
                                                            <label className='fw-bold'>
                                                                {item.product_name}
                                                            </label>
                                                            <span className='small'>
                                                                Home | {item.parent_category_name} | {item.category_name} | {item.brand_name} | {item.product_name}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                :
                                                <Link to='/'>
                                                    <img src={item.image} width="100" /> {item.product_name}
                                                    <span>
                                                        Home | {item.parent_category_name} | {item.category_name} | {item.brand_name} | {item.product_name}
                                                    </span>
                                                </Link>

                                            :
                                            <div className='w-100' style={{ textAlign: 'center' }}> {item.message}</div>
                                    }
                                </li>

                            ))
                                :


                                !searchStart ?
                                    (
                                        <div className='w-100' style={{ textAlign: 'center' }}> No records found</div>
                                    )

                                    :
                                    (<li style={{ height: 'inherit' }}>
                                        <div id="product-loader" className='w-100' >
                                            <div className='product-wrapper'>
                                                <MagicSpinner
                                                    size={100}
                                                    color="#0a1d4a"
                                                    loading={true}
                                                    style={{ top: '50%', left: '45%' }}
                                                />
                                            </div>
                                        </div>
                                    </li>)

                            }

                        </ul>
                    </div>
                </div>
            </Dialog>
        </>
    )
}
