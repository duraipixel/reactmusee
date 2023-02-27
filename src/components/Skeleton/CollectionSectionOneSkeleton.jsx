import { Fragment } from 'react'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import Slider from 'react-slick';

export const CollectionSectionOneSkeleton = () => {

    const settings = {
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        slidesToShow: 5,
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
            <section className="new-arrivals pt-0" >
                <div className="container">
                    <div className="row">

                        <div className="col-lg-12 col-md-12 col-sm-12 d-flex justify-content-between">
                            <div className="common-heads">
                                <Skeleton />
                            </div>
                            
                        </div>
                        <Slider className="arrivals-slider" {...settings}>
                            {
                                
                                Array.from(
                                    { length: 5 },
                                    (_, i) => (
                                        <div key={i}>
                                            <div className="prdt-img">
                                                <Skeleton circle="true" />
                                            </div>
                                            <div className="ratings d-flex justify-content-between">
                                                <div className="prdt-type">
                                                    <Skeleton />
                                                </div>
                                            
                                            </div>
                                            <div className="prdt-nameprc">
                                                <Skeleton />
                                                <Skeleton />
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
