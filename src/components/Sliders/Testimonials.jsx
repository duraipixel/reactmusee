import { Fragment, useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Slider from 'react-slick';
import './testimonial.css';
import { TestimonialImage } from './../Images/TestimonialImage';
import { useMemo } from 'react';


export const Testimonials = ({ homeData }) => {

    const settings = {
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        slidesToShow: 3,
        dots: false,
        slidesToScroll: 1,
        responsive: [{
            breakpoint: 1400,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
            },
        }, {
            breakpoint: 990,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            },
        }, {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            },
        }, {
            breakpoint: 500,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },],
    }

    return (
        <Fragment>
            {
                homeData.testimonials && homeData.testimonials.length > 2 &&
                <section className="patrons-saying">
                    <div className="container">
                        <div className="row">

                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <div className="common-heads light text-center">
                                    <h2>What our patrons are saying about Musee Musicals?</h2>
                                </div>
                            </div>

                            <Slider className="testimonials-slider " {...settings}>
                                {
                                    homeData.testimonials && homeData.testimonials.length > 0 ? homeData.testimonials.map((item) => (

                                        <div className="patron text-left" key={item.id}>
                                            <div className="patron-detil">
                                                {item.short_description || <Skeleton count={10} />}
                                            </div>
                                            <div className="patron-img">
                                                <span>
                                                    <TestimonialImage itemImage={item.image} />
                                                    {item.title || <Skeleton />}
                                                </span>
                                            </div>
                                        </div>
                                    )
                                    )
                                        :
                                        Array.from(
                                            { length: 3 },
                                            (_, i) => (
                                                <div className="patron text-left" key={i}>
                                                    <div className="patron-detil">
                                                        <Skeleton count={1} height={100} />
                                                    </div>
                                                </div>
                                            )
                                        )

                                }
                            </Slider>

                        </div>
                    </div>
                </section>
            }
        </Fragment>
    )
}
