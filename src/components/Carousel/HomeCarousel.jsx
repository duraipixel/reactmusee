import React, { Fragment, useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './homecarousel.css';
import { HomeCarouselItem } from './HomeCarouselItem';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchBanners } from './../../app/reducer/bannerSlice';

export default function HomeCarousel() {

    // const [banner, setBanner] = useState([]);
    const dispatch = useDispatch();
    const banner = useSelector((state) => state.banners);

    useEffect(()=>{
        dispatch(fetchBanners());
    }, []);
    
  return (
    <Fragment>
         <div id="homeCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-touch="true">
            {
                banner.banners && banner.banners.length > 0 ? (
            
                <HomeCarouselItem banners={banner.banners} />
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
