import Slider from "react-slick"
import CardComponent from "./CardComponent"

function ProductSlider({ data }) {
    return (
        data && data.map((item, index) => (
            <section className="the-trending text-center" style={{ background: `url('${String(item.banner_image)}')` }} key={index}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="trending-lsts">
                                <div className="shopping-video">
                                    <div className="common-heads light">
                                        <h2> {item.collection_name} </h2>
                                    </div>
                                    <div className="primary-para">
                                        {item.tag_line}
                                    </div>
                                </div>
                                <MySlider delay={Number(index + 2000)}>
                                    {item.products && item.products.map((item, i) => (
                                        <CardComponent key={i} settings={{
                                            data: item,
                                            index: i,
                                            badge: false
                                        }} />
                                    ))}
                                </MySlider>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        ))
    )
}

function MySlider({ children, delay }) {
    const settings = {
        autoplay: true,
        autoplaySpeed: delay,
        arrows: true,
        slidesToShow: 4,
        dots: true,
        slidesToScroll: 1,
        infinite: true,
        // centerMode:true,
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
    return <Slider {...settings} className="trending-slider" >{children}</Slider>
}

export default ProductSlider