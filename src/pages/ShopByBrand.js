import { Fragment, useEffect, useMemo, useState } from 'react'
import { AllBrands } from '../components/Brands/AllBrands'
import { BrandList } from '../components/Brands/BrandList'
import { OtherCategory } from './../components/Sliders/OtherCategory';
import { Helmet } from 'react-helmet';
import { Button } from '@mui/material';

export const ShopByBrand = () => {

    const [isOpenBrand, setIsOpenBrand] = useState(false);
    const [brands, setBrands] = useState([]);
    const [brandsalphs, setBrandsalphs] = useState([]);

    const openBrandAll = () => {
        setIsOpenBrand(isOpenBrand => !isOpenBrand);
    }

    async function getAllBrands() {
        const response = await fetch(window.API_URL + '/get/brands')
            .then((response) => response.json())
            .then((data) => setBrands(data.data))
            .catch((err) => {
                // console.log(err.message)
            });
    }

    async function getAllBrandsAlphabets() {
        const response = await fetch(window.API_URL + '/get/brands/alphabets')
            .then((response) => response.json())
            .then((data) => setBrandsalphs(data))
            .catch((err) => {
                // console.log(err.message)
            });
    }

    useMemo(() => {

        if (brands.length === 0) {
            getAllBrands();
        }
        if (brandsalphs.length === 0) {
            getAllBrandsAlphabets()
        }

    }, []);


    return (
        <Fragment>
            <Helmet>
                <meta charSet="utf-8" />
                <title> Brand | Musee Musical</title>
                <link rel="canonical" href={window.location.href} />
                <meta name='title' content="Shop Branded Musical Instruments Online - Musée Musical"></meta>
                <meta name='description' content='Searching for shop-branded musical instruments? Look no further than Musée Musical. Browse our selection online and find your perfect instrument today. Shop now!'></meta>
            </Helmet>
            <img src={require('../assets/images/inner-banner-1.jpg')} className='w-100' />
            <div className="py-lg-4 py-3 shop-brands-top text-center">
                <div className="container">
                    <div className="common-heads text-center">
                        <h2>Shop from the top brands</h2>
                    </div>
                    <BrandList brands={brands} />
                    <AllBrands brands={brands} brandsalphs={brandsalphs} isOpenBrand={isOpenBrand} />
                    <Button onClick={openBrandAll} variant='outlined' color='dark' className='mt-3'>
                        {isOpenBrand ? 'Show Less' : 'View all Brands'}
                    </Button>
                </div>
            </div>

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
