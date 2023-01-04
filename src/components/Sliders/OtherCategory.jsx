import React, { Fragment } from 'react'
import Slider from 'react-slick';
import './css/othercategory.css';

export const OtherCategory = () => {

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

            <Slider className="keyboards-slider" {...settings}>


                <div className="arrival-product">
                    <a href="">
                        <div className="prdt-img">
                            <img src="/assets/images/other-2.jpg" />
                            <span>Guitars</span>
                        </div>
                    </a>
                </div>

                <div className="arrival-product">
                    <a href="">
                        <div className="prdt-img">
                            <img src="/assets/images/other-5.jpg" />
                            <span>Electronic Keyboards</span>
                        </div>
                    </a>
                </div>

                <div className="arrival-product">
                    <a href="">
                        <div className="prdt-img">
                            <img src="/assets/images/other-1.jpg" />
                            <span>Drumkits</span>
                        </div>
                    </a>
                </div>

                <div className="arrival-product">
                    <a href="">
                        <div className="prdt-img">
                            <img src="/assets/images/other-4.jpg" />
                            <span>Strings</span>
                        </div>
                    </a>
                </div>

                <div className="arrival-product">
                    <a href="">
                        <div className="prdt-img">
                            <img src="/assets/images/other-3.jpg" />
                            <span>Indian Instruments</span>
                        </div>
                    </a>
                </div>

                <div className="arrival-product">
                    <a href="">
                        <div className="prdt-img">
                            <img src="/assets/images/other-2.jpg" />
                            <span>Guitars</span>
                        </div>
                    </a>
                </div>

                <div className="arrival-product">
                    <a href="">
                        <div className="prdt-img">
                            <img src="/assets/images/other-5.jpg" />
                            <span>Electronic Keyboards</span>
                        </div>
                    </a>
                </div>

            </Slider>


        </Fragment>
    )
}
