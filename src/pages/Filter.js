import React, { Fragment } from 'react'
import { Brand } from '../components/Filter/Brand'
import { DiscountCollection } from '../components/Filter/DiscountCollection'
import { ProductAvailability } from '../components/Filter/ProductAvailability'
import { useNavigate } from 'react-router-dom';
import { fetchProducts } from './../app/reducer/productFilterSlice';
import { useDispatch } from 'react-redux';
import { AttributeCollection } from '../components/Filter/AttributeCollection';
import axios from 'axios';

export const Filter = ({filterStaticMenu}) => {

    const product_availability = filterStaticMenu.product_availability;
    const video_shopping = filterStaticMenu.video_shopping;
    const discounts = filterStaticMenu.discounts;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const CommonUrl = new URL(window.location.href);

    var bookingSelected = [];
   
    if( CommonUrl.searchParams.get('booking') ) {
        bookingSelected = CommonUrl.searchParams.get('booking').split("-") ;
    }

    const getProduct = () => {
        
        const url = new URL(window.location.href);
        const SUrl = "/products/pfilter";
        var array = []
        var checkboxes = document.querySelectorAll('.video_shopping:checked')

        for (var i = 0; i < checkboxes.length; i++) {
            array.push(checkboxes[i].value)
        }
        if (array.length > 0) {
            let checkedAvailabilityString = array.join("_");
            url.searchParams.set("booking", checkedAvailabilityString);
        } else {
            url.searchParams.delete("booking");
        }
        navigate(SUrl + url.search);
        dispatch(fetchProducts());

    }

    const getDynamicFilter = () => {
        axios({
            url: window.API_URL + '/add/cart',
            method: 'POST',
            data: '',
        }).then((res) => {

        }).catch((err) => {

        })
    }

    const clearFilter = () => {
        
        const url = new URL(window.location.href);
        const SUrl = "/products/pfilter";
        url.searchParams.delete("booking");
        url.searchParams.delete("collection");
        url.searchParams.delete("discount");
        url.searchParams.delete("brand");
        url.searchParams.delete("availability");
        url.searchParams.delete("page");
        url.searchParams.delete("sort");
        url.searchParams.delete("category");
        document.getElementsByClassName("product_availability").checked = false;
        document.getElementsByClassName("filter_brand").checked = false;
        document.getElementsByClassName("video_shopping").checked = false;
        document.getElementsByClassName("filter_discounts").checked = false;
        document.getElementById("sort_by").value = '';

        navigate(SUrl + url.search);
        dispatch(fetchProducts());

    }

    return (
        <Fragment >
            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12 sdmnu-repnsve mCustomScrollbar sticky-wraper" data-spy="affix" data-offset-top="224" data-offset-bottom="320">
                <div className="filter-lists d-flex">
                    <h3>Filters</h3>
                    <div className={`clear_filter ${Array.from(CommonUrl.searchParams).length > 0 ? '':'hide'}`} onClick={() => clearFilter()}> 
                        Clear Filter  
                        <i className="fa fa-times" aria-hidden="true"></i></div>
                </div>
                <div className="filter-lists">
                    <span className="cl-se-btn">
                        <a > <img src="images/filter-close.png" /> </a></span>
                    <ProductAvailability product_availability={product_availability} />
                </div>
                <Brand />
                {/* <AttributeCollection /> */}
                <div className="filter-lists">
                    <ul>
                        <h4>Video Shopping</h4>
                        <li>
                            <label className="cstm-chkbx">Video Shopping
                                <br />is available
                                <input type="checkbox" checked={ (bookingSelected.includes('video_shopping') ? 'checked' : '')} name='video_shopping' className='video_shopping' value="video_shopping" id="video_shopping" onChange={() => getProduct()}/>
                                <span className="checkmark"></span>
                            </label>
                        </li>
                    </ul>
                </div>
                <DiscountCollection discounts={discounts} />

            </div>
        </Fragment>
    )
}
