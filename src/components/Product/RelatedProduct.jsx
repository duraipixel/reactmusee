import { Fragment } from 'react'
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { compile } from 'path-to-regexp';

export const RelatedProduct = ({ related_products }) => {

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

            <Slider className="arrivals-slider" {...settings}>
                {
                    related_products.map((item, i) => (
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
                                <h5>
                                    {item.sale_prices.strike_rate && item.sale_prices.strike_rate > 0 && <span>₹{item.sale_prices.strike_rate}</span>}
                                    ₹{item.sale_prices.price}
                                </h5>
                            </div>
                        </Link>
                    ))
                }

            </Slider>
        </Fragment>
    )
}
