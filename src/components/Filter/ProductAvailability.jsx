import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom';
import { fetchProducts } from './../../app/reducer/productFilterSlice';
import { useDispatch } from 'react-redux';

export const ProductAvailability = ({ product_availability }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const CommonUrl = new URL(window.location.href);

    var availabilitySelected = [];
    if( CommonUrl.searchParams.get('availability') ) {
        availabilitySelected = CommonUrl.searchParams.get('availability').split("-") ;
    }


    const getProduct = (e) => {
        const url = new URL(window.location.href);
        const SUrl = "/products/pfilter";
        var array = []
        var checkboxes = document.querySelectorAll('.product_availability:checked')

        for (var i = 0; i < checkboxes.length; i++) {
            array.push(checkboxes[i].value)
        }
        if (array.length > 0) {
            let checkedAvailabilityString = array.join("-");
            url.searchParams.set("availability", checkedAvailabilityString);
        } else {
            url.searchParams.delete("availability");
        }
        navigate(SUrl + url.search);
        dispatch(fetchProducts());

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
