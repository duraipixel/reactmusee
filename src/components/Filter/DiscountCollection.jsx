import { Fragment } from 'react'
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

  if (searchParams.get('discount')) {
    discountSelected = searchParams.get('discount').split("_");
  }

  const getProduct = () => {

    const url = new URL(window.location.href);
    const SUrl = "/products/search";
    var array = []
    var checkboxes = document.querySelectorAll('.filter_discounts:checked')

    for (var i = 0; i < checkboxes.length; i++) {
      array.push(checkboxes[i].value)
    }
    if (array.length > 0) {
      let checkedAvailabilityString = array.join("_");
      searchParams.set("discount", checkedAvailabilityString);
      searchParams.delete("collection");

    } else {
      searchParams.delete("discount");
    }
    navigate(SUrl + '?' + searchParams.toString());
    dispatch(fetchProducts('?' + searchParams.toString()));

  }

  return (
    <Fragment>
      {
        discounts && (
          <div className='card mb-3'>
            <div className="card-header py-2 text-primary">
              <b>Discounts</b>
            </div>
            <ul className='list-group list-group-flush w-100 list-group-scrollable'>
              {
                discounts.map((item, i) => (
                  <li key={i} className="list-group-item list-group-item-action w-100">
                    <label className="cstm-chkbx">
                      <small>{item.collection_name}</small>
                      <input type="checkbox" name='discounts[]' checked={(discountSelected.includes(item.slug) ? 'checked' : '')} className='filter_discounts' onChange={() => getProduct()} value={item.slug} />
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
