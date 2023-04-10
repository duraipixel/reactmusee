import { useState, useMemo } from 'react';
import { Fragment } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import './brandCss.css';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../app/reducer/productFilterSlice';
import { Button } from '@mui/material';

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
        if (subcategory_slug != '') {
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

    var dynamic_subCategory = false;
    if (Object.keys(brandData).length > 0) {
        dynamic_subCategory = brandData.category[Math.floor(Math.random() * brandData.category.length)];
    }

    return (
        (Object.keys(brandData).length > 0) &&
        (
            <Fragment>
                <img src={`${brandData.banner ?? '/assets/images/banners/inner-banner-2.jpg'}`} width={'100%'} />
                {
                    brandData.category.length > 0 && (
                        <div className="text-center">
                            <div className="container">
                                <div className="common-heads py-4 text-center">
                                    <h2 className='m-0'> Enjoy the exceptional musical instruments</h2>
                                </div>
                                <div className="row g-3">
                                    {
                                        brandData.category.slice(0, 6).map((item, i) => (
                                            <div className={`col-lg-${[0, 1].includes(i) ? '6' : '3'} col-md-${[0, 1].includes(i) ? '6' : '3'} col-sm-${[0, 1].includes(i) ? '6' : '3'} col-xs-12`} key={i}>
                                                <div class="border rounded shadow-sm brand-box carousel-item active carousel-box-overlay">
                                                    <img src={[0, 1].includes(i) ? item.image_md : item.image_sm} class="d-block w-100" alt="..." />
                                                    <div class="carousel-caption p-0 ">
                                                        <h5 className='mb-2'>{item.name}</h5>
                                                        <Button variant='outlined' color='light' onClick={() => getBrandProducts(item.slug)} >
                                                            Browse All
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    )
                }
                {
                    dynamic_subCategory && dynamic_subCategory.sub_category.length > 0 &&
                    <div className="text-center">
                        <div className="container">
                            <div className="common-heads py-4 text-center">
                                <h2 className='m-0'> Make an impact with our <br /> {dynamic_subCategory.name}</h2>
                            </div>
                            <div className="row">
                                {
                                    dynamic_subCategory.sub_category[0] &&
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div class="border rounded shadow-sm brand-box carousel-item active carousel-box-overlay">
                                            <img src={dynamic_subCategory.sub_category[0].image} class="d-block w-100" alt="..." />
                                            <div class="carousel-caption p-0 ">
                                                <h5 className='mb-2'>{dynamic_subCategory.sub_category[0].name}</h5>
                                                <Button variant='outlined' color='light' onClick={() => getBrandProducts(dynamic_subCategory.slug, dynamic_subCategory.sub_category[0].slug)} >
                                                    Browse All
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                }
                                {
                                    dynamic_subCategory.sub_category[1] && dynamic_subCategory.sub_category[2] &&
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div className="border rounded shadow-sm brand-box sub-bx carousel-box-overlay">
                                            <img src={dynamic_subCategory.sub_category[1].image_md} className="img-fluid" />
                                            <div className="carousel-caption p-0" style={ {transform: 'translateY(10px)'}}>
                                                <h5 className='mb-2'>{dynamic_subCategory.sub_category[1].name}</h5>
                                                <Button variant='outlined' color='light' onClick={() => getBrandProducts(dynamic_subCategory.slug, dynamic_subCategory.sub_category[1].slug)} >
                                                    Browse All
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="border rounded shadow-sm brand-box sub-bx mt-4 carousel-box-overlay">
                                            <img src={dynamic_subCategory.sub_category[2].image_md} className="img-fluid" />
                                            <div className="carousel-caption p-0">
                                                <h5 className='mb-2'>{dynamic_subCategory.sub_category[2].name}</h5>
                                                <Button variant='outlined' color='light' onClick={() => getBrandProducts(dynamic_subCategory.slug, dynamic_subCategory.sub_category[2].slug)} >
                                                    Browse All
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                }
            </Fragment>
        )

    )
}
