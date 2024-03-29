import { Fragment, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMenus } from "./../../app/reducer/menuSlice";
import { fetchProducts } from "./../../app/reducer/productFilterSlice";
import { fetchBrowseCategory } from "../../app/reducer/otherCategorySlice";
import { useState, useMemo } from "react";
import { useTopMenuQuery } from "../../app/services/topMenuApi";

export const Submenu = ({ topSubmenu }) => {
  const topMenu = useTopMenuQuery();
  //console.log(topSubmenu);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [menuCategory, setMenuCategory] = useState("");
  const [menuSubCategory, setMenuSubCategory] = useState("");
  const [topSubMenuAll, setTopSubMenuAll] = useState([]);

  const searchParams = new URLSearchParams(location.search);
  const categoryUrl = searchParams.get("category");
  const subCategoryUrl = searchParams.get("scategory");
  const commonUrl = new URL(window.location.href);
  var top_sub_MenuAll = [];

  if (categoryUrl && topMenu?.data?.data) {
    const main_menu = localStorage.getItem("allMenu")
      ? JSON.parse(localStorage.getItem("allMenu"))
      : [];
    topMenu.data.data.map((menu) => {
      if (menu.slug === categoryUrl) {
        top_sub_MenuAll = menu;
      }
    });
  }
  //   var top_sub_MenuAll = localStorage.getItem("topSubMenu")
  //     ? JSON.parse(localStorage.getItem("topSubMenu"))
  //     : [];

  //console.log(top_sub_MenuAll);

  const setUrlCategory = (slug) => {
    window.scroll(0, 0);
    const SUrl = "/products/search";
    if (slug == "all") {
      searchParams.set("category", top_sub_MenuAll.slug);
      searchParams.delete("scategory");
    } else {
      searchParams.set("category", top_sub_MenuAll.slug);
      searchParams.set("scategory", slug);
    }
    navigate(SUrl + "?" + searchParams.toString());
    setMenuCategory(top_sub_MenuAll.slug);
    setMenuSubCategory(slug);
    dispatch(fetchProducts("?" + searchParams.toString()));
  };
  // useMemo(() => {
  //     dispatch(fetchProducts('?' + searchParams.toString()));
  //     // dispatch(fetchBrowseCategory(menuCategory));
  // }, [menuCategory, menuSubCategory])

  useEffect(() => {
    if (window.performance) {
      if (performance.navigation.type == 1) {
        if (commonUrl.searchParams.get("category")) {
          dispatch(fetchMenus(commonUrl.searchParams.get("category")));
        }
      }
    }
  }, []);

  if (categoryUrl && top_sub_MenuAll?.child?.length > 0) {
    document.querySelector("body").classList.add("padding-top");
  } else {
    document.querySelector("body").classList.remove("padding-top");
  }
  if (categoryUrl && top_sub_MenuAll?.child?.length > 0)
    return (
      <Fragment>
        <div className="secondary-menu text-center">
          <div className="container">
            <div>
              <button
                role="button"
                onClick={() => setUrlCategory("all")}
                className={`secondary-menu-link ${
                  top_sub_MenuAll.slug === searchParams.get("category") &&
                  !searchParams.get("scategory")
                    ? "active"
                    : ""
                }`}
              >
                All {top_sub_MenuAll.name}
              </button>
              {top_sub_MenuAll != undefined &&
                top_sub_MenuAll.child.length > 0 &&
                top_sub_MenuAll.child &&
                top_sub_MenuAll.child.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => setUrlCategory(item.slug)}
                    className={`secondary-menu-link ${
                      item.slug === searchParams.get("scategory")
                        ? "active"
                        : ""
                    }`}
                  >
                    {" "}
                    {item.name}{" "}
                  </button>
                ))}
            </div>
          </div>
        </div>
      </Fragment>
    );
};
