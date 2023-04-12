import Slider from 'react-slick'
import { Link } from 'react-router-dom';
import { useBrandsQuery } from '../../app/services/homePageApi';
export const Brand = () => {
    const { data, isSuccess } = useBrandsQuery()
    if (isSuccess) return (
        <section className="our-brands">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-10 col-md-10 col-sm-12 col-xs-12">
                        <Slider {...settings} className="brands-slider" >
                            {
                                data.data.map((item) => (
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
    )
    const settings = {
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        slidesToShow: 6,
        dots: false,
        slidesToScroll: 1,
        centerMode: true,
        responsive: [{
            breakpoint: 600,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                vertical: true,
                verticalSwiping: true,
                centerMode: true,
                arrows: true,
            },
        },],
    }
}
