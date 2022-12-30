import React, { Fragment } from 'react';
import Carousel from 'react-bootstrap/Carousel';

export const HomeCarouselItem = ({banners}) => {
    console.log(banners, 'banners');
    return (
        <Fragment>
            <Carousel className="carousel-inner">
                {
                    banners && banners.map((item, index ) => (

                        <Carousel.Item className={`carousel-item ${item.id == 2 ? 'active' : '' }`} key={item.id} >
                            <img src={item.image} alt="" className="w-100 desky-banner" />
                            <img src={item.mobile_banner} alt="" className="w-100 moby-banner" />
                            <Carousel.Caption className="carousel-caption animated animatedFadeInUp fadeInUp">
                                <img src="assets/images/banner-logo.png" alt="" className="img-fluid" />
                                <h1 className="text-blue">
                                    {item.title}
                                    <span>{item.tag_line}</span> 
                                </h1>
                                <a href="#">Shop Now</a>
                            </Carousel.Caption>
                        </Carousel.Item>
                    
                    ))
                }
            </Carousel>
        </Fragment>
    )
}
