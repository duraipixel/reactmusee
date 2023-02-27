import { Fragment, useMemo, useState } from 'react'
import { Brand } from '../components/Filter/Brand'
import { DiscountCollection } from '../components/Filter/DiscountCollection'
import { ProductAvailability } from '../components/Filter/ProductAvailability'
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { fetchProducts } from './../app/reducer/productFilterSlice';
import { useDispatch } from 'react-redux';
import { AttributeCollection } from '../components/Filter/AttributeCollection';
import axios from 'axios';
import { ProductCollection } from './../components/Filter/ProductCollection';

export const Filter = ({filterStaticMenu}) => {

    
    const product_availability = filterStaticMenu.product_availability;
    const video_shopping = filterStaticMenu.video_shopping;
    const discounts = filterStaticMenu.discounts;
    const collection = filterStaticMenu.collection;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location  = useLocation();

    const [dynamicFilter, setDynamicFilter] = useState([]);

    const searchParams = new URLSearchParams(location.search);

    const CommonUrl = new URL(window.location.href);
    
    var bookingSelected = [];
   
    if( searchParams.get('booking') ) {
        bookingSelected = searchParams.get('booking').split("-") ;
    }

    const categoryUrl = searchParams.get('category');

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
            searchParams.set("booking", checkedAvailabilityString);
        } else {
            searchParams.delete("booking");
        }
        navigate(SUrl + '?'+ searchParams.toString());
        dispatch(fetchProducts('?'+ searchParams.toString()));

    }
    
    const getDynamicFilter = () => {

        axios({
            url: window.API_URL + '/get/dynamic/filter/category',
            method: 'POST',
            data: {category_slug: categoryUrl},
        }).then((res) => {
            setDynamicFilter(res.data);
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
        url.searchParams.delete("attributes_category");
        var checkboxes = document.querySelectorAll('.filter_dynamic_attributes:checked')
        
        for(var i= 0; i<checkboxes.length; i++){
            checkboxes[i].checked= false;
        }
        
        document.getElementsByClassName("product_availability").checked = false;
        document.querySelectorAll('input[name=filter_dynamic_attributes]').checked = false;
        document.getElementsByClassName("filter_brand").checked = false;
        document.getElementsByClassName("video_shopping").checked = false;
        document.getElementsByClassName("filter_discounts").checked = false;
        document.getElementById("sort_by").value = '';

        navigate(SUrl + url.search);
        dispatch(fetchProducts());

    }

    const closeFilterMenu = () => {
        
        var filtermenu = document.getElementById('fil-optn')
        filtermenu.classList.remove('hide')
        filtermenu.classList.add('show')
        
        var sidefilter = document.getElementById('sdmnu-repnsve');
        sidefilter.classList.remove('show')
    }

    useMemo(() => {
        if( dynamicFilter.length == 0 ){
            getDynamicFilter()
        }
    }, [categoryUrl])

    return (
        <Fragment >
            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12 sdmnu-repnsve mCustomScrollbar sticky-wraper" data-spy="affix" data-offset-top="224" data-offset-bottom="320" id="sdmnu-repnsve">
                <div className="filter-lists d-flex">
                    <h3>Filters </h3>
                    <div className={`clear_filter ${Array.from(searchParams).length > 0 ? '':'hide'}`} onClick={() => clearFilter()}> 
                        Clear Filter  
                        {/* <i className="fa fa-times" aria-hidden="true"></i> */}
                    </div>
                </div>
                <div className="filter-lists">
                    <span className="cl-se-btn" onClick={() => closeFilterMenu()}>
                        <a > <img src="/assets/images/filter-close.png" /> </a>
                    </span>
                    <ProductAvailability product_availability={product_availability} />
                </div>
                <Brand />
                {
                    dynamicFilter && dynamicFilter.length > 0 && 
                    <AttributeCollection dynamicFilter={dynamicFilter   } />
                }
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
                {discounts &&  discounts.length > 0 &&
                    <DiscountCollection discounts={discounts} />
                }
                {collection &&  collection.length > 0 &&
                    <ProductCollection collection={collection} />
                }
            </div>
        </Fragment>
    )
}
