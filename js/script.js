function onSignIn(googleUser) {
	// Useful data for your client-side scripts:
	var profile = googleUser.getBasicProfile();
	console.log("ID: " + profile.getId()); // Don't send this directly to your server!
	console.log('Full Name: ' + profile.getName());
	console.log('Given Name: ' + profile.getGivenName());
	console.log('Family Name: ' + profile.getFamilyName());
	console.log("Image URL: " + profile.getImageUrl());
	console.log("Email: " + profile.getEmail());

	// The ID token you need to pass to your backend:
	var id_token = googleUser.getAuthResponse().id_token;
	console.log("ID Token: " + id_token);
}

// Animation
const animItems = document.querySelectorAll('._anim-items');
if (animItems.length > 0) {
	window.addEventListener('scroll', animOnScroll);
	function animOnScroll() {
		for (let index = 0; index < animItems.length; index++) {
			const animItem = animItems[index];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = offset(animItem).top;
			console.log(animItemOffset)
			const animStart = 4;

			let animItemPoint = window.innerHeight - animItemHeight / animStart;
			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
				animItem.classList.add('_active');
			} else {
				if (!animItem.classList.contains('_anim-no-hide')) {
					animItem.classList.remove('_active');
				}
			}
		}
	}

	function offset(el) {
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
	}

	animOnScroll();
}

// Fixed Header
window.onscroll = function showHeader() {
	if (window.pageYOffset > 200) {
		header.classList.add('header-fixed');
	} else {
		header.classList.remove('header-fixed');
	}
}

$(document).ready(function () {

	let menu = $("#menu");

	// Burger
	$('.icon-wrap__icon').click(function (event) {
		$('.icon-wrap__icon,.menu__body').toggleClass('active');
		$('#bar').toggleClass('_active-bar');
		$('body').toggleClass('lock');
	})

	// Content for slide
	$('.photos__photo-wrap').click(function () {
		$(this).toggleClass('_active-content');
	});

	//Ibg
	function ibg() {
		$.each($('.ibg'), function (index, val) {
			if ($(this).find('img').length > 0) {
				$(this).css('background-image', 'url("' + $(this).find('img').attr('src') + '")');
			}
		});
	}
	ibg();

	// Smooth scroll
	$("[data-scroll]").on("click", function (event) {
		event.preventDefault();

		let elementID = $(this).data('scroll');
		let elementOffset = $(elementID).offset().top;

		menu.removeClass("show");

		$("html, body").animate({
			scrollTop: elementOffset + 1
		}, 700);
	});
});

$(window).on('load', function () {
	
// SLIDERS
$('.photos__items').each(function () {
	$(this).slick({
		infinite: true,
		arrows: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		speed: 300,
		easing: 'ease',
		touchThreshold: 9,
		waitForAnimate: false,
		nextArrow: '<button type="button" class="slick-next"></button>',
		prevArrow: '<button type="button" class="slick-prev"></button>',
		mobileFirst: true,
		responsive: [
			{
				breakpoint: 991,
				settings: 'unslick'
			},
			{
				breakpoint: 567,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			}
		]
	});
});

// Current-slide
$("#photos-about").on('afterChange', function (event, slick, currentSlide) {
	$("#cs-a_b").text(currentSlide + 2);
	$("#cs-a_l").text(currentSlide + 1);
});

$("#photos-gallery").on('afterChange', function (event, slick, currentSlide) {
	$("#cs-g_b").text(currentSlide + 2);
	$("#cs-g_l").text(currentSlide + 1);
});
	
// API Yandex Maps
ymaps.ready(function () {
	var myMap = new ymaps.Map('map', {
		center: [33.824834288413484, -118.2140069719211],
		zoom: 10
	}, {
		searchControlProvider: 'yandex#search'
	}),

		// Создаём макет содержимого.
		MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
			'<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
		),

		// myMap.panes.get('ground').getElement().style.filter = 'grayscale(100%)';

		myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
			hintContent: 'Long Beach',
			balloonContent: 'Long Beach, Калифорния, США'
		}, {
			// Опции.
			// Необходимо указать данный тип макета.
			iconLayout: 'default#image',
			// Своё изображение иконки метки.
			iconImageHref: 'img/Find-us/Marker.png',
			// Размеры метки.
			iconImageSize: [45, 60],
			// Смещение левого верхнего угла иконки относительно
			// её "ножки" (точки привязки).
			iconImageOffset: [-22.5, -60]
		});

	myMap.controls
		.remove('rulerControl')
		.remove('geolocationControl')
		.remove('searchControl')
		.remove('trafficControl')
		.remove('fullscreenControl')
		.remove('typeSelector');

	myMap.behaviors.disable([
		'drag',
		'scrollZoom'
	]);

	myMap.geoObjects
		.add(myPlacemark)
});
});
