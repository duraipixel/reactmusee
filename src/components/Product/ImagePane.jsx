import React, { Fragment, useState } from 'react'
import Slider from 'react-slick';

export const ImagePane = ({productInfo}) => {

    const [nav1, setNav1] = useState();
    const [nav2, setNav2] = useState();

    const settings = {

        customPaging: function (i) {
            return (
                <a>
                    <img src='/assets/images/product-view-1.jpg' />
                </a>
            );
        },
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1

    };

    return (
        <Fragment>
            <div className="col-lg-6">
                <Slider asNavFor={nav2} ref={(slider1) => setNav1(slider1)} style={{ height: '395px', width: '518px' }}>
                    <div>
                        <img src="/assets/images/product-view-1.jpg" alt="Text" data-gc-caption="Front View" />
                    </div>
                    <div>
                        <img src="/assets/images/product-view-2.jpg" alt="Text" data-gc-caption="Front View" />
                    </div>
                    <div>
                        <img src="/assets/images/product-view-3.jpg" alt="Text" data-gc-caption="Front View" />
                    </div>
                    <div>
                        <img src="/assets/images/product-view-4.jpg" alt="Text" data-gc-caption="Front View" />
                    </div>
                    <div>
                        <img src="/assets/images/product-view-5.jpg" alt="Text" data-gc-caption="Front View" />
                    </div>
                </Slider>
                <h4>Second Slider</h4>
                <Slider
                    asNavFor={nav1}
                    ref={(slider2) => setNav2(slider2)}
                    slidesToShow={3}
                    swipeToSlide={true}
                    focusOnSelect={true}
                    style={{ height: '126px' }}
                >
                    <div>
                        <img src="/assets/images/product-view-1.jpg" alt="Text" data-gc-caption="Front View" />
                    </div>
                    <div>
                        <img src="/assets/images/product-view-2.jpg" alt="Text" data-gc-caption="Front View" />
                    </div>
                    <div>
                        <img src="/assets/images/product-view-3.jpg" alt="Text" data-gc-caption="Front View" />
                    </div>
                    <div>
                        <img src="/assets/images/product-view-4.jpg" alt="Text" data-gc-caption="Front View" />
                    </div>
                    <div>
                        <img src="/assets/images/product-view-5.jpg" alt="Text" data-gc-caption="Front View" />
                    </div>
                </Slider>
                {/* <div id="productimage"> */}

                {/* <Slider {...settings} >
                                    <div>
                                        <img src="/assets/images/product-view-1.jpg" alt="Text" data-gc-caption="Front View" />
                                    </div>
                                    <div>
                                        <img src="/assets/images/product-view-2.jpg" alt="Text" data-gc-caption="Front View" />
                                    </div>
                                    <div>
                                        <img src="/assets/images/product-view-3.jpg" alt="Text" data-gc-caption="Front View" />
                                    </div>
                                    <div>
                                        <img src="/assets/images/product-view-4.jpg" alt="Text" data-gc-caption="Front View" />
                                    </div>
                                    <div>
                                        <img src="/assets/images/product-view-5.jpg" alt="Text" data-gc-caption="Front View" />
                                    </div>
                                </Slider> */}

                {/* <ul id="glasscase" className="gc-start">
                                        <li>
        
                                            <img src="/assets/images/product-view-1.jpg" alt="Text" data-gc-caption="Front View" />
                                        </li>
        
                                        <li>
                                            <img src="/assets/images/product-view-2.jpg" alt="Text" data-gc-caption="Back View" />
                                        </li>
        
                                        <li>
                                            <img src="/assets/images/product-view-3.jpg" alt="Text" data-gc-caption="Keyboard Layer" />
                                        </li>
        
                                        <li>
                                            <img src="/assets/images/product-view-4.jpg" alt="Text" data-gc-caption="Keyboard Keys" />
                                        </li>
        
                                        <li>
                                            <img src="/assets/images/product-view-5.jpg" alt="Text" data-gc-caption="Keyboard Interior" />
                                        </li>
                                    </ul> */}
                {/* </div> */}
                <div className={`offer-value ${productInfo.sale_prices.overall_discount_percentage > 0 ? '' : 'hide'}`}>
                    <h4>{productInfo.sale_prices.overall_discount_percentage}%<span>Off</span></h4>
                </div>
            </div>
        </Fragment>
    )
}
