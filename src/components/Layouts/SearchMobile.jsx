import { Fragment, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { MagicSpinner } from 'react-spinners-kit';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const SearchMobile = ({searchShow, handleSearchModalClose}) => {

    const [searchStart, setSearchStart] = useState(false);
    const [searchData, setSearchData] = useState([]);
    
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

    return (
        <Modal className='cstmzed' show={searchShow} onHide={handleSearchModalClose}>

            <Fragment>
                <Modal.Header closeButton>
                    <Modal.Title id='addressFormTitle'>Search your Products</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="modal-body">
                        <div className="top-search">
                            <div className="form-data" id='mobile_search_pane'>
                                <input type="search" placeholder="Search..." onChange={globalSearch} />
                                <ul className="src-fndings" id='searchPane'>

                                            {searchData.length > 0 ? searchData.map((item, i) => (
                                                <li key={i}>
                                                    {
                                                        item.has_data === 'yes' ?
                                                            item.product_name ?
                                                                <Link to={`/product/${item.product_url}`} className="w-100" >
                                                                    <div className='w-100 m-flex'>
                                                                        <div className='w-20'>
                                                                            <img src={item.image} width="75" />
                                                                        </div>
                                                                        <div className='w-80'>
                                                                            <label htmlFor="">
                                                                                {item.product_name}
                                                                            </label>
                                                                            <span>
                                                                                Home | {item.parent_category_name} | {item.category_name} | {item.brand_name} | {item.product_name}
                                                                            </span>
                                                                        </div>
                                                                    </div>

                                                                </Link>
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
                    </div>
                </Modal.Body>
            </Fragment>

        </Modal >
    )
}
