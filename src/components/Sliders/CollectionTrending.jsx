import React, { Fragment } from 'react'
import Slider from 'react-slick'

export const CollectionTrending = () => {
    const settings = {
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
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
            <section className="the-trending text-center">
                <div className="container">
                    <div className="row">

                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                            <div className="trending-lsts">

                                <div className="shopping-video">
                                    <div className="common-heads light">
                                        <h2>#TheTrending10</h2>
                                    </div>
                                    <div className="primary-para">
                                        Top 10 instruments specially curated for you by our experts
                                    </div>
                                </div>
                                <Slider {...settings} className="trending-slider" >
                                    <div className="arrival-product">
                                        <div className="prdt-img">
                                            <img src="assets/images/trending/trend-1.jpg" />
                                            <div className="ofr-prc">
                                                <h5>#1</h5>
                                            </div>
                                        </div>
                                        <div className="trend-access">
                                            <div className="ratings d-flex justify-content-between">
                                                <div className="prdt-type">
                                                    Guitar Accessories
                                                </div>
                                                <div className="prdt-ratngs">
                                                    <img src="assets/images/star.png" />4.9
                                                </div>
                                            </div>
                                            <div className="prdt-nameprc">
                                                <h4>Ibanez MTZ11 Guitar Set Up Multi Tool Set</h4>
                                                <h5>₹1,100</h5>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="arrival-product">
                                        <div className="prdt-img">
                                            <img src="assets/images/trending/trend-2.jpg" />
                                            <div className="ofr-prc">
                                                <h5>#2</h5>
                                            </div>
                                        </div>
                                        <div className="trend-access">
                                            <div className="ratings d-flex justify-content-between">
                                                <div className="prdt-type">
                                                    Electronic Drumkits
                                                </div>
                                                <div className="prdt-ratngs">
                                                    <img src="assets/images/star.png" />4.9
                                                </div>
                                            </div>
                                            <div className="prdt-nameprc">
                                                <h4>Lemon T-750 9-piece Electronic Drum Set</h4>
                                                <h5>₹95,600</h5>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="arrival-product">
                                        <div className="prdt-img">
                                            <img src="assets/images/trending/trend-3.jpg" />
                                            <div className="ofr-prc">
                                                <h5>#3</h5>
                                            </div>
                                        </div>
                                        <div className="trend-access">
                                            <div className="ratings d-flex justify-content-between">
                                                <div className="prdt-type">
                                                    Electric Guitars
                                                </div>
                                                <div className="prdt-ratngs">
                                                    <img src="assets/images/star.png" />4.9
                                                </div>
                                            </div>
                                            <div className="prdt-nameprc">
                                                <h4>Yamaha TRBX174 TRBX Series Electric Bass Guitar</h4>
                                                <h5>₹18,296</h5>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="arrival-product">
                                        <div className="prdt-img">
                                            <img src="assets/images/trending/trend-4.jpg" />
                                            <div className="ofr-prc">
                                                <h5>#4</h5>
                                            </div>
                                        </div>
                                        <div className="trend-access">
                                            <div className="ratings d-flex justify-content-between">
                                                <div className="prdt-type">
                                                    Guitar Accessories
                                                </div>
                                                <div className="prdt-ratngs">
                                                    <img src="assets/images/star.png" />4.9
                                                </div>
                                            </div>
                                            <div className="prdt-nameprc">
                                                <h4>Marshall Acton II 60 Watt Wireless Bluetooth Speaker</h4>
                                                <h5>₹4,296</h5>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="arrival-product">
                                        <div className="prdt-img">
                                            <img src="assets/images/trending/trend-5.jpg" />
                                            <div className="ofr-prc">
                                                <h5>#5</h5>
                                            </div>
                                        </div>
                                        <div className="trend-access">
                                            <div className="ratings d-flex justify-content-between">
                                                <div className="prdt-type">
                                                    Guitar Accessories
                                                </div>
                                                <div className="prdt-ratngs">
                                                    <img src="assets/images/star.png" />4.9
                                                </div>
                                            </div>
                                            <div className="prdt-nameprc">
                                                <h4>Planet Waves Lemon Oil Guitar Conditioner</h4>
                                                <h5>₹370</h5>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="arrival-product">
                                        <div className="prdt-img">
                                            <img src="assets/images/trending/trend-1.jpg" />
                                            <div className="ofr-prc">
                                                <h5>#1</h5>
                                            </div>
                                        </div>
                                        <div className="trend-access">
                                            <div className="ratings d-flex justify-content-between">
                                                <div className="prdt-type">
                                                    Guitar Accessories
                                                </div>
                                                <div className="prdt-ratngs">
                                                    <img src="assets/images/star.png" />4.9
                                                </div>
                                            </div>
                                            <div className="prdt-nameprc">
                                                <h4>Ibanez MTZ11 Guitar Set Up Multi Tool Set</h4>
                                                <h5>₹1,100</h5>
                                            </div>
                                        </div>
                                    </div>

                                </Slider>

                            </div>

                        </div>

                    </div>
                </div>
            </section>
        </Fragment>
    )
}
