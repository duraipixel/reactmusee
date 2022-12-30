import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import {compile} from 'path-to-regexp';
import Slider from 'react-slick'
import { CollectionSectionOneSkeleton } from '../Skeleton/CollectionSectionOneSkeleton';

export const CollectionSectionOne = () => {
    const navigate = useNavigate();

    const [collectionOne, setCollectionOne] = useState([]);

    useEffect( () => {

        async function getCollection() {
            const response =  await fetch(window.API_URL+'/get/product/collections/1')
                                .then((response) => response.json())
                                .then((data) => { 
                                    setCollectionOne(data.data[0]) })
                                .catch((err) => {
                                });
        }
        getCollection();
       
    }, [] );

    const settings = {
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

    console.log(collectionOne);
    
    const PRODUCT_ROUTE = '/product/:product_url/';
    const FILTER_ROUTE = '/collection/:collection_slug/';
    const toProductPath = compile(PRODUCT_ROUTE);
    const toCollectionPath = compile(FILTER_ROUTE);
    // console.log( toCollectionPath );

    return (
        <Fragment>
            { collectionOne ? (
                <section className="new-arrivals pt-0" key={collectionOne.id}>
                    <div className="container">
                        <div className="row">

                            <div className="col-lg-12 col-md-12 col-sm-12 d-flex justify-content-between">
                                <div className="common-heads">
                                    <h2>New Arrivals for Fresh Tunes </h2>
                                </div>
                                <div className="next-jump">
                                    <Link to={`/products/pfilter?collection=${collectionOne.collection_slug}`} >
                                        Browse All <img src="/assets/images/nxt.png" />
                                    </Link>
                                </div>
                            </div>
                            <Slider className="arrivals-slider" {...settings}>
                                {
                                    collectionOne.products && collectionOne.products.map((item) => (
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
