import { Fragment, useEffect, useMemo, useState } from 'react'
import Slider from 'react-slick'
import CardComponent from '../CardComponent';

export const CollectionTrending = ({ homeData, goToProductListPageCollection }) => {

    const [collectionThree, setCollectionThree] = useState('');
    useEffect(() => {
        if (collectionThree === '' && homeData.collection) {
            setCollectionThree(homeData.collection.find((car) => car.order_by === 3))
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
            {collectionThree && collectionThree.products.length > 4 ? (
                <section className="the-trending text-center" key={collectionThree.id}>
                    <div className="container">
                        <div className="row">

                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                <div className="trending-lsts">

                                    <div className="shopping-video">
                                        <div className="common-heads light">
                                            <h2> {collectionThree.collection_name} </h2>
                                        </div>
                                        <div className="primary-para">
                                            {collectionThree.tag_line}
                                        </div>
                                    </div>
                                    <Slider {...settings} className="trending-slider" >
                                        {
                                            collectionThree.products && collectionThree.products.map((item, i) => (
                                                <CardComponent settings={{
                                                    data: item,
                                                    index: i
                                                }} />
                                            ))
                                        }
                                    </Slider>

                                </div>

                            </div>

                        </div>
                    </div>
                </section>
            ) : null
            }
        </Fragment>
    )
}
