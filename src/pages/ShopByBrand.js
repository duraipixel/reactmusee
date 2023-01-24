import React, { Fragment, useEffect, useState } from 'react'
import { AllBrands } from '../components/Brands/AllBrands'
import { BrandList } from '../components/Brands/BrandList'
import { OtherCategory } from './../components/Sliders/OtherCategory';
import { Helmet } from 'react-helmet';

export const ShopByBrand = () => {

    const [isOpenBrand, setIsOpenBrand] = useState(false);
    const [brands, setBrands] = useState([]);
    const [brandsalphs, setBrandsalphs] = useState([]);
    
    const openBrandAll = () => {
        setIsOpenBrand(isOpenBrand => !isOpenBrand);
    }

    async function getAllBrands() {
        const response =  await fetch(window.API_URL+'/get/brands')
                            .then((response) => response.json())
                            .then((data) => setBrands(data.data))
                            .catch((err) => {
                                // console.log(err.message)
                            });
    }

    async function getAllBrandsAlphabets() {
        const response =  await fetch(window.API_URL+'/get/brands/alphabets')
                            .then((response) => response.json())
                            .then((data) => setBrandsalphs(data))
                            .catch((err) => {
                                // console.log(err.message)
                            });
    }
    
    useEffect(()=>{

        if( brands.length === 0 ) {
            getAllBrands();
        }
        if( brandsalphs.length === 0 ) {
            getAllBrandsAlphabets()
        }

    }, []);


    return (
        <Fragment>
            <Helmet>
                <meta charSet="utf-8" />
                <title> Brand | Musee Musical</title>
                <link rel="canonical" href="https://museemusical.shop/brand" />
            </Helmet>
            <section className="inner-banner shopbybrand"
                >
                <div className="container">
                    <div className="row">

                        <div className="inner-liners">
                            <h1>
                                Your search for the perfect brand 
                                <br/>
                                of instruments ends here
                            </h1>
                        </div>

                    </div>
                </div>
            </section>

            <section className="shop-brands-top text-center">
                <div className="container">
                    <div className="row">

                        <div className="col-lg-12 col-md-12 col-sm-12
                            col-xs-12">

                            <div className="inner-headngs">
                                <h2>Shop from the top brands</h2>
                            </div>

                            <BrandList brands={brands} />
                        </div>

                        <AllBrands brands={brands} brandsalphs={brandsalphs} isOpenBrand={isOpenBrand} />

                        <div className="col-lg-12 text-center">
                            <div className="load-btn">
                                <a onClick={openBrandAll}
                                    className="show-brands">
                                    {isOpenBrand ? 'Show Less' : 'View all Brands'}
                                </a>
                            </div>
                        </div>


                    </div>
                </div>
            </section>
            
            <section className="browse-categories">
                <div className="container">
                    <div className="row">

                        <div className="col-lg-12">
                            <div className="common-heads light">
                                <h2>Can’t decide a brand?<br /> Shop by
                                    category instead</h2>
                            </div>
                        </div>

                        <OtherCategory />

                    </div>
                </div>
            </section>
        </Fragment>
    )
}
