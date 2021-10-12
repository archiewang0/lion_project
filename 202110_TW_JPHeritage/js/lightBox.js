

const videoLightIframe =  document.querySelector('.videoLightbox>iframe')
const videoLightCloseBtn = document.querySelector('.videoLightbox>.closeBtn')


videoLightCloseBtn.addEventListener('click',function(){
    document.querySelector('body').classList.toggle('videoOpen')
    document.querySelector('html').classList.toggle('videoOpen')
})

const playVideos = document.querySelectorAll('.videoPlay')



playVideos.forEach(function(item){
    item.addEventListener('click',function(){

        let link = this.dataset.link

        // console.log(videoLightIframe.contentWindow.querySelector('iframe'))

        let iframeInsideIframe = videoLightIframe.contentWindow.document.body.querySelector('iframe')

        iframeInsideIframe.src = link

        document.querySelector('body').classList.toggle('videoOpen')
        document.querySelector('html').classList.toggle('videoOpen')
    })
})