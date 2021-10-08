
let data = document.querySelectorAll('.swiper-slide > img')
data = Array.from(data)
const bannerData = []

const bannerCircle = document.querySelector('.outline')
const bannerDecoLine = document.querySelector('.decoLine>span')
console.log(bannerCircle)


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
    


    console.log(this)
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

    if(  secondBlockTop < window.scrollY ){
        body.classList.add('showBar')
    }
})


window.addEventListener('scroll',function(){
    const y = window.scrollY
    
    const bodyClassBeSet = body.getAttribute('class')

    if(secondBlockTop < y   ){
        body.classList.add('showBar')
    } else {
        body.classList.remove('showBar')
        
    }
})







// console.log(menuBtn)


// console.log(document.querySelector)