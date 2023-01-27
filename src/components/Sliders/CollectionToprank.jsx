import React, { Fragment, useEffect, useMemo, useState } from 'react'
import Slider from 'react-slick'
import {compile} from 'path-to-regexp';
import { Link } from 'react-router-dom';
import { CollectionSectionOneSkeleton } from './../Skeleton/CollectionSectionOneSkeleton';

export const CollectionToprank = () => {

    const [collectionTwo, setCollectionTwo] = useState([]);

    async function getCollection() {
        await fetch(window.API_COLLECTION_SECTION_TWO_URL)
                            .then((response) => response.json())
                            .then((data) => { 
                                setCollectionTwo(data.data[0]) })
                            .catch((err) => {
                            });
    }

    useMemo( () => {
        if( collectionTwo.length === 0 ){
            getCollection();
        }
    }, [] );

    const setttings = {
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        slidesToShow: 5,
        dots: true,
        slidesToScroll: 1,
        responsive: [{
            breakpoint: 1400,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
            },
        }, {
            breakpoint: 990,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
            },
        }, {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        }, ],
    }

    const PRODUCT_ROUTE = '/product/:product_url/';
    const toProductPath = compile(PRODUCT_ROUTE);

    return (
        <Fragment>
            { collectionTwo ? (
            <section className="new-arrivals" key={collectionTwo.id}>
                <div className="container">
                    <div className="row">

                        <div className="col-lg-12 col-md-12 col-sm-12 d-flex justify-content-between">
                            <div className="common-heads">
                                <h2>{collectionTwo.collection_name} </h2>
                            </div>
                            <div className="next-jump">
                                <Link to={`/products/pfilter?collection=${collectionTwo.collection_slug}`} > 
                                    Browse All 
                                    <img src="/assets/images/nxt.png" />
                                </Link>
                            </div>
                        </div>
                        <Slider className='ranked-slider' {...setttings} >
                        {
                            collectionTwo.products && collectionTwo.products.map((item) => (

                                <Link className="arrival-product" key={item.id} to={toProductPath({ product_url: item.product_url })}>
                                    <div className="prdt-img">
                                        <img src={item.image} />
                                    </div>
                                    <div className="ratings d-flex justify-content-between">
                                        <div className="prdt-type">
                                        {item.category_name}
                                        </div>
                                        {/* <div className="prdt-ratngs">
                                            <img src="assets/images/star.png" />4.9
                                        </div> */}
                                    </div>
                                    <div className="prdt-nameprc">
                                        <h4>{item.product_name}</h4>
                                        <h5>
                                            {item.sale_prices.strike_rate && item.sale_prices.strike_rate > 0 && <span>₹{item.sale_prices.strike_rate}</span> }
                                            ₹{item.sale_prices.price}
                                        </h5>
                                    </div>
                                </Link>
                            ))
                        }
                        </Slider>

                    </div>
                </div>
            </section>
             ) :
             <CollectionSectionOneSkeleton />  
            }
        </Fragment>
    )
}
