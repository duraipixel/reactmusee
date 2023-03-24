import { Fragment, useState, useRef, React } from "react";
import "./imagepane.css";
import 'react-image-lightbox/style.css';
import Lightbox from 'react-image-lightbox';
import Slider from "react-slick";

export const ImagePane = ({ productInfo, hideMagnify }) => {
  const [productSliders, setProductSlider] = useState();
  const [navslider, setNavSlider] = useState();
  const [currentImg, setCurrentImg] = useState("");
  const sampleImgSrc = ["/assets/images/no_img_category_sm.jpg"];
  const imgSrc = productInfo.gallery || sampleImgSrc;
  return (
    <Fragment>
      <div className="col-lg-6 pb-5">

        <div className="product-vewslder">
          <Slider asNavFor={navslider} ref={(slider1) => setProductSlider(slider1)} arrows={false}>
            {imgSrc.map((image, i) => (
              <img src={image} key={i} alt="product" className="rounded product-slider-image" onClick={e => setCurrentImg(image)} />
            ))}
          </Slider>
          <Slider
            asNavFor={productSliders}
            ref={(slider2) => setNavSlider(slider2)}
            slidesToShow={3}
            autoplay={false}
            swipeToSlide={true}
            arrows={false}
            focusOnSelect={true}
            infinite
            centerMode
            className="thumb-sliders my-2"
          >
            {imgSrc.map((image, i) => (
              <img src={image} alt="call" key={i} className="rounded product-slider-thumb-image" />
            ))}
          </Slider>
        </div>
      </div>
      {currentImg &&
        <Lightbox
          mainSrc={currentImg}
          onCloseRequest={() => setCurrentImg("")}
        />
      }
    </Fragment>
  );
};
