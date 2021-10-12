
let data = document.querySelectorAll('.swiper-slide > img')
data = Array.from(data)
const bannerData = []

const bannerCircle = document.querySelector('.outline')
const bannerDecoLine = document.querySelector('.decoLine>span')
// console.log(bannerCircle)


const body = document.querySelector('body');
const html = document.querySelector('html')

data.forEach((item)=>{
    const object = {
        title : item.dataset.title,
        location: item.dataset.location
    }
    bannerData.push(object)
})

console.log(bannerData)



let bannerDelayTime = 3000

const swiper = new Swiper('.banner', {
    loop: true,
    effect: 'fade',
    autoplay: {
        delay: bannerDelayTime,
        disableOnInteraction: false,
        // 進行別的動做 click 還會繼續 autoplay
    },

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
            // return '<span class="' + className + '">' + '<img src="./img/pagination'+ (index+1) +'.jpeg" alt="">' + '</span>';
            return `
                <span class="${className}">
                    <div>
                        <img src="./img/_text${index+1}.svg" alt="" class="text">
                        <img src="./img/pagination${index+1}.jpeg" alt="" class="bg">
                    </div>
                </span>
            `
        },
    },

    on: {
        init: function () {
            bannerCircleAnimation(bannerDelayTime)
            bannerDecoLineAnimation(bannerDelayTime)

        },
    },

});


const BannerLocation = document.querySelector('.location >div>p')
const BannerTitle = document.querySelector('.setTitle')
const BannerTextIcons = document.querySelectorAll('.setClass svg')


swiper.on('slideChange', function () {

    const idx = this.realIndex

    BannerLocation.textContent = bannerData[idx].location
    BannerTitle.textContent = bannerData[idx].title
    

    BannerTextIcons.forEach((icon)=>{
        icon.removeAttribute('class')
    })
    BannerTextIcons[idx].classList.add('show');




    bannerCircle.removeAttribute('style')
    bannerDecoLine.removeAttribute('style')
    
    let time = setTimeout(()=>{
        bannerCircleAnimation(bannerDelayTime)
        bannerDecoLineAnimation(bannerDelayTime)

        clearTimeout(time)
    },50)
    
});


function bannerCircleAnimation(time){
    let s = time/1000

    bannerCircle.style.transition = `all ${s}s ease-in`
    bannerCircle.style.width ="0px"
    bannerCircle.style.height ="0px"
    bannerCircle.style.opacity = 0
}

function bannerDecoLineAnimation(time){
    let s = time/1000

    bannerDecoLine.style.transition = `all ${s}s ease-in`
    bannerDecoLine.style.height ="0%"
    bannerDecoLine.style.opacity = 0

}


// ----------------------------------------------------- menu ----
const menuBtn = document.querySelector('.menuBtn')

menuBtn.addEventListener('click',function(){
    html.classList.toggle('menuActive')
    body.classList.toggle('menuActive')
})


let secondBlockTop;


window.addEventListener('load',function(){
    secondBlockTop = window.scrollY + document.querySelector('.explore').getBoundingClientRect().y
    console.log(secondBlockTop)

    if(  secondBlockTop < window.scrollY+50 ){
        body.classList.add('showBar')
    }
})


window.addEventListener('scroll',function(){
    const y = window.scrollY
    
    const bodyClassBeSet = body.getAttribute('class')

    if(secondBlockTop < y + 50  ){
        body.classList.add('showBar')
    } else {
        body.classList.remove('showBar')
        
    }
})



function copyCarouselItem(){
    let container = document.querySelector('.itemContainer')
    let items = container.querySelectorAll('div')
    items = Array.from(items)

    console.log(items)
    items.forEach((item)=>{
        container.appendChild(item)
    })

    // 將內容挖出 在建立新的div 放入在塞回 container
    items.forEach((item)=>{
        let clone = item.cloneNode(true);
        container.appendChild(clone)
    })
}

copyCarouselItem()




const swiperVideo = new Swiper('.videoContainer', {
    loop: true,
    slidesPerView: 1,
    centeredSlides: true,
    spaceBetween: 100,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    // autoplay: {
    //     // delay: 5000,
    //     // disableOnInteraction: false,
    //     // 進行別的動做 click 還會繼續 autoplay
    // },
    breakpoints: {
        // when window width is >= 320px
        980: {
            slidesPerView: 3,
            spaceBetween: 100
        },
    }
});

// console.log(document.querySelector)

const swiperLionInfo = new Swiper('.imgCarousel',{
    loop: true,
    effect: 'fade',
    pagination: {
        clickable: true,
        el: '.swiper-pagination',

    },
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        // 進行別的動做 click 還會繼續 autoplay
    },
})


// 錨點下滑
// $("a[href^=#]").click(function(){
//     $("html,body").stop().animate({scrollTop:$(this.hash).offset().top},800);
//     return false;
// });

// 錨點下滑
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        if (window.innerWidth < 980){
            html.classList.toggle('menuActive')
            body.classList.toggle('menuActive')
        }
    

        // 抓到 錨點 連到的element
        const getTargetElement = document.querySelector(this.getAttribute('href'))
        // scrollIntoView 使用在element 身上
        getTargetElement.scrollIntoView({
            behavior: 'smooth'
        });
    });
});



const swiperWhereLion = new Swiper('.lionContainer',{
    loop:true,
    effect: 'fade',
    autoplay: {
        delay: 10000,
        disableOnInteraction: false,
        // 進行別的動做 click 還會繼續 autoplay
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,

        renderBullet: function (index, className) {
            return `
                <span class="${className}">
                        <img src="./img/wheresLionImg${index+1}.png" alt="">
                </span>
            `
        },
    }
})

swiperWhereLion.on('slideChange',function(){
    let currentSlide = this.slides[this.activeIndex]
    console.log(this.activeIndex)
    // console.log(this)
    // console.log(this.slides[this.realIndex])

    let texts = currentSlide.querySelectorAll('.WLdecoText')

    TweenMax.staggerFrom(
        texts,
        2,
        {
            scaleX: 0,
            opacity: 0,
            ease: Elastic.easeInOut.config(1, 0.3),
        },
        .5
    )
    console.log(texts)
})