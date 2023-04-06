import { useMemo, useState } from 'react'
import { Brand } from '../components/Filter/Brand'
import { DiscountCollection } from '../components/Filter/DiscountCollection'
import { ProductAvailability } from '../components/Filter/ProductAvailability'
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { fetchProducts } from './../app/reducer/productFilterSlice';
import { useDispatch } from 'react-redux';
import { AttributeCollection } from '../components/Filter/AttributeCollection';
import axios from 'axios';
import { ProductCollection } from './../components/Filter/ProductCollection';

export const Filter = ({ filterStaticMenu, className, setFilterIcon }) => {


    const product_availability = filterStaticMenu.product_availability;
    const video_shopping = filterStaticMenu.video_shopping;
    const discounts = filterStaticMenu.discounts;
    const collection = filterStaticMenu.collection;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const [dynamicFilter, setDynamicFilter] = useState([]);
    const [dynamicBrands, setDynamicBrands] = useState([]);

    const searchParams = new URLSearchParams(location.search);

    const CommonUrl = new URL(window.location.href);

    var bookingSelected = [];

    if (searchParams.get('booking')) {
        bookingSelected = searchParams.get('booking').split("-");
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
        navigate(SUrl + '?' + searchParams.toString());
        dispatch(fetchProducts('?' + searchParams.toString()));

    }

    const getDynamicFilter = () => {

        axios({
            url: window.API_URL + '/get/dynamic/filter/category',
            method: 'POST',
            data: { category_slug: categoryUrl },
        }).then((res) => {
            if (res.data.attributes) {
                setDynamicFilter(res.data.attributes);
            }
            if (res.data.brands) {
                setDynamicBrands(res.data.brands);
            }
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

        for (var i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = false;
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
        if (dynamicFilter.length == 0) {
            getDynamicFilter()
        }
    }, [categoryUrl])

    return (
        <>
            <div className={className}>
                <div className='p-3 warpper'>
                    <button className='fw-bold filter-group-icon rounded-pill mb-3 btn btn-sm btn-light' onClick={() => setFilterIcon(false)}>
                        <i className='fa fa-chevron-left me-1'></i> CLOSE
                    </button>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className='text-primary'>Filters </h5>
                        <div className={`text-danger small ${Array.from(searchParams).length > 0 ? '' : 'hide'}`} onClick={() => clearFilter()}>
                            <i className="fa fa-times me-2" aria-hidden="true"></i>
                            Clear Filter
                        </div>
                    </div>
                    {/* <span className="cl-se-btn" onClick={() => closeFilterMenu()}>
                    <a > <img src="/assets/images/filter-close.png" /> </a>
                </span> */}
                    <ProductAvailability product_availability={product_availability} />
                    <Brand dynamicBrands={dynamicBrands} />
                    {
                        dynamicFilter && dynamicFilter.length > 0 &&
                        <AttributeCollection dynamicFilter={dynamicFilter} />
                    }
                    <div className='card mb-3'>
                        <div className="card-header py-2 text-primary">
                            <b>Video Shopping</b>
                        </div>
                        <ul className='list-group list-group-flush w-100 list-group-scrollable'>
                            <li className="list-group-item list-group-item-action w-100">
                                <label className="cstm-chkbx">
                                    <small>Video Shopping is available</small>
                                    <input type="checkbox" checked={(bookingSelected.includes('video_shopping') ? 'checked' : '')} name='video_shopping' className='video_shopping' value="video_shopping" id="video_shopping" onChange={() => getProduct()} />
                                    <span className="checkmark"></span>
                                </label>
                            </li>
                        </ul>
                    </div>
                    {discounts && discounts.length > 0 &&
                        <DiscountCollection discounts={discounts} />
                    }
                    {collection && collection.length > 0 &&
                        <ProductCollection collection={collection} />
                    }
                </div>
            </div>
        </>
    )
}
