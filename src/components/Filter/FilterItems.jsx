import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useOutletContext } from 'react-router-dom';

export const FilterItems = () => {
    const [isPageLoaded, setIsPageLoaded] = useOutletContext();

    const filterData = useSelector((state) => state.products);
    const products = filterData.products && filterData.products != 'undefined' ? filterData.products.products : []
    console.log( 'isPageLoaded', isPageLoaded);

    useEffect(() => {
        if(products.length > 0 ) {
            setIsPageLoaded(false);
        }
    }, [products])

    return (
        <Fragment>
            {
                products && products.length > 0 ? (

                    products.map((item, i) => (
                        <div className="col-lg-4 col-md-4" key={i}>
                            <div className="project-bxe">
                                <Link to={`/product/${item.product_url}`} >
                                    <div className="prdt-img">
                                        <img
                                            src={item.image} />
                                        <div className={`ofr-prc ${item.sale_prices && item.sale_prices.overall_discount_percentage > 0 ? '':'hide'}`}>
                                            <h5>{item.sale_prices.overall_discount_percentage}<span>Off</span></h5>
                                        </div>
                                    </div>
                                    <div className="ratings d-flex justify-content-between">
                                        <div className="prdt-type">
                                            {item.category_name}
                                        </div>
                                        {/* <div
                                                className="prdt-ratngs">
                                                <img
                                                    src="images/star.png" />4.9
                                            </div> */}
                                    </div>
                                    <div className="prdt-nameprc">
                                        <h4>{item.product_name}</h4>
                                        <h5>
                                            {item.sale_prices.strike_rate && item.sale_prices.strike_rate > 0 && <span>₹{item.sale_prices.strike_rate}</span>}
                                            ₹{item.sale_prices.price}
                                        </h5>
                                    </div>
                                </Link>
                            </div>
                        </div>


                    )
                )) : 
                <div>
                    No Product Available
                </div>
            }

        </Fragment>
    )
}
