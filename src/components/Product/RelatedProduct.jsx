import { Fragment } from 'react'
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { compile } from 'path-to-regexp';
import CardComponent from '../CardComponent';

export const RelatedProduct = ({ related_products }) => {
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
                related_products && related_products.length > 4 &&
                <section className="the-trending text-center bg-white">
                    <div className="container">
                        <div className="common-heads ">
                            <h2 className='text-center'>Other similar products</h2>
                        </div>
                        <Slider className="trending-slider" {...settings}>
                            {
                                related_products && related_products.map((item, i) => (
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
