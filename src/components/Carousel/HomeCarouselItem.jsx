import Carousel from "react-bootstrap/Carousel";
import { LazyLoadImage } from "react-lazy-load-image-component";
export const HomeCarouselItem = ({ banners }) => {
  if (banners) return (
    <Carousel className="carousel-inner">
      {banners.map((item, index) => (
        <Carousel.Item
          className={`carousel-item ${item.id === 2 ? "active" : ""}`}
          key={item.id}
        >
          <a href={item.links} className="d-block">

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
  );
};