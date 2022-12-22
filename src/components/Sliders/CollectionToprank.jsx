import React, { Fragment } from 'react'
import Slider from 'react-slick'

export const CollectionToprank = () => {
    const setttings = {
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
            <section className="new-arrivals">
                <div className="container">
                    <div className="row">

                        <div className="col-lg-12 col-md-12 col-sm-12 d-flex justify-content-between">
                            <div className="common-heads">
                                <h2>Top Ranked</h2>
                            </div>
                            <div className="next-jump">
                                <a href=""> Browse All <img src="assets/images/nxt.png" /></a>
                            </div>
                        </div>
                        <Slider className='ranked-slider' {...setttings} >
                        
                            <div className="arrival-product">
                                <div className="prdt-img">
                                    <img src="assets/images/ranked/rank-1.jpg" />
                                </div>
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

                            <div className="arrival-product">
                                <div className="prdt-img">
                                    <img src="assets/images/ranked/rank-2.jpg" />
                                </div>
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

                            <div className="arrival-product">
                                <div className="prdt-img">
                                    <img src="assets/images/ranked/rank-3.jpg" />
                                </div>
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

                            <div className="arrival-product">
                                <div className="prdt-img">
                                    <img src="assets/images/ranked/rank-4.jpg" />
                                </div>
                                <div className="ratings d-flex justify-content-between">
                                    <div className="prdt-type">
                                        Guitar Accessories
                                    </div>
                                    <div className="prdt-ratngs">
                                        <img src="assets/images/star.png" />4.9
                                    </div>
                                </div>
                                <div className="prdt-nameprc">
                                    <h4>Marshall Amplification MS-2R Red Micro Guitar Amp</h4>
                                    <h5>₹4,296</h5>
                                </div>
                            </div>

                            <div className="arrival-product">
                                <div className="prdt-img">
                                    <img src="assets/images/ranked/rank-5.jpg" />
                                </div>
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

                            <div className="arrival-product">
                                <div className="prdt-img">
                                    <img src="assets/images/ranked/rank-1.jpg" />
                                </div>
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

                        </Slider>

                    </div>
                </div>
            </section>
        </Fragment>
    )
}
