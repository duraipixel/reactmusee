import React, { Fragment } from 'react'
import { fetchProducts } from './../../app/reducer/productFilterSlice';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

export const DiscountCollection = ({ discounts }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const CommonUrl = new URL(window.location.href);
  var discountSelected = [];
  
  if( searchParams.get('discount') ) {
    discountSelected = searchParams.get('discount').split("_") ;
  }
  
  const getProduct = () => {

    const url = new URL(window.location.href);
    const SUrl = "/products/pfilter";
    var array = []
    var checkboxes = document.querySelectorAll('.filter_discounts:checked')

    for (var i = 0; i < checkboxes.length; i++) {
        array.push(checkboxes[i].value)
    }
    if (array.length > 0) {
        let checkedAvailabilityString = array.join("_");
        searchParams.set("discount", checkedAvailabilityString);
    } else {
        searchParams.delete("discount");
    }
    navigate(SUrl + '?'+ searchParams.toString());
    dispatch(fetchProducts('?'+ searchParams.toString()));

  }

  return (
    <Fragment>
      {
        discounts && (
          <div className="filter-lists">
            <ul>
              <h4>Discounts</h4>
              {
                discounts.map((item) => (
                  <li key={item.id}>
                    <label className="cstm-chkbx"> {item.collection_name}
                    
                      <input type="checkbox" name='discounts[]' checked={ (discountSelected.includes(item.slug) ? 'checked' : '')} className='filter_discounts' onChange={() => getProduct()} value={item.slug}  />
                      <span className="checkmark"></span>
                    </label>
                  </li>
                ))
              }
              
            </ul>
          </div>
        )
      }

    </Fragment>
  )
}
