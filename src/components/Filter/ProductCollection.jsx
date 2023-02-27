import { Fragment } from 'react'
import { fetchProducts } from './../../app/reducer/productFilterSlice';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

export const ProductCollection = ({ collection }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const CommonUrl = new URL(window.location.href);
  var collectionSelected = [];
  
  if( searchParams.get('collection') ) {
    collectionSelected = searchParams.get('collection').split("_") ;
  }
  
  const getProduct = () => {

    const url = new URL(window.location.href);
    const SUrl = "/products/pfilter";
    var array = []
    var checkboxes = document.querySelectorAll('.filter_collection:checked')

    for (var i = 0; i < checkboxes.length; i++) {
        array.push(checkboxes[i].value)
    }
    if (array.length > 0) {
        let checkedAvailabilityString = array.join("_");
        searchParams.set("collection", checkedAvailabilityString);

        searchParams.delete("booking");
        searchParams.delete("discount");
        searchParams.delete("brand");
        searchParams.delete("availability");
        searchParams.delete("page");
        searchParams.delete("sort");
        searchParams.delete("category");
        searchParams.delete("attributes_category");

    } else {
        searchParams.delete("collection");
    }
    navigate(SUrl + '?'+ searchParams.toString());
    dispatch(fetchProducts('?'+ searchParams.toString()));

  }

  return (
    <Fragment>
      {
        collection && (
          <div className="filter-lists">
            <ul>
              <h4>Collections</h4>
              {
                collection.map((item) => (
                  <li key={item.id}>
                    <label className="cstm-chkbx"> {item.collection_name}
                      <input type="checkbox" name='collection[]' checked={ (collectionSelected.includes(item.slug) ? 'checked' : '')} className='filter_collection' onChange={() => getProduct()} value={item.slug}  />
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
