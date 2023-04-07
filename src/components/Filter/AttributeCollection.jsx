import { Fragment } from 'react'
import { fetchProducts } from './../../app/reducer/productFilterSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export const AttributeCollection = ({ dynamicFilter }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const getProduct = (e) => {
        const url = new URL(window.location.href);
        const SUrl = "/products/pfilter";
        var array = []
        var checkboxes = document.querySelectorAll('.filter_dynamic_attributes:checked')

        for (var i = 0; i < checkboxes.length; i++) {
            array.push(checkboxes[i].value)
        }
        if (array.length > 0) {
            let checkedAvailabilityString = array.join("-");
            searchParams.set("attributes_category", checkedAvailabilityString);
        } else {
            searchParams.delete("attributes_category");
        }
        navigate(SUrl + '?' + searchParams.toString());
        dispatch(fetchProducts('?' + searchParams.toString()));

    }

    return (
        <Fragment>
            {
                dynamicFilter.map((item, k) => (
                    <>
                        {/* <b> {item.title} </b> */}
                        {
                            item.child && item.child.map((items, i) => (
                                <div className='card mb-3'>
                                    <div className="card-header py-2 text-primary">
                                        <b>{items.title}</b>
                                    </div>
                                    <div >
                                        <ul className="list-group list-group-flush w-100 list-group-scrollable">
                                            {
                                                items.child && items.child.map((filValues, j) => (
                                                    <li key={i} className="list-group-item list-group-item-action w-100" >
                                                        <label className="cstm-chkbx">
                                                            <small>{filValues.attribute_values}</small>
                                                            <input type="checkbox" name='filter_dynamic_attributes[]' value={items.id} className='filter_dynamic_attributes' onChange={() => getProduct()} />
                                                            <span className="checkmark"></span>
                                                        </label>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </div>
                            ))
                        }
                    </>
                ))
            }

        </Fragment>
    )
}
