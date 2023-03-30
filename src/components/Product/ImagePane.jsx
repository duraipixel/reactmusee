import { Fragment, useState } from "react";
import "./imagepane.css";
import 'react-image-lightbox/style.css';
import Lightbox from 'react-image-lightbox';
import Slider from "react-slick";

export const ImagePane = ({ productInfo, hideMagnify }) => {
  const [productSliders, setProductSlider] = useState();
  const [navslider, setNavSlider] = useState();
  const [currentImg, setCurrentImg] = useState("");
  const sampleImgSrc = ["/assets/images/no_img_category_sm.jpg"];
  const images = productInfo.gallery || sampleImgSrc;
  const [photoIndex, setPhotoIndex] = useState(null);

  return (
    <Fragment>
      <div className="product-vewslder">
        <Slider arrows={true} asNavFor={navslider} ref={(slider1) => setProductSlider(slider1)} className="product-slider">
          {images.map((image, i) => (
            <div key={i} className='border rounded product-image-wrapper'>
              <img src={image} alt="product" className="product-slider-image" onClick={e => setPhotoIndex(i)} />
            </div>
          ))}
        </Slider>
        <Slider
          asNavFor={productSliders}
          ref={(slider2) => setNavSlider(slider2)}
          slidesToShow={2}
          autoplay={false}
          swipeToSlide={true}
          arrows={false}
          focusOnSelect={true}
          infinite
          centerMode
          cssEase={'linear'}
          variableWidth={true}
          variableHeight={true}
          className="thumb-sliders my-2"
          responsive={[{
            breakpoint: 1400,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1,
            },
          }, {
            breakpoint: 990,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          }, {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          }]}>
          {images.map((image, i) => (
            <div className="rounded border thumb-image-wrapper" key={i}>
              <img src={image} alt="call" onClick={e => setPhotoIndex(i)} className="product-thumb-image" />
            </div>
          ))}
        </Slider>
      </div>
      {
        photoIndex !== null &&
        <Lightbox
          animationOnKeyInput={true}
          enableZoom={true}
          clickOutsideToClose={false}
          mainSrc={images[photoIndex]}
          nextSrc={images[photoIndex + 1]}
          prevSrc={images[photoIndex - 1]}
          onCloseRequest={() => setPhotoIndex(null)}
          onMovePrevRequest={() => setPhotoIndex(photoIndex - 1)}
          onMoveNextRequest={() => setPhotoIndex(photoIndex + 1)}
        />
      }
    </Fragment>
  );
};
