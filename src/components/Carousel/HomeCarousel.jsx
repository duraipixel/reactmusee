import React, { Fragment, useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './homecarousel.css';
import { HomeCarouselItem } from './HomeCarouselItem';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function HomeCarousel() {

    const [banner, setBanner] = useState([]);

    async function getBannerData() {
        const response =  await fetch(window.API_URL+'/get/banners')
                            .then((response) => response.json())
                            .then((data) => { 
                                setBanner(data.data) })
                            .catch((err) => {
                            });
    }

    useEffect(()=>{
        getBannerData();
    }, []);

  return (
    <Fragment>
         <div id="homeCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-touch="true">
            {
                banner && banner.length > 0 ? (
            
                <HomeCarouselItem banners={banner} />
                ):
                
                <Skeleton height={510}/>
            }
                
            <a href="#home-content" className="scroll-down-btn home">
                <div className="chevron"></div>
                <div className="chevron"></div>
                <div className="chevron"></div>
            </a>
        </div>
    </Fragment>
  )
}
