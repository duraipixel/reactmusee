import { Fragment, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FilterPane } from '../components/Filter/FilterPane';
import { ProductCount } from '../components/Filter/ProductCount';
import { SortBy } from '../components/Filter/SortBy';
import { OtherCategory } from '../components/Sliders/OtherCategory';
import { Filter } from './Filter';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { fetchBrowseCategory } from './../app/reducer/otherCategorySlice';
import { BsFilterCircleFill } from "react-icons/bs";
export const Collection = () => {

    const [filterStaticMenu, setFilterStaticMenu] = useState([]);
    var top_sub_MenuAll = (localStorage.getItem('topSubMenu') ? JSON.parse(localStorage.getItem('topSubMenu')) : []);

    const otherCategory = useSelector((state) => state.browse);
    const [browseCategory, setBrowseCategory] = useState([]);


    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const cUrl = new URL(window.location.href);
    const categoryUrl = searchParams.get('category');
    const filterStaticSideMenu = localStorage.getItem('filterStaticMenu') ? JSON.parse(localStorage.getItem('filterStaticMenu')) : [];
    const dispatch = useDispatch(); 
    async function getFilterStaticMenuData() {

        await fetch(window.API_URL + '/get/filter/static/sidemenus')
            .then((response) => response.json())
            .then((data) => {
                setFilterStaticMenu(data);
                localStorage.setItem('filterStaticMenu', JSON.stringify(data));
            }
            )
            .catch((err) => {
                // console.log(err.message)
            });

    }

    async function getOtherCategoryList(category) {

        await axios({
            url: window.API_URL + '/get/other/category',
            method: 'POST',
            data: { category: category },
        }).then((res) => {
            dispatch(fetchBrowseCategory(res.data));
        }).catch((err) => {
        })
    }

    const getFilterTab = () => {
        var filtermenu = document.getElementById('fil-optn')
        filtermenu.classList.add('hide')

        var sidefilter = document.getElementById('sdmnu-repnsve');
        sidefilter.classList.add('show')
    }

    useMemo(() => {
        if (filterStaticMenu.length === 0) {
            getFilterStaticMenuData();
        }
    }, []);
    const [filterIcon, setFilterIcon] = useState(true)
    const toggle = () => {
        setFilterIcon(!filterIcon)
    }
    return (
        <Fragment>
            <Helmet>
                <title> Product Filters | Musee Musical</title>
                <link rel="canonical" href={window.location.href} />
                {/* <meta name="keyword" content="" /> */}
                {/* <meta name="description" content={productInfo.meta.meta_description} /> */}
            </Helmet>
            {/* <div>
                <span className="fil-optn" id='fil-optn' onClick={getFilterTab}>
                    <i className="fa fa-filter" aria-hidden="true"></i>
                    Filter
                </span>
            </div> */}
            <div className={`bg-lightx  ${top_sub_MenuAll.length == 0 ? 'pt-lg-5' : ''}`}>
                <div className="container product-container">
                    <div className="row g-s3">
                        <div className="col-xl-3 p-0 p-xl-3 ">
                            <div className='position-relative'>
                                <Filter filterStaticMenu={filterStaticMenu} setFilterIcon={toggle} className={`filter-group ${filterIcon == true ? 'closed' : ''}`} />
                            </div>
                        </div>
                        <div className="col-xl">
                            <div className='card my-3'>
                                <div className="p-2 d-md-flex justify-content-between align-items-center">
                                    <div className='d-flex align-items-center'>
                                        <div className="me-2">
                                            <button className='filter-group-icon bg-none btn btn-sm'>
                                                <BsFilterCircleFill className='text-primary' size={30} onClick={toggle} />
                                            </button>
                                        </div>
                                        <ProductCount />
                                    </div>
                                    <SortBy sort_by={filterStaticSideMenu.sory_by} />
                                </div>
                            </div>
                            <FilterPane />
                        </div>
                    </div>
                </div>
            </div>
            {
                otherCategory.browse && otherCategory.browse.length > 0 &&
                <section className="browse-categories">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="common-heads light">
                                    <h1>Browse our other categories</h1>
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
