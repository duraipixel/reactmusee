import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { isOpenSideBar } from '../app/reducer/sideMenuBarSlice';
import { FilterPane } from '../components/Filter/FilterPane';
import { ProductCount } from '../components/Filter/ProductCount';
import { SortBy } from '../components/Filter/SortBy';
import { Submenu } from '../components/Layouts/Submenu';
import { OtherCategory } from '../components/Sliders/OtherCategory';
import SideCustomScrollbar from './../components/SideCustomScrollbar';
import { Filter } from './Filter';
import { fetchProducts } from './../app/reducer/productFilterSlice';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { fetchBrowseCategory } from './../app/reducer/otherCategorySlice';

export const Collection = () => {

    const [filterStaticMenu, setFilterStaticMenu] = useState([]);
    
    const otherCategory = useSelector((state) => state.browse);
    const [browseCategory, setBrowseCategory] = useState([]);

    const cUrl = new URL(window.location.href);    
    const categoryUrl = cUrl.searchParams.get('category');

    const dispatch = useDispatch();
    
    async function getFilterStaticMenuData() {
        
        await fetch(window.API_URL + '/get/filter/static/sidemenus')
            .then((response) => response.json())
            .then((data) => setFilterStaticMenu(data))
            .catch((err) => {
                // console.log(err.message)
            });

    }

    async function getOtherCategoryList(category) {

        await axios({
            url: window.API_URL + '/get/other/category',
            method: 'POST',
            data: {category:category},
        }).then((res) => {
            dispatch(fetchBrowseCategory(res.data) );
        }).catch((err) => {
        })
    }

    useEffect(() => {
        getFilterStaticMenuData();
        dispatch(fetchProducts());
        getOtherCategoryList(categoryUrl);
    }, [categoryUrl]);
    // const isSideBarOpen = useSelector((state) => state.sideMenuBar.value);
    return (
        <Fragment>
            <Helmet>

                <title> Product Filters | Musee Musical</title>
                <link rel="canonical" href={window.location.href} />
                {/* <meta name="keyword" content="" /> */}
                {/* <meta name="description" content={productInfo.meta.meta_description} /> */}
            </Helmet>
            <SideCustomScrollbar />
            <Submenu />

            <section className="all-pianos-list">
                <div className="container">
                    <div className="row">
                        <Filter filterStaticMenu={filterStaticMenu} />
                        <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
                            <div className="pianos-lists">
                                <div className="col-lg-12 col-md-12 col-sm-12 d-flex
                                    justify-content-between">
                                    <div className="primary-heads">
                                        <ProductCount />
                                    </div>
                                    <SortBy sort_by={filterStaticMenu.sory_by} />
                                </div>
                                <FilterPane />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {
                otherCategory.browse && otherCategory.browse.length > 0 &&
                <section className="browse-categories">
                    <div className="container">
                        <div className="row">

                            <div className="col-lg-12">
                                <div className="common-heads light">
                                    <h2>Browse our other categories</h2>
                                </div>
                            </div>
                            <OtherCategory otherCategory={otherCategory.browse} categoryUrl={categoryUrl} />
                        </div>
                    </div>
                </section>
            }
        </Fragment>
    )
}
