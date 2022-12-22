import React, { Fragment } from 'react'
import Slider from 'react-slick';

export const RecentView = () => {

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

                            <div className="arrival-product">
                                <div className="prdt-img">
                                    <img src="assets/images/arrivals/product-5.jpg" />
                                </div>
                                <div className="prdt-nameprc">
                                    <h4>Juarez 53.34 cm (21") Soprano Ukulele Kit</h4>
                                </div>
                            </div>

                            <div className="arrival-product">
                                <div className="prdt-img">
                                    <img src="assets/images/arrivals/product-2.jpg" />
                                </div>
                                <div className="prdt-nameprc">
                                    <h4>Juarez 53.34 cm (21") Soprano Ukulele Kit</h4>
                                </div>
                            </div>

                            <div className="arrival-product">
                                <div className="prdt-img">
                                    <img src="assets/images/arrivals/product-3.jpg" />
                                </div>
                                <div className="prdt-nameprc">
                                    <h4>Juarez 53.34 cm (21") Soprano Ukulele Kit</h4>
                                </div>
                            </div>

                            <div className="arrival-product">
                                <div className="prdt-img">
                                    <img src="assets/images/arrivals/product-4.jpg" />
                                </div>
                                <div className="prdt-nameprc">
                                    <h4>Juarez 53.34 cm (21") Soprano Ukulele Kit</h4>
                                </div>
                            </div>

                            <div className="arrival-product">
                                <div className="prdt-img">
                                    <img src="assets/images/arrivals/product-1.jpg" />
                                </div>
                                <div className="prdt-nameprc">
                                    <h4>Juarez 53.34 cm (21") Soprano Ukulele Kit</h4>
                                </div>
                            </div>

                            <div className="arrival-product">
                                <div className="prdt-img">
                                    <img src="assets/images/arrivals/product-5.jpg" />
                                </div>
                                <div className="prdt-nameprc">
                                    <h4>Juarez 53.34 cm (21") Soprano Ukulele Kit</h4>
                                </div>
                            </div>


                        </Slider>

                    </div>
                </div>
            </section>
        </Fragment>
    )
}
