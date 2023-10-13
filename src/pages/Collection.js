import { Fragment, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FilterPane } from "../components/Filter/FilterPane";
import { ProductCount } from "../components/Filter/ProductCount";
import { SortBy } from "../components/Filter/SortBy";
import { OtherCategory } from "../components/Sliders/OtherCategory";
import { Filter } from "./Filter";
import { Helmet } from "react-helmet";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { fetchBrowseCategory } from "./../app/reducer/otherCategorySlice";
import { BsFilterCircleFill } from "react-icons/bs";
import './searchCss.css';
import { fetchProducts } from "../app/reducer/productFilterSlice";

const Collection = () => {
  const [filterStaticMenu, setFilterStaticMenu] = useState([]);
  const navigate = useNavigate();
  var top_sub_MenuAll = localStorage.getItem("topSubMenu")
    ? JSON.parse(localStorage.getItem("topSubMenu"))
    : [];

  const otherCategory = useSelector((state) => state.browse);
  const [browseCategory, setBrowseCategory] = useState([]);
  const [metaData, setMetaData] = useState([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  //console.log(searchParams);

  const cUrl = new URL(window.location.href);
  const categoryUrl = searchParams.get("category");
  const subCategoryUrl = searchParams.get("scategory");
  const searchKeyword = searchParams.get("search");
  const filterStaticSideMenu = localStorage.getItem("filterStaticMenu")
    ? JSON.parse(localStorage.getItem("filterStaticMenu"))
    : [];
  const dispatch = useDispatch();
  async function getFilterStaticMenuData() {
    await fetch(window.API_URL + "/get/filter/static/sidemenus")
      .then((response) => response.json())
      .then((data) => {
        setFilterStaticMenu(data);
        localStorage.setItem("filterStaticMenu", JSON.stringify(data));
      })
      .catch((err) => {
        // console.log(err.message)
      });
  }

  async function getOtherCategoryList(category) {
    await axios({
      url: window.API_URL + "/get/other/category",
      method: "POST",
      data: { category: category },
    })
      .then((res) => {
        dispatch(fetchBrowseCategory(res.data));
      })
      .catch((err) => { });
  }

  async function getMetaData() {
    await axios({
      url: window.API_URL + "/get-category-meta",
      method: "GET",
      params: { category: categoryUrl, scategory: subCategoryUrl },
    })
      .then((res) => {
        //console.log(res);
        if (res.status == 200 && res.data.meta) {
          if (res?.data.meta != null) {
            setMetaData(res.data.meta);
          }
        }
      })
      .catch((err) => { });
  }


  const getFilterTab = () => {
    var filtermenu = document.getElementById("fil-optn");
    filtermenu.classList.add("hide");

    var sidefilter = document.getElementById("sdmnu-repnsve");
    sidefilter.classList.add("show");
  };

  useEffect(() => {
    setMetaData([]);
    getMetaData();
  }, [subCategoryUrl, categoryUrl]);

  useMemo(() => {
    if (filterStaticMenu.length === 0) {
      getFilterStaticMenuData();
    }
  }, []);
  const [filterIcon, setFilterIcon] = useState(true);
  const toggle = () => {
    setFilterIcon(!filterIcon);
  };

  const removeSearchKeyword = () => {

    const url = new URL(window.location.href);
    const SUrl = "/products/search";
    searchParams.delete("search");
    navigate(SUrl + '?' + searchParams.toString());
    dispatch(fetchProducts('?' + searchParams.toString()));

  }
  return (
    <Fragment>
      <Helmet>
        <title>
          {" "}
          {metaData?.meta_title && metaData?.meta_title !== null
            ? metaData?.meta_title
            : 'Explore Our Collection of Musical Instruments - Musee Musical'}{" "}
        </title>
        <link rel="canonical" href={window.location.href} />
        <meta
          name="google-site-verification"
          content="Sz-Y0bbkprXfafs3xbhe_JgUQh4UABqy_dyTY4TJ9rk"
        />
        {metaData && metaData.meta_keyword && (
          <meta
            name="keywords"
            content={metaData.meta_keyword}
          />
        )}

        {metaData && metaData.meta_description && (
          <meta
            name="description"
            content={metaData.meta_description}
          />
        )}

        {metaData == null && (
          <meta
            name="description"
            content="Discover the finest collection of musical instruments available. Browse through our curated selection to find your perfect instrument."
          />
        )}
      </Helmet>
      {/* <div>
                <span className="fil-optn" id='fil-optn' onClick={getFilterTab}>
                    <i className="fa fa-filter" aria-hidden="true"></i>
                    Filter
                </span>
            </div> */}
      <div
        className={`bg-lightx  ${top_sub_MenuAll.length == 0 ? "pt-lg-5" : ""}`}
      >
        <div className="container product-container">
          <div className="row g-s3">
            <div className="col-xl-3 p-0 p-xl-3 ">
              <div className="position-relative">
                <Filter
                  filterStaticMenu={filterStaticMenu}
                  setFilterIcon={toggle}
                  className={`filter-group ${filterIcon == true ? "closed" : ""
                    }`}
                />
              </div>
            </div>
            <div className="col-xl">
              {searchKeyword &&
                <div className="card my-3">
                  <div className="p-2 d-md-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <div className="me-3">
                        Search result of :
                      </div>
                      <div className="card my-2 me-2">

                        <label className='px-2 search_product'>
                          {searchKeyword}

                          <span className="ms-2 px-1 text-danger" role="button" onClick={() => removeSearchKeyword()}>x</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              }
              <div className="card my-3">
                <div className="p-2 d-md-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <div className="me-2">
                      <button className="filter-group-icon bg-none btn btn-sm">
                        <BsFilterCircleFill
                          className="text-primary"
                          size={30}
                          onClick={toggle}
                        />
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
      {otherCategory.browse && otherCategory.browse.length > 0 && (
        <section className="browse-categories">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="common-heads light">
                  <h1>Browse our other categories</h1>
                </div>
              </div>
              <OtherCategory
                otherCategory={otherCategory.browse}
                categoryUrl={categoryUrl}
              />
            </div>
          </div>
        </section>
      )}
    </Fragment>
  );
};

export default Collection;