import React, { Fragment, useEffect, useState } from 'react'
import Slider from 'react-slick'
import { compile } from 'path-to-regexp';
import { Link } from 'react-router-dom';

export const CollectionKeyboards = () => {

    const [collectionFive, setCollectionFive] = useState([]);

    async function getCollectionFive() {
        await fetch(window.API_COLLECTION_SECTION_FIVE_URL)
            .then((response) => response.json())
            .then((data) => {
                setCollectionFive(data.data[0])
            })
            .catch((err) => {
            });
    }

    useEffect(() => {

        getCollectionFive();

    }, []);

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
        },],
    }

    const PRODUCT_ROUTE = '/product/:product_url/';
    const toProductPath = compile(PRODUCT_ROUTE);


    return (
        <Fragment>
            {collectionFive ? (

                <section className="best-keyboards" key={collectionFive.id}>
                    <div className="container">
                        <div className="row">

                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 d-flex justify-content-between align-items-center">

                                <div className="shopping-video">
                                    <div className="common-heads light">
                                        <h2> {collectionFive.collection_name} </h2>
                                    </div>
                                </div>

                                <div className="shopping-book">
                                    <Link to={`/products/pfilter?collection=${collectionFive.collection_slug}`} >
                                        Visit {collectionFive.collection_name}</Link>
                                </div>

                            </div>

                            <Slider {...settings} className="keyboards-slider" >
                                {
                                    collectionFive.products && collectionFive.products.map((item) => (

                                        <div className="arrival-product" key={item.id} to={toProductPath({ product_url: item.product_url })}>
                                            <div className="prdt-img">
                                                <img src={item.image} />
                                            </div>
                                            <div className="trend-access">
                                                <div className="ratings d-flex justify-content-between">
                                                    <div className="prdt-type">
                                                        {item.category_name}
                                                    </div>
                                                </div>
                                                <div className="prdt-nameprc">
                                                    <h4>{item.product_name}</h4>
                                                    <h5>
                                                        {item.sale_prices.strike_rate && item.sale_prices.strike_rate > 0 && <span>₹{item.sale_prices.strike_rate}</span>}
                                                        ₹{item.sale_prices.price}
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                    ))

                                }
                            </Slider>

                        </div>
                    </div>
                </section>
            ) : null
            }
        </Fragment>
    )
}
