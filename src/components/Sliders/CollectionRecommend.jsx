import { Fragment, useEffect, useMemo, useState } from 'react'
import Slider from 'react-slick';
import { compile } from 'path-to-regexp';
import { Link } from 'react-router-dom';

export const CollectionRecommend = ({homeData}) => {

    const [collectionEight, setCollectionEight] = useState('');

    useMemo( () => {
        if( collectionEight === '' && homeData.collection ) {
            setCollectionEight( homeData.collection.find( (car) => car.order_by === 8 ) )
        }
    }, [homeData] );

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
            {collectionEight && collectionEight.products.length > 4 ? (
                <section className="new-arrivals" key={collectionEight.id}>
                    <div className="container">
                        <div className="row">

                            <div className="col-lg-12 col-md-12 col-sm-12 d-flex justify-content-between">
                                <div className="common-heads">
                                    <h2> {collectionEight.collection_name} </h2>
                                </div>
                                <div className="next-jump">
                                    <Link to={`/products/pfilter?collection=${collectionEight.collection_slug}`} >
                                        Browse All <img src="/assets/images/nxt.png" />
                                    </Link>
                                </div>
                            </div>

                            <Slider className="arrivals-slider" {...settings}>
                                {
                                    collectionEight.products && collectionEight.products.map((item) => (
                                        <Link className="arrival-product" key={item.id} to={toProductPath({ product_url: item.product_url })}>
                                            <div className="prdt-img">
                                                <img src={item.image} />
                                            </div>
                                            <div className="ratings d-flex justify-content-between">
                                                <div className="prdt-type">
                                                    {item.category_name}
                                                </div>
                                            </div>
                                            <div className="prdt-nameprc">
                                            <h4>{item.product_name}</h4>
                                                <h5>{item.sale_prices.strike_rate && item.sale_prices.strike_rate > 0 && <span>₹{item.sale_prices.strike_rate}</span>}
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
            ) : null}
        </Fragment>
    )
}
