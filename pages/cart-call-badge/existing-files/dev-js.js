// local\templates\main\assets\js\dev-js.js

$(document).ready(function () {
    initHeaderOffset();
    initTippyTooltip();
    initSearchFormDrop();
    initDropHover();
    initBannerSlider();
    initNewsSlider();
    initExpandedList();
    initOrderSliderMobile();
    initTippy();
    initTab();
    initArticleSlider();
    initCatalogSlider();
    initFaqAccordion();
    initStickBar();
    initFilter();
    initHeaderMenu();
    initProductPageSlider();
    initProductSlider();
    initCardStickyBlock();
});

function initCardStickyBlock(){
	var window_width = $(window).width();
	if (window_width < 768) {
        $(window).on('load resize scroll', function () {
            if ($(window).scrollTop() > 500) {
                $('body').addClass('sticky-card-show');
            } else {
                $('body').removeClass('sticky-card-show');
            }
        });
    }
}

function initFilter() {
    $('.filter-btn').on('click', function (e) {
        e.preventDefault();
        $('body').toggleClass('filter-open');
    });
    $('.catalog-filter-mobile-close').on('click', function (e) {
        e.preventDefault();
        $('body').removeClass('filter-open');
    });
}

function initStickBar() {
    var window_width = $(window).width();

    if (window_width < 1024) {
        $("#sticky").trigger("sticky_kit:detach");
    } else {
        make_sticky();
    }

    $(window).on('resize load', function () {

        window_width = $(window).width();

        if (window_width < 1024) {
            $("#sticky").trigger("sticky_kit:detach");
        } else {
            make_sticky();
        }

    });

    function make_sticky() {
        var headerHeight = $('.header').innerHeight();
        $("#sticky").stick_in_parent({
            offset_top: headerHeight + 20
        });
    }
};

function initFaqAccordion() {
    $('.catalog-faq__dropdown-bar:not(.open) .content').hide();
    $('.catalog-faq__dropdown-bar .title').on('click', function (e) {
        e.preventDefault();
        var item = $(this).closest('.catalog-faq__dropdown-bar')[0];
        $(this).closest('.catalog-faq__dropdown-bar').toggleClass('open');
        if ($(this).closest('.catalog-faq__dropdown-bar').hasClass('open')) {
            $(this).closest('.catalog-faq__dropdown-bar').find('.content').stop().slideDown();
            $(this).closest('.catalog-faq__dropdown-bar').closest('.faq-box').find('.catalog-faq__dropdown-bar').each(function () {
                if (this != item) {
                    $(this).removeClass('open').find('.content').stop().slideUp()
                }
            });
        } else {
            $(this).closest('.catalog-faq__dropdown-bar').find('.content').stop().slideUp();
        }
    });
}

function initProductPageSlider() {
    // Product gallery slider
    var swiper = new Swiper(".product-thumbs", {
        spaceBetween: 15,
        slidesPerView: 'auto',
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            1014: {
                slidesPerView: 5,
            }
        }
    });
    var swiper2 = new Swiper(".product-slider", {
        slidesPerView: 1,
        spaceBetween: 10,
        nested: true,
        visibilityFullFit: true,
        thumbs: {
            swiper: swiper,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    // Product gallery slider
}

function initCatalogSlider() {
    $(".catalog-slider").each(function () {
        const self = this;
        var swiper = new Swiper(this, {
            slidesPerView: 'auto',
            loop: false,
            spaceBetween: 10,
            autoHeight: true,
            navigation: {
                nextEl: $(self).closest('.slider-holder').find(".swiper-button-next").get(0),
                prevEl: $(self).closest('.slider-holder').find(".swiper-button-prev").get(0),
            },
            breakpoints: {
                768: {
                    spaceBetween: 20,
                }
            }
        });
    });
}

function initArticleSlider(){
    $(".article-slider").each(function () {
        const self = this;
        var swiper = new Swiper(this, {
            slidesPerView: 1,
            loop: false,
            spaceBetween: 10,
            autoHeight: true,
            mousewheel: false,
            effect: "fade",
            pagination: {
                el: $(self).closest('.article-slider').find(".swiper-pagination").get(0),
                clickable: true,
            },
            navigation: {
                nextEl: $(self).closest('.article-slider').find(".swiper-button-next").get(0),
                prevEl: $(self).closest('.article-slider').find(".swiper-button-prev").get(0),
            },
        });
    });
}



// Init tab function
function initTab() {
    $('[data-tabs]').on('click', function (e) {
        e.preventDefault();
        $(this).closest('li').addClass('active').siblings('li.active').removeClass('active');
        var activeTabsName = $(this).data('tabs');
        $('[data-tabs-name="' + activeTabsName + '"]').each(function () {
            $(this).addClass('active').siblings('.tab.active').removeClass('active');
        });
        // window.location.hash = '#' + activeTabsName;
        $(window).resize();
    });
    if (window.location.hash && $('a[href="' + window.location.hash + '"]').length) {
        $('a[href="' + window.location.hash + '"]').click();
    }
}

function initTippy() {
    tippy('.tooltip-btn', {
        content: 'Global content',
        arrow: false,
        allowHTML: true,
        trigger: 'mouseenter',
        theme: 'custom',
        placement: 'bottom-start',
        interactive: true,
        hideOnClick: true,
    });

    var window_width = $(window).width();

    $(window).on('resize load', function () {

        window_width = $(window).width();

        if (window_width < 1024) {
            $('.tooltip-btn').on('click', function () {
                $('body').addClass('tooltip-bg');
            });
            $(document).on('click', function (e) {
                if ($(e.target).closest('.tooltip-btn').length)
                    return;
                $('body.tooltip-bg').removeClass('tooltip-bg');
            });
        }

    });
}

// initialize swiper slider mobile only
function initOrderSliderMobile() {
	const breakpoint = window.matchMedia('(min-width: 768px)');
	let mySwiper;
	function breakpointChecker() {

		if (breakpoint.matches) {

			if (mySwiper !== undefined) mySwiper.destroy(true, true);

			return;

		} else {
			return enableSwiper();

		}

	};
	function enableSwiper() {
		$(".orders-container").each(function () {
			const self = this;
			mySwiper = new Swiper(this, {
				slidesPerView: 'auto',
				loop: false,
                spaceBetween: 10,
				mousewheel: false,
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
                pagination: {
                    el: $(self).closest('.swiper').find(".swiper-pagination").get(0),
                    clickable: true,
                },
				breakpoints: {
					768: {
						slidesPerView: 'auto',
					}
				}
			});
		});
	};
	breakpoint.addListener(breakpointChecker);

	breakpointChecker();
}

function initProductSlider(){
    $(".product-items").each(function () {
        const self = this;
        var swiper = new Swiper(this, {
            slidesPerView: 'auto',
            loop: false,
            spaceBetween: 50,
            autoHeight: true,
            mousewheel: false,
            navigation: {
                nextEl: $(self).closest('.module-section').find(".swiper-button-next").get(0),
                prevEl: $(self).closest('.module-section').find(".swiper-button-prev").get(0),
            },
            breakpoints: {
                1200: {
                    slidesPerView: 4,
                },
                1280: {
                    spaceBetween: 15,
                    slidesPerView: 4,
                }
            }
        });
    });
}

// Toggle tags
function initExpandedList() {
    $('.categories-holder-btn').on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass('active');
        $(this).closest('.categories-holder').toggleClass('open');
        $(this).closest('.categories-holder').find('.categories-holder-expanded').slideToggle();
    });
}

// News slider
function initNewsSlider(){
    $(".news-slider").each(function () {
        const self = this;
        var swiper = new Swiper(this, {
            slidesPerView: 'auto',
            loop: false,
            spaceBetween: 15,
            autoHeight: true,
            mousewheel: false,
            navigation: {
                nextEl: $(self).closest('.module-section').find(".swiper-button-next").get(0),
                prevEl: $(self).closest('.module-section').find(".swiper-button-prev").get(0),
            },
            breakpoints: {
                768: {
                    slidesPerView: 'auto',
                    spaceBetween: 30,
                },
                1200: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                },
            }
        });
    });
}

// slider category home page
function initBannerSlider(){
    $(".banner-slider").each(function () {
        const self = this;
        var swiper = new Swiper(this, {
            slidesPerView: 1,
            loop: false,
            spaceBetween: 10,
            effect: "fade",
            autoHeight: true,
            mousewheel: false,
            autoplay: {
              delay: 2000,
            },
            pagination: {
                el: $(self).closest('.banner-slider').find(".swiper-pagination").get(0),
                clickable: true,
            },
        });
    });
}

// header offset top
function initHeaderOffset() {
    init();
    $(window).on('resize', function () {
        init();
    });
    function init() {
        var offsetClass = $(".wrapper"),
            header = $(".header"),
            headerHeight = header.outerHeight();
        offsetClass.css("padding-top", headerHeight);
    }
}

// tippy tooltip
function initTippyTooltip() {
    tippy('.tippy-btn', {
        content: 'Global content',
        allowHTML: true,
        arrow: false,
        theme: 'tippy-btn',
        placement: 'bottom'
    });
}

// Search form
function initSearchFormDrop() {
    $('.search-btn').on('click', function () {
        $('body').toggleClass('search-form-open');
        $('body').removeClass('nav-open');
    });

    $(".search-form-back").on("click", function (event) {
        $('body').removeClass('search-form-open');
    });

    $(".search-form-cancel").on("click", function (event) {
        $(".search-form input").val("");
    });

    $('.search-form input').on('focus keyup', function () {
        if ($(this).val().length <= 2) {
            $(this).closest('.search-form').trigger('showHistory');
        } else {
            $(this).closest('.search-form').trigger('showResults');
        }
    });

    $('.search-form input').on('blur', function () {
        $(this).closest('.search-form').trigger('hideResults');
    });

    $('.search-form').on('showHistory', function () {
        $(this).removeClass('search-form--show-results');
    });

    $('.search-form').on('showResults', function () {
        $(this).addClass('search-form--show-results');
    });

    $('.search-form').on('hideResults', function () {
        $(this).removeClass('search-form--show-results');
    });
}

// header menu
function initHeaderMenu() {

    ///
    $('.nav-menu-item .title').on('click', function () {
        if ($(this).siblings('.menu-dropdown').length) {
            $(this)
                .closest('.nav-menu-item')
                .addClass('drop-open')
                .siblings('.nav-menu-item')
                .removeClass('drop-open')
                .addClass('hidden');

            $(this)
                .closest('.nav-menu')
                .addClass('drop-open')
                .siblings('.menu-dropdown')
        }
    });

    $('.menu-dropdown-title').on('click', function (e) {
        e.preventDefault();
        $(this).closest('.nav-menu-item').removeClass('drop-open');
        $('.nav-menu .hidden').removeClass('hidden');
        $('.menu-dropdown-title').removeClass('drop-open');
    });

    $('.nav-menu-item.has-drop .title').on('click', function () {
        $('body').addClass('sub-menu-open');
    });
    $('.menu-dropdown-title').on('click', function () {
        $('body').removeClass('sub-menu-open');
    });
    ///

    $('.nav-menu-item.has-drop').on('mouseenter', function () {
        $('body').toggleClass('overlay-menu');
    });

    $('.nav-menu-item.has-drop').on('mouseleave', function () {
        $('body').removeClass('overlay-menu');
    });

    $('.burger').on('click', function (e) {
        e.preventDefault();
        $('body').toggleClass('nav-open');
    });
}

//Drop hover header menu
function initDropHover() {
    $('.nav-menu-item').each(function () {
        if ($(this).find('.menu-dropdown').length) {
            $(this).addClass('has-drop');
        }
    });
};

// Youtube video player
(function () {
    var s = document.createElement('script');
    s.src = 'https://www.youtube.com/player_api';
    var before = document.getElementsByTagName('script')[0];
    before.parentNode.insertBefore(s, before);
})();

function getFrameID(id) {
    var elem = document.getElementById(id);
    if (elem) {
        if (/^iframe$/i.test(elem.tagName)) return id;
        var elems = elem.getElementsByTagName('iframe');
        if (!elems.length) return null;
        for (var i = 0; i < elems.length; i++) {
            if (/^https?:\/\/(?:www\.)?youtube(?:-nocookie)?\.com(\/|$)/i.test(elems[i].src)) break;
        }
        elem = elems[i];
        if (elem.id) return elem.id;
        do {
            id += '-frame';
        } while (document.getElementById(id));
        elem.id = id;
        return id;
    }
    return null;
}

var YT_ready = (function () {
    var onReady_funcs = [],
        api_isReady = false;
    return function (func, b_before) {
        if (func === true) {
            api_isReady = true;
            for (var i = 0; i < onReady_funcs.length; i++) {
                onReady_funcs.shift()();
            }
        } else if (typeof func == 'function') {
            if (api_isReady) func();
            else onReady_funcs[b_before ? 'unshift' : 'push'](func);
        }
    };
})();

function onYouTubePlayerAPIReady() {
    YT_ready(true);
}

var players = {};
YT_ready(function () {
    jQuery('.thumb + iframe[id]').each(function () {
        var identifier = this.id;
        var frameID = getFrameID(identifier);
        if (frameID) {
            players[frameID] = new YT.Player(frameID, {
                playerVars: {
                    autoplay: 0,
                    controls: 2,
                    modestbranding: 1,
                    rel: 0,
                    color: 'white',
                    showInfo: 0,
                },
                events: {
                    onReady: createYTEvent(frameID, identifier),
                    onStateChange: updateYTEvent(frameID, identifier),
                },
            });
        }
    });
});

// Youtube video player

function createYTEvent(frameID, identifier) {
    return function (event) {
        var player = players[frameID];
        var the_div = jQuery('#' + identifier).parent();
        the_div.children('.thumb').click(function () {
            var $this = jQuery(this);
            $this
                .fadeOut()
                .parent()
                .addClass('playing');
            if ($this.parent().hasClass('playing')) {
                player.playVideo();
            }
        });
    };
}

function updateYTEvent(frameID, identifier) {
    return function (event) {
        var player = players[frameID];
        var the_div = jQuery('#' + identifier).parent();
        var play_state = player.getPlayerState();
        if (play_state === 1) {
            the_div.addClass('playing');
            the_div.children('.thumb').fadeOut();
        }
        if (play_state === 0) {
            the_div.removeClass('playing');
            the_div.children('.thumb').fadeIn();
        }
        if (play_state === 2) {
            the_div.removeClass('playing');
            the_div.children('.thumb').fadeIn();
            the_div.children('.thumb').click(function () {
                var $this = jQuery(this);
                $this
                    .fadeOut()
                    .parent()
                    .addClass('playing');
                if ($this.parent().hasClass('playing')) {
                    player.playVideo();
                }
            });
        }
    };
}
