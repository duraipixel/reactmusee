(function($) {
  "use strict";
  
  AOS.init({
    disable: function () {
      var maxWidth = 700;
      return window.innerWidth < maxWidth;
    }
  });

 
  $('.counter').countUp();




  window.onload = function () {
    $('.favorite-trends-slider').slick({
      autoplay: true,
      autoplaySpeed: 3000,
      arrows: false, 
      slidesToShow: 3,
      dots: true,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1400,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 960,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    });
  };


  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    //console.log(scroll);
    if (scroll >= 200) {
      //console.log('a');
      $("body").addClass("pad-top");
      $("header").addClass("fixed-top");
      $(".product-image3").addClass("active");
    } else {
      //console.log('a');
      $("body").removeClass("pad-top");
      $("header").removeClass("fixed-top");
      $(".product-image3").removeClass("active");
    }
  }); 

    // Back to top button
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    //console.log(scroll);
    if (scroll >= 300) {
      //console.log('a');
      $(".back-to-top").addClass("scrollfixed");
    } else {
      //console.log('a');
      $(".back-to-top").removeClass("scrollfixed");
    }
  });

  $(".town-bus-mobile-btn").click(function () {
    $(".town-bus-nav").toggleClass("active");
    $(this).toggleClass("active");
  });

  $(".town-bus-nav li a").click(function () {
    $(".town-bus-mobile-btn").toggleClass("active");
    $(".town-bus-nav").toggleClass("active");
  });

  $("#food-menu").click(function () {
    $("#dairy-menu").removeClass("active");
    $(".mega-menu ul").addClass("active");
    $(this).addClass("active");
  });

  $("#dairy-menu").click(function () {
    $("#food-menu").removeClass("active");
    $(".mega-menu ul").removeClass("active");
    $(this).addClass("active");
  });

 

  $('#homeCarousel').carousel({
    interval: 3000,
    cycle: true,
    pause: false,
  });  

  $('#mediaCarousel').carousel({
    interval: false,
    cycle: true,
  }); 



  

})(jQuery);