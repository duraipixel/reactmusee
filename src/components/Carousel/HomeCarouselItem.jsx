import { Fragment } from "react";
import Carousel from "react-bootstrap/Carousel";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../app/reducer/productFilterSlice";
import axios from "axios";
import cheerio from "cheerio";

export const HomeCarouselItem = ({ banners }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const goToProductListPage = (search_slug) => {
    // Remove the fragment identifier from the URL
    const urlWithoutFragment = search_slug.split("?")[1] || '';
    
    if( urlWithoutFragment ) {
      var frag_data = urlWithoutFragment.split("&");
      let search_data;
      search_data = frag_data.find((user) => user.includes("search"));
      
      if( typeof search_data == 'undefined') {
        // console.log( 'teste');
        window.location.href = search_slug;
      } else {
        
        var search_url_params = search_data.split("=")[1];
        search_url_params = search_url_params.replace('+', ' ');
        
        const SUrl = "/products/pfilter";
        searchParams.set("search", search_url_params);
        navigate(SUrl + '?' + searchParams.toString());
        dispatch(fetchProducts('?' + searchParams.toString()));
      }
    }
  }

  return (
    <Fragment>
      <Carousel className="carousel-inner">
        {banners &&
          banners.map((item, index) => (
            <Carousel.Item
              className={`carousel-item ${item.id == 2 ? "active" : ""}`}
              key={item.id}
            >
              <a onClick={() => goToProductListPage(item.links)}>

                <LazyLoadImage
                  effect="blur"
                  src={item.image}
                  alt={item.title}
                  className="w-100 pc-banner"
                  role="button"
                />
                <LazyLoadImage
                  effect="blur"
                  src={item.mobile_banner}
                  alt={item.title}
                  className="w-100 moby-banner"
                />
                <Carousel.Caption className="carousel-caption animated animatedFadeInUp fadeInUp">
                  {/* <img src="assets/images/banner-logo.png" alt="" className="img-fluid" /> */}
                  {/* <h1 className="text-blue">
                                    {item.title}
                                    <span>{item.tag_line}</span> 
                                </h1> */}
                  {/* <a href="#"> Shop Now </a> */}
                </Carousel.Caption>
              </a>
            </Carousel.Item>
          ))}
      </Carousel>
    </Fragment>
  );
};
