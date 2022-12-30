import React, { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchBrands } from '../../app/reducer/brandSlice';
import { Link } from 'react-router-dom';

export const Brand = () => {
    
    const brandData = useSelector((state) => state.brands);
    const [searchField, setSearchField] = useState("");

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchBrands());
    }, [])


    const filteredBrands = brandData.brands.filter(
        brand => {
            return (
                brand.title.toLowerCase().includes(searchField.toLocaleLowerCase())
            )
        }
    );

    const handleChange = e => {
        setSearchField(e.target.value);
    };
    
    return (
        <Fragment>
            {
                brandData.brands && (
                    <div class="filter-lists">
                        <ul>
                            <h4>Brands</h4>
                            <li>
                                <input type="search" placeholder="Search..." onChange={handleChange} />
                            </li>
                            {
                                filteredBrands ? filteredBrands.map((item, i) => (
                                    <li key={i}>
                                        <label class="cstm-chkbx"> {item.title}
                                            <input type="checkbox" name='brand[]' value={item.slug} />
                                            <span class="checkmark"></span>
                                        </label>
                                    </li>
                                )) :
                                <></>
                                   
                            }
                        </ul>
                        <span class={`shw-all `} >
                            <Link to='/brand'>
                                Show all brands
                            </Link>
                        </span>
                    </div>
                )
            }
           
        </Fragment>
    )
}
