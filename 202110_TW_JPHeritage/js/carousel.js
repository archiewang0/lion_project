const carousel = document.querySelector('.header-carousel')


$('.header-carousel').slick({
    dots: true,
    infinite: true,
    slidesToShow: 1,
    autoplay: false,
    autoplaySpeed: 2500,
    arrows: true,
    fade: true,

    prevArrow: '<div  class="slick-prev slick-arrow"><img src="./kinmen_img/icon-21.svg"></div>',
    nextArrow: '<div  class="slick-next slick-arrow"><img src="./kinmen_img/icon-22.svg"></div>',
})

// $('.header-carousel').slick()