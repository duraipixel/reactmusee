import React, { Fragment } from 'react'
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

export const RecentView = ({ recentData }) => {

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

    return (
        <Fragment>
            <section className="recently-viewed text-center pt-0">
                <div className="container">
                    <div className="row">

                        <div className="col-lg-12 col-md-12 col-sm-12 d-flex justify-content-between">
                            <div className="common-heads">
                                <h2>Recently Viewed Items</h2>
                            </div>
                        </div>

                        <Slider className="arrivals-slider" {...settings}>
                            {
                                recentData && recentData.map((item) => (
                                    <Link className="arrival-product" key={item.id} to={`/product/${item.product_url}`} >
                                        <div className="prdt-img">
                                            <img src={item.image} />
                                        </div>
                                        <div className="prdt-nameprc">
                                            <h4>{item.product_name}</h4>
                                        </div>
                                    </Link>
                                ))
                            }

                        </Slider>

                    </div>
                </div>
            </section>
        </Fragment>
    )
}
