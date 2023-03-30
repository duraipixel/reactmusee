import { Fragment} from 'react';
import './homecarousel.css';
import { HomeCarouselItem } from './HomeCarouselItem';
import 'react-loading-skeleton/dist/skeleton.css'

export default function HomeCarousel({ homeData }) {

    return (
        <Fragment>
            <div id="homeCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-touch="true">
                {
                    homeData.banner && homeData.banner.length > 0 && (

                        <HomeCarouselItem banners={homeData.banner} />
                    )
                }

                {/* 
                <a href="#home-content" className="scroll-down-btn home">
                    <div className="chevron"></div>
                    <div className="chevron"></div>
                    <div className="chevron"></div>
                </a> */}
            </div>
        </Fragment>
    )
}
