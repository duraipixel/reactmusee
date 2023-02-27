import { Fragment } from 'react'
import Slider from 'react-slick';
import './css/othercategory.css';
import { Link } from 'react-router-dom';

export const OtherCategory = ({ otherCategory, categoryUrl }) => {

    const settings = {
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        slidesToShow: 4,
        dots: true,
        slidesToScroll: 1,
        responsive: [{
            breakpoint: 1400,
            settings: {
                slidesToShow: 3,
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
            {
                otherCategory && otherCategory.length > 3 &&

                < Slider className="keyboards-slider" {...settings}>
                    {
                        otherCategory.map((item) => (

                            item.slug !== categoryUrl &&
                            <div className="arrival-product" key={item.id}>
                                <Link to={`/products/pfilter?category=${item.slug}`}>
                                    <div className="prdt-img">
                                        <img src={item.image} />
                                        <span>{item.name}</span>
                                    </div>
                                </Link>
                            </div>

                        ))
                    }
                </Slider>
            }

        </Fragment >
    )
}
