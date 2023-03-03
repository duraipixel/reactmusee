import { Fragment, useState, useRef, React } from "react";
import ReactImageMagnify from "react-image-magnify";
import Slider from "react-slick";
import "./imagepane.css";
import valueicon1 from "../../assets/images/det-1.jpg";
import valueicon2 from "../../assets/images/det-2.jpg";
import valueicon3 from "../../assets/images/det-3.jpg";
import guitar1 from "../../assets/images/guitar-1.jpg";
import guitar2 from "../../assets/images/guitar-2.jpg";

export const ImagePane = ({ productInfo, hideMagnify }) => {
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const imgRef = useRef([]);
  imgRef.current = [];
  const addRefs = (el) => {
    if (el && !imgRef.current.includes(el)) {
      imgRef.current.push(el);
    }
  };
  const sampleImgSrc = [
    "/assets/images/no_img_category_sm.jpg",
  ];
  const imgSrc = productInfo.gallery || sampleImgSrc;
  const [img, setImg] = useState(imgSrc[0]);

  const imgClickHandler = (image, i) => {
    setImg(image);
    imgRef.current[i].classList.add("details-images-container-active");
    for (let j = 0; j < image.length; j++) {
      if (i !== j) {
        imgRef.current[j].classList.remove("details-images-container-active");
      }
    }
  };

  const showMagnify = (e) => {
    var img, lens, result, cx, cy;
    
    
    img = document.querySelector('.slick-slide.slick-active.slick-current img');
    // const altImage = img;
    // console.log(altImage.clientWidth, 'altimage');
    // altImage.style.width = (altImage.clientWidth - 100) + "px";
    // console.log(altImage.clientWidth, 'altimage');

    result = document.getElementById('myresult');
    /*create lens:*/
    lens = document.createElement("DIV");
    lens.setAttribute("class", "img-zoom-lens");
    /*insert lens:*/
    img.parentElement.insertBefore(lens, img);
    /*calculate the ratio between result DIV and lens:*/
    cx = result.offsetWidth / lens.offsetWidth;
    cy = result.offsetHeight / lens.offsetHeight;
    /*set background properties for the result DIV:*/
    result.style.backgroundImage = "url('" + img.src + "')";
    result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";
    /*execute a function when someone moves the cursor over the image, or the lens:*/
    lens.addEventListener("mousemove", moveLens);
    img.addEventListener("mousemove", moveLens);
    /*and also for touch screens:*/
    lens.addEventListener("touchmove", moveLens);
    img.addEventListener("touchmove", moveLens);


    function moveLens(e) {
      document.getElementById('myresult').style.visibility = "visible";
      var pos, x, y;
      /*prevent any other actions that may occur when moving over the image:*/
      e.preventDefault();
      /*get the cursor's x and y positions:*/
      pos = getCursorPos(e);
      /*calculate the position of the lens:*/
      x = pos.x - (lens.offsetWidth / 2);
      y = pos.y - (lens.offsetHeight / 2);
      /*prevent the lens from being positioned outside the image:*/
      if (x > img.width - lens.offsetWidth) { x = img.width - lens.offsetWidth; }
      if (x < 0) { x = 0; }
      if (y > img.height - lens.offsetHeight) { y = img.height - lens.offsetHeight; }
      if (y < 0) { y = 0; }
      /*set the position of the lens:*/
      lens.style.left = x + "px";
      lens.style.top = y + "px";
      /*display what the lens "sees":*/
      result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
    }

    function getCursorPos(e) {

      var a, x = 0, y = 0;
      e = e || window.event;
      /*get the x and y positions of the image:*/
      a = img.getBoundingClientRect();
      /*calculate the cursor's x and y coordinates, relative to the image:*/
      x = e.pageX - a.left;
      y = e.pageY - a.top;
      /*consider any page scrolling:*/
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return { x: x, y: y };
    }
  }


  // imageZoom("img-fluid", "myresult");

  return (
    <Fragment>
      <div className="col-lg-6 pb-5">

        <div className="product-vewslder">
          <Slider asNavFor={nav2} ref={(slider1) => setNav1(slider1)} arrows={false}>

            {imgSrc.map((image, i) => (
              <div className="main-boxer" key={i}>
                <img src={image} alt="call" className="img-fluid" onMouseOut={() => hideMagnify()} onMouseEnter={() => showMagnify()} />
              </div>

              // <img key={i}
              //   onClick={() => imgClickHandler(image, i)}
              //   src={image}
              //   alt="details-pic"
              //   className={i === 0 ? "details-images-container-active" : ""}
              //   ref={addRefs}
              // />
            ))}

          </Slider>

          <Slider
            asNavFor={nav1}
            ref={(slider2) => setNav2(slider2)}
            slidesToShow={3}
            autoplay={false}
            swipeToSlide={true}
            arrows={false}
            focusOnSelect={true}
          >
            {imgSrc.map((image, i) => (
              <div className="thumb-boxer" key={i}>
                <img src={image} alt="call" className="img-fluid" />
              </div>

              // <img key={i}
              //   onClick={() => imgClickHandler(image, i)}
              //   src={image}
              //   alt="details-pic"
              //   className={i === 0 ? "details-images-container-active" : ""}
              //   ref={addRefs}
              // />
            ))}
            
          </Slider>
        </div>
      </div>
    </Fragment>
  );
};
