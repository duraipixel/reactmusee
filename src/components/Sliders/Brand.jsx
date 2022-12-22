import React, { Fragment, useEffect, useState } from 'react'
import Slider from 'react-slick'

export const Brand = () => {

    const [brand, setBrand] = useState([]);

    useEffect(()=>{
        fetch(window.API_URL+'/get/brands')
        .then((response) => response.json())
        .then((data) => setBrand(data.data))
        .catch((err) => {
            // console.log(err.message)
        });
    }, []);

    const settings = {
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        slidesToShow: 6,
        dots: false,
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
                slidesToShow: 2,
                slidesToScroll: 1,
            },
        }, ],
    }
    return (
        <Fragment>
            <section className="our-brands">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-10 col-md-10 col-sm-12 col-xs-12">
                            <Slider {...settings} className="brands-slider" >
                                {
                                    brand && brand.map((item) => (
                                        <div className="brand" key={item.id}>
                                            <img src={item.image} alt={item.title} />
                                        </div>
                                    ))
                                }
                            </Slider>
                        </div>

                        <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 d-flex justify-content-end">
                            
                            <div className="shopping-book">
                                <a href="">Shop by Brand</a>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}
