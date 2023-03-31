import { Fragment, useEffect, useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchBrands } from '../../app/reducer/brandSlice';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { fetchProducts } from './../../app/reducer/productFilterSlice';

export const Brand = () => {

    const [searchField, setSearchField] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const getBrandList = sessionStorage.getItem('brands') ? JSON.parse(sessionStorage.getItem('brands')) : [];

    async function getBrands() {

        const response = await fetch(window.API_URL + '/get/brands')
            .then((response) => response.json())
            .then((data) => {
                sessionStorage.setItem('brands', JSON.stringify(data.data));
            })
            .catch((err) => {
            });
    }

    useMemo(() => {
        if (getBrandList.length === 0) {
            getBrands()
        }
    }, [getBrandList]);

    var brandSelected = [];
    if (searchParams.get('brand')) {
        brandSelected = searchParams.get('brand').split("_");
    }
    var filteredBrands = '';

    if (getBrandList !== undefined && getBrandList.length > 0) {

        filteredBrands = getBrandList.filter(
            brand => {
                return (
                    brand.title.toLowerCase().includes(searchField.toLocaleLowerCase())
                )
            }
        );

    }

    const handleChange = (e) => {
        setSearchField(e.target.value);
    };

    const getProduct = (e) => {
        const url = new URL(window.location.href);
        const SUrl = "/products/pfilter";
        var array = []
        var checkboxes = document.querySelectorAll('.filter_brand:checked')

        for (var i = 0; i < checkboxes.length; i++) {
            array.push(checkboxes[i].value)
        }
        if (array.length > 0) {
            let checkedAvailabilityString = array.join("_");
            searchParams.set("brand", checkedAvailabilityString);
        } else {
            searchParams.delete("brand");
        }
        navigate(SUrl + '?' + searchParams.toString());
        dispatch(fetchProducts('?' + searchParams.toString()));

    }

    return (
        <Fragment>
            {
                getBrandList && getBrandList !== 'undefined' && (
                    <div className='card mb-3'>
                        <div className="card-header py-2 text-primary top-search flex-column w-100">
                            <b>Brands</b>
                            <input type="search" className='form-control form-control-sm mt-2 border py-2' placeholder="Search..." onChange={handleChange} />
                        </div>
                        <ul className='list-group list-group-flush w-100 list-group-scrollable'>
                            {
                                filteredBrands ? filteredBrands.slice(0, 7).map((item, i) => (
                                    <li key={i} className="list-group-item list-group-item-action w-100">
                                        <label className="cstm-chkbx">
                                            <small>{item.title}</small>
                                            <input type="checkbox" checked={(brandSelected.includes(item.slug) ? 'checked' : '')} name='brand[]' className='filter_brand' value={item.slug} onChange={() => getProduct()} />
                                            <span className="checkmark"></span>
                                        </label>
                                    </li>
                                ))
                                    : null
                            }
                        </ul>
                    </div>
                )
            }

        </Fragment>
    )
}
