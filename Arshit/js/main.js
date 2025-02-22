$(window).on("load", () => {
	const filterItem = $(".galNav-items");
	const gallery = $('#gallery');

	function filterImages(filterName) {
		gallery.find('.img-holder').each(function () {
			let filterImges = $(this).data("name");
			if ((filterImges == filterName)) {
				$(this).removeClass("d-none").addClass("show");
			} else {
				$(this).addClass("d-none").removeClass("show");
			}
		});
	}

	filterImages('cyber-security');

	filterItem.on("click", ".gal-nav-item", function () {
		filterItem.find(".active").removeClass("active");
		$(this).addClass("active");
		let filterName = $(this).data("name");
		filterImages(filterName);
	});
});

(function ($) {
	"use strict";

	// Smooth scrolling using Gsap
	let offsetTop = Math.floor($('#mainNav').height());
	$(document).on("click", 'a.js-scroll-trigger[href*="#"]:not([href="#"])', function (event) {
		if (
			location.pathname.replace(/^\//, "") === this.pathname.replace(/^\//, "") &&
			location.hostname === this.hostname
		) {
			let target = $(this.hash);
			target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
			if (target.length) {
				gsap.to(window, {
					duration: 1,
					scrollTo: { y: target.offset().top - offsetTop },
					ease: "power4.out"
				});
				event.preventDefault();
			}
		}
	});

	// Closes responsive menu when a scroll trigger link is clicked
	$('.js-scroll-trigger').on("click", function () {
		$('.navbar-collapse').collapse('hide');
		$('.plate').toggleClass('active');
	});

	$('.plate').click(function (e) {
		e.preventDefault();
		$('.plate').toggleClass('active');
	});

	// Activate scrollspy to add active class to navbar items on scroll
	new bootstrap.ScrollSpy(document.body, {
		target: '#mainNav',
		offset: offsetTop
	});

	// Collapse Navbar
	function navbarCollapse() {
		if ($("#mainNav").offset().top > 100) {
			$("#mainNav").addClass("navbar-shrink");
		} else {
			$("#mainNav").removeClass("navbar-shrink");
		}
	}

	navbarCollapse();
	$(window).on("scroll", navbarCollapse);

	// Hide navbar when modals trigger
	$('.portfolio-modal').on('show.bs.modal', function () {
		$(".navbar").addClass("d-none");
	});
	$('.portfolio-modal').on('hidden.bs.modal', function () {
		$(".navbar").removeClass("d-none");
	});

	// Scroll to top
	if ($("#scroll-to-top").length) {
		let scrollTrigger = 100;

		function backToTop() {
			let scrollTop = $(window).scrollTop();
			if (scrollTop > scrollTrigger) {
				$("#scroll-to-top").addClass("show");
			} else {
				$("#scroll-to-top").removeClass("show");
			}
		}

		backToTop();
		$(window).on("scroll", backToTop);

		$("#scroll-to-top").on("click", function (e) {
			e.preventDefault();
			gsap.to(window, {
				duration: 1,
				scrollTo: { y: 0 },
				ease: "power4.out"
			});
		});
	}

	// Banner
	$('.home-heading').height($(window).height());

	const gallery = $('#gallery');
	const data = window.galData;

	// Render images in the order specified by the nav items, excluding "all"
	$(".gal-nav-item").not('[data-name="all"]').each(function () {
		let category = $(this).data("name");
		if (data[category]) {
			data[category].forEach(item => {
				const imgHolder = $(`
					<div class="img-holder col-md-4" data-name="${category}" data-aos="fade-up">
						<a href="${item.path}" data-size="${item.size}">
							<img loading="lazy" class="img-fluid" src="${item.path}" alt="${item.title}">
						</a>
					</div>
				`);
				gallery.append(imgHolder);
			});
		}
	});

	/* photoswipe
	* ----------------------------------------------------- */
	let PhotoswipeZoom = function () {
		let items = [],
			$pswp = $('.pswp')[0],
			$imgHolder = $('.img-holder');

		// get items
		$imgHolder.each(function (i) {
			let $imgItem = $(this),
				$thumbLink = $imgItem.find('a'),
				$title = '<h3>' + $imgItem.find('img').attr('alt') + '</h3>',
				$href = $thumbLink.attr('href'),
				$size = $thumbLink.data('size').split('x'),
				$width = $size[0],
				$height = $size[1];

			let item = {
				src: $href,
				w: $width,
				h: $height
			}

			if ($title.length > 0) {
				item.title = $title;
			}

			items.push(item);
		});

		// bind click event
		$imgHolder.each(function (i) {
			$(this).find('a').on('click', function (e) {
				e.preventDefault();
				let options = {
					index: i,
					showHideOpacity: true
				}
				// initialize PhotoSwipe
				let lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options);
				lightBox.init();
			});
		});
	};
	PhotoswipeZoom();
})(jQuery);
