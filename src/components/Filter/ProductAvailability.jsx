import React, { Fragment } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchProducts } from './../../app/reducer/productFilterSlice';
import { useDispatch } from 'react-redux';

export const ProductAvailability = ({ product_availability }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    var availabilitySelected = [];
    if( searchParams.get('availability') ) {
        availabilitySelected = searchParams.get('availability').split("-") ;
    }

    const getProduct = (e) => {
        // const url = new URL(window.location.href);
        const SUrl = "/products/pfilter";
        var array = []
        var checkboxes = document.querySelectorAll('.product_availability:checked')

        for (var i = 0; i < checkboxes.length; i++) {
            array.push(checkboxes[i].value)
        }
        if (array.length > 0) {
            let checkedAvailabilityString = array.join("-");
            searchParams.set('availability', checkedAvailabilityString );
            // url.searchParams.set("availability", checkedAvailabilityString);
        } else {
            searchParams.delete("availability");
        }
        console.log(SUrl +'?'+ searchParams.toString());
        navigate(SUrl +'?'+ searchParams.toString());
        dispatch(fetchProducts( '?'+ searchParams.toString()));
    }

    return (
        <Fragment>
            {
                product_availability && (
                    <ul>
                        <h4>Product Availability</h4>
                        {
                            Object.entries(product_availability).map((item, i) => (
                                <li key={i}>
                                    <label className="cstm-chkbx">{item[1]}
                                        <input type="checkbox" checked={ (availabilitySelected.includes(item[0]) ? 'checked' : '')} className='product_availability' name='product_availability[]' value={item[0]} onChange={() => getProduct()} />
                                        <span className="checkmark"></span>
                                    </label>
                                </li>
                            ))
                        }

                    </ul>
                )
            }
        </Fragment>
    )
}
