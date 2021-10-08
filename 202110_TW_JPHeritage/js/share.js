$(".menuBtn").click(function() {
	$("html,body").toggleClass('active');
});
$(".nav_list li a").click(function() {
	$("html,body").removeClass('active');
});



//出場動畫
// function section_active() {
//     $(".main_content>div").each(function(index, element) {
//         var _scrollTop = $(window).scrollTop();
//         var _href = $(this);
//         var _contentHeight = $(_href).outerHeight(true);
//         if ($(_href).offset() != undefined) {
//             var _hrefPosition = ($(_href).offset().top) | 0;
//         }
//         //重整後出現一次
//         window_halfh = $(window).height() / 7 * 6;
//         //在區域範圍內顯示 && _scrollTop < _hrefPosition + _contentHeight-window_halfh
//         if (_scrollTop >= _hrefPosition - window_halfh) {
//             $(_href).addClass('approach');
//         }
//     });
// }

// $(window).scroll(function() {
//         section_active();  
// });

// 錨點下滑
// $("a[href^=#]").click(function(){
//     $("html,body").stop().animate({scrollTop:$(this.hash).offset().top},800);
//     return false;
// });

//分頁 
// show_tabct、show_tab=>顯示內容
// var tab_on = $(".tab_title li");
// tab_on.click(function(){
// 	var nm = $(this).index();
// 	$(".tab_content").eq(nm).addClass('show_tabct').siblings().removeClass('show_tabct');
// 	$(this).addClass('show_tab').siblings().removeClass('show_tab');
// });


// gotop
var $window = $(window);
var ft_offset = $('.footer-wrapper > .footer-container > p').offset().top;


// let footerPosition = document.querySelector('.footer-wrapper > .footer-container > p').getClientRects()[0].y


// function getPosition (element) {
// 	var x = 0;
// 	var y = 0;
// 	// 搭配上面的示意圖可比較輕鬆理解為何要這麼計算
// 	while ( element ) {
// 	//   x += element.offsetLeft - element.scrollLeft + element.clientLeft;
// 	  x = x + element.offsetLeft - element.scrollLeft + element.clientLeft 
// 	  y += element.offsetTop - element.scrollLeft + element.clientTop;
// 	  element = element.offsetParent;
// 	}
  
// 	return { x: x, y: y };
// }

// let newPosition = getPosition(document.querySelector('.footer-wrapper > .footer-container > p'))


// console.log('這是footer位置  '+ft_offset)
// console.log(footerPosition)
// console.log(newPosition)


$window.on('scroll', function () {
	

	if ($window.scrollTop() > 0) {
		$(".gotop").addClass('show');
	} else {
		$(".gotop").removeClass('show');
	}

	if ($window.scrollTop() > ft_offset) {
		// console.log($window.scrollTop())
		$(".gotop").addClass('end');
	} else {
		$(".gotop").removeClass('end');
	}
}).scroll();

$(".gotop").click(function () {
	$("html, body").animate({
		scrollTop: 0 //屬性
	});
	return false;
});


