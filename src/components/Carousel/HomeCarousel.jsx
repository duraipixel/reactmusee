import React, { Fragment, useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './homecarousel.css';
import { HomeCarouselItem } from './HomeCarouselItem';

export default function HomeCarousel() {

    const [banner, setBanner] = useState([]);

    useEffect(()=>{
        fetch(window.API_URL+'/get/banners')
        .then((response) => response.json())
        .then((data) => setBanner(data.data))
        .catch((err) => {
            console.log(err.message)
        });
    }, []);

  return (
    <Fragment>
         <div id="homeCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-touch="true">
            <HomeCarouselItem banners={banner} />
                
            <a href="#home-content" className="scroll-down-btn home">
                <div className="chevron"></div>
                <div className="chevron"></div>
                <div className="chevron"></div>
            </a>
        </div>
    </Fragment>
  )
}
