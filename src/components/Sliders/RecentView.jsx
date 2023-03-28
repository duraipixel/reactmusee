import { Fragment } from 'react'
import Slider from 'react-slick';
import CardComponent from '../CardComponent';

export const RecentView = ({ recentData }) => {
    const settings = {
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: true,
        slidesToShow: 4,
        dots: false,
        slidesToScroll: 1,
        infinite: true,
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
        },]
    }

    return (
        <Fragment>
            {
                recentData && recentData.length > 4 &&
                <section className="the-trending text-center bg-white">
                    <div className="container">
                        <div className="common-heads ">
                            <h2 className='text-center'>Recently Viewed Items</h2>
                        </div>
                        <Slider className="trending-slider" {...settings}>
                            {
                                recentData && recentData.map((item, i) => (
                                    <CardComponent key={i} settings={{
                                        data: item,
                                        index: i,
                                        badge: false
                                    }} />
                                ))
                            }

                        </Slider>
                    </div>
                </section>
            }
        </Fragment>
    )
}
