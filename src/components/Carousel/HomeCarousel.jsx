import React, { Fragment, useEffect, useMemo, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './homecarousel.css';
import { HomeCarouselItem } from './HomeCarouselItem';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function HomeCarousel({ homeData }) {

    return (
        <Fragment>
            <div id="homeCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-touch="true">
                {
                    homeData.banner && homeData.banner.length > 0 ? (

                        <HomeCarouselItem banners={homeData.banner} />
                    ) :

                        <Skeleton height={510} />
                }

                {/* <a href="#home-content" className="scroll-down-btn home">
                    <div className="chevron"></div>
                    <div className="chevron"></div>
                    <div className="chevron"></div>
                </a> */}
            </div>
        </Fragment>
    )
}
