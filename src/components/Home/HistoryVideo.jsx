import React, { Fragment, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import Slider from "react-slick";
import './video.css';

export default function HistoryVideo() {

    const [video, setVideo] = useState([]);


    async function getVideoData() {
        const response =  await fetch(window.API_URL+'/get/history')
                            .then((response) => response.json())
                            .then((data) => { 
                                setVideo(data.data) })
                            .catch((err) => {
                            });
    }

    useEffect(()=>{
        getVideoData();
    }, []);

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
            }, ],
    }

  return (
    <Fragment>

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
                        video.length > 0 ? (
                            <Fragment>
                                {
                                    video.map((item) => (
                                        <div className="favrite" key={item.id}>
                                            <div className="fav-img">
                                                {/* <img src="assets/images/favorite/fav-1.jpg" /> */}
                                                <a id="play-video" className="video-play-button" href="javascript:void(0)">
                                                    <span></span>
                                                </a>
                                                <iframe src={item.video_url} width="100%" height="269px">
                                                </iframe>
                                            </div>
                                            <div className="fav-cnt">
                                                <h4>{item.title}</h4>
                                                {/* <span><img src="assets/images/favorite/fav-1.png" /> A.R. Rahman</span> */}
                                            </div>
                                        </div>
                                    ))
                                }
                            </Fragment>
                        ) : 

                        Array.from(
                            { length: 4 },
                            (_, i) => (
                                <div key={i} className="col-sm-3">
                                    <div className="favrite">
                                        <div className="fav-img">
                                            
                                            <a id="play-video" className="video-play-button" href="javascript:void(0)">
                                                <span></span>
                                            </a>
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
    </Fragment>
  )
}
