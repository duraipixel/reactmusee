import { Fragment, useEffect, useState, useMemo } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import Slider from "react-slick";
import './video.css';

export default function HistoryVideo({ homeData }) {

    const settings = {
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        slidesToShow: 4,
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
            {
                homeData.video && homeData.video.length > 0 &&

                <section className="favorite-letter pt-0">
                    <div className="container">

                        <div className="row">

                            <div className="col-lg-12 col-md-12 col-sm-12 d-flex justify-content-between">
                                <div className="common-heads">
                                    <h2><img src="assets/images/heart.png" /> by Our Favorite Trendsetters</h2>
                                </div>
                                <div className="next-jump">
                                    <a href="">Join Our Community <img src="assets/images/nxt.png" /></a>
                                </div>
                            </div>

                            <Slider {...settings} className="favorite-trends-slider">
                                {
                                    homeData.video && homeData.video.length > 0 ? (

                                        homeData.video.map((item) => (
                                            <div className="favrite" key={item.id}>
                                                <div className="fav-img">

                                                    <iframe src={item.video_url} width="100%" height="269px">
                                                    </iframe>
                                                </div>
                                                <div className="fav-cnt">
                                                    <h4>{item.title}</h4>

                                                </div>
                                            </div>
                                        ))

                                    ) :

                                        Array.from(
                                            { length: 4 },
                                            (_, i) => (
                                                <div key={i} className="col-sm-3">
                                                    <div className="favrite">
                                                        <div className="fav-img">
                                                            <Skeleton height={269} />
                                                        </div>
                                                        <div className="fav-cnt">

                                                        </div>
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
