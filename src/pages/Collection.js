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

export const Collection = () => {

    const [filterStaticMenu, setFilterStaticMenu] = useState([]);

    async function getFilterStaticMenuData() {
        const response =  await fetch(window.API_URL+'/get/filter/static/sidemenus')
                            .then((response) => response.json())
                            .then((data) => setFilterStaticMenu(data))
                            .catch((err) => {
                                // console.log(err.message)
                            });
    }

    useEffect(() => {
        getFilterStaticMenuData();
    }, []);

    // console.log(filterStaticMenu);
    // const isSideBarOpen = useSelector((state) => state.sideMenuBar.value);
    return (
        <Fragment>
            
            <SideCustomScrollbar />
            <Submenu />

            <section class="all-pianos-list">
                <div class="container">
                    <div class="row">

                        <Filter filterStaticMenu={filterStaticMenu}  />

                        <div class="col-lg-9 col-md-9 col-sm-12 col-xs-12">
                            <div class="pianos-lists">

                                <div class="col-lg-12 col-md-12 col-sm-12 d-flex
                                    justify-content-between">
                                    <div class="primary-heads">
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
            <section class="browse-categories">
                <div class="container">
                    <div class="row">

                        <div class="col-lg-12">
                            <div class="common-heads light">
                                <h2>Browse our other categories</h2>
                            </div>
                        </div>
                        <OtherCategory />
                    </div>
                </div>
            </section>
        </Fragment>
    )
}
