import { Fragment, useEffect, useState, useMemo } from 'react'
import Slider from 'react-slick';
import { compile } from 'path-to-regexp';
import { Link } from 'react-router-dom';
import CardComponent from '../CardComponent';

export const CollectionBlockBuster = ({ homeData, goToProductListPageCollection }) => {

    const [collectionFour, setCollectionFour] = useState('');

    useMemo(() => {
        if (collectionFour === '' && homeData.collection) {
            setCollectionFour(homeData.collection.find((car) => car.order_by === 4))
        }
    }, [homeData]);


    const settings = {
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        slidesToShow: 4,
        dots: true,
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
        },],
    } 

    return (
        <Fragment>
            {collectionFour && collectionFour.products.length > 4 ? (
                <section className="new-arrivals" key={collectionFour.id}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 d-flex justify-content-between">
                                <div className="common-heads">
                                    <h2>{collectionFour.collection_name} </h2>
                                </div>
                                <div className="next-jump">
                                    <label role={`button`} className='link-label' onClick={() => { goToProductListPageCollection(collectionFour.collection_slug) }}>
                                        Browse All <img src="/assets/images/nxt.png" />
                                    </label>
                                </div>
                            </div>
                            <Slider className="arrivals-slider" {...settings}>
                                {
                                    collectionFour.products && collectionFour.products.map((item, index) => (
                                        <CardComponent settings={{
                                            data : item,
                                            index: index
                                        }} />
                                    ))

                                }

                            </Slider>

                        </div>
                    </div>
                </section>
            ) : null}
        </Fragment>
    )
}
