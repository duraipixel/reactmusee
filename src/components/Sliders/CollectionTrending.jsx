import React, { Fragment, useEffect, useMemo, useState } from 'react'
import Slider from 'react-slick'
import { compile } from 'path-to-regexp';
import { Link } from 'react-router-dom';

export const CollectionTrending = () => {

    const [collectionThree, setCollectionThree] = useState([]);

    async function getCollectionSectionThree() {
        await fetch(window.API_COLLECTION_SECTION_THREE_URL)
            .then((response) => response.json())
            .then((data) => {
                setCollectionThree(data.data[0])
            })
            .catch((err) => {
            });
    }

    useMemo(() => {
        if( collectionThree.length === 0 ) {
            getCollectionSectionThree();
        }
    }, []);

    const settings = {
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
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
            {collectionThree ? (
                <section className="the-trending text-center" key={collectionThree.id}>
                    <div className="container">
                        <div className="row">

                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                <div className="trending-lsts">

                                    <div className="shopping-video">
                                        <div className="common-heads light">
                                            <h2> {collectionThree.collection_name} </h2>
                                        </div>
                                        <div className="primary-para">
                                            {collectionThree.tag_line}
                                        </div>
                                    </div>
                                    <Slider {...settings} className="trending-slider" >
                                        {
                                            collectionThree.products && collectionThree.products.map((item, i) => (
                                                <Link className="arrival-product" key={item.id} to={toProductPath({ product_url: item.product_url })}>
                                                    <div className="prdt-img">
                                                        <img src={item.image} />
                                                        <div className="ofr-prc">
                                                            <h5>#{i+1}</h5>
                                                        </div>
                                                    </div>
                                                    <div className="trend-access">
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
                                                                {item.sale_prices.strike_rate && item.sale_prices.strike_rate > 0 && <span>₹{item.sale_prices.strike_rate}</span>}
                                                                ₹{item.sale_prices.price}
                                                            </h5>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))
                                        }
                                    </Slider>

                                </div>

                            </div>

                        </div>
                    </div>
                </section>
            ) : null
            }
        </Fragment>
    )
}
