import { Fragment, useEffect, useMemo, useState } from 'react'
import Slider from 'react-slick'
import { Link } from 'react-router-dom';

export const Brand = () => {
    const [homeBrands, setHomeBrands] = useState([]);

    const getBrandList = localStorage.getItem('brands') ? JSON.parse(localStorage.getItem('brands')) : [];
    async function getBrands() {
        const response = await fetch(window.API_URL + '/get/brands')
            .then((response) => response.json())
            .then((data) => {
                setHomeBrands(data.data)
                localStorage.setItem('brands', JSON.stringify(data.data));
            })
            .catch((err) => {
            });
    }

    useMemo(() => {
        if (homeBrands.length === 0) {
            getBrands()
        }
    }, [homeBrands]);

    const settings = {
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        slidesToShow: 6,
        dots: false,
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
                slidesToShow: 2,
                slidesToScroll: 1,
            },
        },],
    }
    return (
        <Fragment>

            {
                homeBrands && homeBrands.length > 0 &&
                <section className="our-brands">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-10 col-md-10 col-sm-12 col-xs-12">
                                <Slider {...settings} className="brands-slider" >
                                    {
                                        homeBrands.map((item) => (
                                            <div className="brand" key={item.id}>
                                                <Link to={`/products/pfilter?brand=${item.slug}`}>
                                                    <img src={item.image} alt={item.title} />
                                                </Link>
                                            </div>
                                        ))
                                    }
                                </Slider>
                            </div>

                            <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 d-flex justify-content-end">

                                <div className="shopping-book">
                                    <Link to='/brand'>Shop by Brand</Link>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            }
        </Fragment>
    )
}
