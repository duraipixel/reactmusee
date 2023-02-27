import { useState, useMemo } from 'react';
import { Fragment } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import Slider from 'react-slick';
import './brandCss.css';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../app/reducer/productFilterSlice';

export const BrandDetails = () => {

    const { brand_slug } = useParams();
    const [brandData, setBrandData] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);

    async function getBrandCategory() {
        const response = await fetch(window.API_URL + '/get/brands/all/' + brand_slug)
            .then((response) => {
                localStorage.setItem('brand_slug', brand_slug);
                return response.json()
            }).then((data) => setBrandData(data))
            .catch((err) => {
                // console.log(err.message)
            });
    }

    const getBrandProducts = (category_slug, subcategory_slug = '') => {
        const SUrl = "/products/pfilter";
        searchParams.set("category", category_slug);
        if( subcategory_slug != ''){
            searchParams.set("scategory", subcategory_slug);
        }
        searchParams.set("brand", brand_slug);

        const topMenuAll = sessionStorage.getItem('topMenu') ? JSON.parse(sessionStorage.getItem('topMenu')) : [];

        var subMenus = topMenuAll.filter(
            menu => {
                return (
                    menu.slug.toLowerCase().includes(category_slug.toLocaleLowerCase())
                )
            }
        );

        sessionStorage.setItem('topSubMenu', JSON.stringify(subMenus));

        dispatch(fetchProducts('?' + searchParams.toString()));
        navigate(SUrl + '?' + searchParams.toString());
    }

    const settings = {
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        slidesToShow: 3,
        dots: true,
        slidesToScroll: 1,
        responsive: [{
            breakpoint: 1400,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            },
        }, {
            breakpoint: 990,
            settings: {
                slidesToShow: 1,
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

    useMemo(() => {
        getBrandCategory()
    }, [brand_slug])

    console.log(brandData, 'brandData');
    var dynamic_subCategory = false;
    if (Object.keys(brandData).length > 0) {
        dynamic_subCategory = brandData.category[Math.floor(Math.random() * brandData.category.length)];
    }
    console.log(dynamic_subCategory, 'dynamic_subCategory');
    return (

        (Object.keys(brandData).length > 0) &&
        (

            <Fragment>
                <section className="inner-banner" style={{ backgroundImage: `url(${brandData.banner ?? '/assets/images/banners/inner-banner-2.jpg'})` }}>
                    <div className="container">
                        <div className="row">

                            <div className="inner-liners">
                                <img src="/assets/images/yamaha-logo.png" />
                                <h1>Your search for the perfect brand <br />of instruments ends here</h1>
                            </div>

                        </div>
                    </div>
                </section>
                {
                    brandData.category.length > 0 && (
                        <section className="musical-brands text-center">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div className="inner-headngs">
                                            <h2>Enjoy the exceptional musical instruments</h2>
                                        </div>
                                    </div>
                                    {
                                        brandData.category.slice(0, 6).map((item, i) => (
                                            <div className={`col-lg-${[0, 1].includes(i) ? '6' : '3'} col-md-${[0, 1].includes(i) ? '6' : '3'} col-sm-${[0, 1].includes(i) ? '6' : '3'} col-xs-12`} key={i}>
                                                <div className="brand-box">
                                                    <img src={[0, 1].includes(i) ? item.image_md : item.image_sm} className="img-fluid" />
                                                    <div className="brand-set">
                                                        <h3>{item.name}</h3>
                                                        <button className='' onClick={() => getBrandProducts(item.slug)} >
                                                            Browse All
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </section>
                    )
                }

                {
                    dynamic_subCategory && dynamic_subCategory.sub_category.length > 0 &&

                    <section className="musical-brands secnd-layr text-center">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div className="inner-headngs">
                                        <h2>Make an impact with our <br /> {dynamic_subCategory.name} </h2>
                                    </div>
                                </div>
                                {
                                    dynamic_subCategory.sub_category[0] &&

                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div className="brand-box main-bx">
                                            <img src={dynamic_subCategory.sub_category[0].image} className="img-fluid" />
                                            <div className="brand-set">
                                                <h3>{dynamic_subCategory.sub_category[0].name}</h3>
                                                <button className='' onClick={() => getBrandProducts(dynamic_subCategory.slug, dynamic_subCategory.sub_category[0].slug)} >
                                                    Browse All
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                }
                                {
                                    dynamic_subCategory.sub_category[1] && dynamic_subCategory.sub_category[2] &&
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div className="brand-box sub-bx">
                                            <img src={dynamic_subCategory.sub_category[1].image_md} className="img-fluid" />
                                            <div className="brand-set">
                                                <h3>{dynamic_subCategory.sub_category[1].name}</h3>
                                                <button className='' onClick={() => getBrandProducts(dynamic_subCategory.slug, dynamic_subCategory.sub_category[1].slug)} >
                                                    Browse All
                                                </button>
                                            </div>
                                        </div>
                                        <div className="brand-box sub-bx">
                                            <img src={dynamic_subCategory.sub_category[2].image_md} className="img-fluid" />
                                            <div className="brand-set">
                                                <h3>{dynamic_subCategory.sub_category[2].name}</h3>
                                                <button className='' onClick={() => getBrandProducts(dynamic_subCategory.slug, dynamic_subCategory.sub_category[2].slug)} >
                                                    Browse All
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </section>
                }

                {/* <section className="browse-categories branding-ganger">
                    <div className="container">
                        <div className="row">

                            <div className="col-lg-12">
                                <div className="common-heads light text-center">
                                    <h2>Make every note count only with <br /> Yamaha Accessories</h2>
                                </div>
                            </div>
                            <Slider className="keyboards-detail-slider" {...settings}>
                                <div className="arrival-product">
                                    <div className="prdt-img">
                                        <img src="/assets/images/range-1.jpg" />
                                        <div className="access-aories">
                                            <h4>Guitar Accessories</h4>
                                            <a href="">Browse All</a>
                                        </div>
                                    </div>
                                </div>

                                <div className="arrival-product">
                                    <div className="prdt-img">
                                        <img src="/assets/images/range-2.jpg" />
                                        <div className="access-aories">
                                            <h4>Keyboard Accessories</h4>
                                            <a href="">Browse All</a>
                                        </div>
                                    </div>
                                </div>

                                <div className="arrival-product">
                                    <div className="prdt-img">
                                        <img src="/assets/images/range-3.jpg" />
                                        <div className="access-aories">
                                            <h4>Piano Accessories</h4>
                                            <a href="">Browse All</a>
                                        </div>
                                    </div>
                                </div>
                            </Slider>

                        </div>
                    </div>
                </section> */}
            </Fragment>
        )

    )
}
