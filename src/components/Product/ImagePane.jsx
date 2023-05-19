import { Fragment, useMemo, useState } from "react";
import "./imagepane.css";
import 'react-image-lightbox/style.css';
import Lightbox from 'react-image-lightbox';
import Slider from "react-slick";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Helmet } from 'react-helmet';


export const ImagePane = ({ productInfo, hideMagnify }) => {
  const [productSliders, setProductSlider] = useState();
  const [navslider, setNavSlider] = useState();
  const sampleImgSrc = ["/assets/images/no_img_category_sm.jpg"];
  const tempImgs = productInfo.gallery || sampleImgSrc;
  var images = []
  // console.log(tempImgs, 'tempImgs');
  // if(tempImgs.length < 4) {
  //   for (let index = 0; index < 2; index++) {
  //     images.push(tempImgs[0])
  //   }
  // } else {
  //   images = tempImgs
  // }
  images = tempImgs
  

  const [photoIndex, setPhotoIndex] = useState(null);
  document.querySelector("html").style.overflow = photoIndex !== null ? 'hidden' : 'auto'
  return (
    <Fragment>
      <div className="product-vewslder">
        <Slider arrows={true} asNavFor={navslider} ref={(slider1) => setProductSlider(slider1)} className="product-slider">
          {images.map((image, i) => (
            <div key={i} className='border rounded product-image-wrapper'>
              <LazyLoadImage effect="blur" src={image} alt="product" className="product-slider-image" onClick={e => setPhotoIndex(i)} />
            </div>
          ))}
        </Slider>
        <Slider
          asNavFor={productSliders}
          ref={(slider2) => setNavSlider(slider2)}
          slidesToShow={1}
          autoplay={false}
          swipeToSlide={true}
          arrows={false}
          focusOnSelect={true}
          infinite
          centerMode={true}
          cssEase={'linear'}
          variableWidth={true}
          variableHeight={true}
          className={`thumb-sliders my-2 ${images.length < 4 ? 'slick-single-track' : ''}`}
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
            <div className="rounded border thumb-image-wrapper text-center" key={i}>
              <LazyLoadImage src={image} alt="call" className="product-thumb-image" />
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
