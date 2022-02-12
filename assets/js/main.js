
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 16
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });

      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

})()


function asd() {
	"use strict";
	var i=1;

	if(i==1){
	function count($this){
	var current = parseInt($this.html(), 10);
	current = current + 10; /* Where 50 is increment */	
	$this.html(++current);
		if(current > $this.data('count')){
			$this.html($this.data('count'));
		} else {    
			setTimeout(function(){count($this)}, 50);
		}
	}        	
	$(".stat-count").each(function() {
	  $(this).data('count', parseInt($(this).html(), 10));
	  $(this).html('0');
	  count($(this));
	});}
  };

$(document).ready(function(){
	var tester = document.getElementById('counter');
	
	var p;
	var n = 0;

	window.onscroll = function() {
		p = checkVisible(tester);

		if(p == true && n == 0){

			asd();
			n = 1;
		}
	};
});

function checkVisible(elm) {
  var rect = elm.getBoundingClientRect();
  var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
  return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
};

(function () {
  "use strict";

  // define variables
  var items = document.querySelectorAll(".timeline li");

  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function callbackFunc() {
    for (var i = 0; i < items.length; i++) {
      if (isElementInViewport(items[i])) {
        items[i].classList.add("in-view");
      }
    }
  }

  // listen for events
  window.addEventListener("load", callbackFunc);
  window.addEventListener("resize", callbackFunc);
  window.addEventListener("scroll", callbackFunc);
})();


var flkty = new Flickity( '#brandCarousel', {
  contain: true,
  pageDots: false,
  wrapAround: true,
  freeScroll: true,
  autoPlay: 1600
});


// for animation 

$(document).ready(function(){
  $('.pp-quote').click(function(){
    $('.pp-quote').removeClass("active");
    $(this).addClass("active");
});
});

$(document).ready(function(){
    
       // hide-top

        $('.li-quote-1').click(function(e){ 
            e.stopPropagation();
            $(".show").addClass('hide-top');
            $(".hide-top").removeClass('show');
            $('.quote-text-1').addClass('show');
            $('.quote-text-1').removeClass('hide-bottom');             
        });

        $('.li-quote-2').click(function(e){ 
            e.stopPropagation();
            $(".show").addClass('hide-top');
            $(".hide-top").removeClass('show');
            $('.quote-text-2').addClass('show');             
            $('.quote-text-2').removeClass('hide-bottom');
        });

        $('.li-quote-3').click(function(e){ 
            e.stopPropagation();
            $(".show").addClass('hide-top');
            $(".hide-top").removeClass('show');         
            $('.quote-text-3').addClass('show');             
            $('.quote-text-3').removeClass('hide-bottom');
        });
        $('.li-quote-4').click(function(e){ 
            e.stopPropagation();
            $(".show").addClass('hide-top');
            $(".hide-top").removeClass('show');      
            $('.quote-text-4').addClass('show');             
            $('.quote-text-4').removeClass('hide-bottom');
        });
        $('.li-quote-5').click(function(e){ 
            e.stopPropagation();
            $(".show").addClass('hide-top');
            $(".hide-top").removeClass('show');      
            $('.quote-text-5').addClass('show');             
            $('.quote-text-5').removeClass('hide-bottom');
        });
        $('.li-quote-6').click(function(e){ 
            e.stopPropagation();
            $(".show").addClass('hide-top');
            $(".hide-top").removeClass('show');      
            $('.quote-text-6').addClass('show');             
            $('.quote-text-6').removeClass('hide-bottom');
        });
        $('.li-quote-7').click(function(e){ 
            e.stopPropagation();
            $(".show").addClass('hide-top');
            $(".hide-top").removeClass('show');      
            $('.quote-text-7').addClass('show');             
            $('.quote-text-7').removeClass('hide-bottom');
        });
        $('.li-quote-8').click(function(e){ 
            e.stopPropagation();
            $(".show").addClass('hide-top');
            $(".hide-top").removeClass('show');      
            $('.quote-text-8').addClass('show');             
            $('.quote-text-8').removeClass('hide-bottom');
        });
           
    
});


$(document).ready(function(){
    
       // hide-top

        $('.li-quote-1').click(function(e){ 
            e.stopPropagation();
            $(".look").addClass('hide-dp-top');
            $(".hide-dp-top").removeClass('look');
            $('.dp-name-1').addClass('look');
            $('.dp-name-1').removeClass('hide-dp-bottom');             
        });

        $('.li-quote-2').click(function(e){ 
            e.stopPropagation();
            $(".look").addClass('hide-dp-top');
            $(".hide-dp-top").removeClass('look');
            $('.dp-name-2').addClass('look');
            $('.dp-name-2').removeClass('hide-dp-bottom');             
        });

        $('.li-quote-3').click(function(e){ 
            e.stopPropagation();
            $(".look").addClass('hide-dp-top');
            $(".hide-dp-top").removeClass('look');
            $('.dp-name-3').addClass('look');
            $('.dp-name-3').removeClass('hide-dp-bottom');             
        });
		$('.li-quote-4').click(function(e){ 
            e.stopPropagation();
            $(".look").addClass('hide-dp-top');
            $(".hide-dp-top").removeClass('look');
            $('.dp-name-4').addClass('look');
            $('.dp-name-4').removeClass('hide-dp-bottom');             
        });
		
        $('.li-quote-5').click(function(e){ 
            e.stopPropagation();
            $(".look").addClass('hide-dp-top');
            $(".hide-dp-top").removeClass('look');
            $('.dp-name-5').addClass('look');
            $('.dp-name-5').removeClass('hide-dp-bottom');             
        });
		
        $('.li-quote-6').click(function(e){ 
            e.stopPropagation();
            $(".look").addClass('hide-dp-top');
            $(".hide-dp-top").removeClass('look');
            $('.dp-name-6').addClass('look');
            $('.dp-name-6').removeClass('hide-dp-bottom');             
        });
        $('.li-quote-7').click(function(e){ 
            e.stopPropagation();
            $(".look").addClass('hide-dp-top');
            $(".hide-dp-top").removeClass('look');
            $('.dp-name-7').addClass('look');
            $('.dp-name-7').removeClass('hide-dp-bottom');             
        });
        $('.li-quote-8').click(function(e){ 
            e.stopPropagation();
            $(".look").addClass('hide-dp-top');
            $(".hide-dp-top").removeClass('look');
            $('.dp-name-8').addClass('look');
            $('.dp-name-8').removeClass('hide-dp-bottom');             
        });
           
    
});
$(function () {
  "use strict";
  $(".pCard_add").click(function () {
    $(".pCard_card").toggleClass("pCard_on");
    $(".pCard_add i").toggleClass("fa-minus");
  });
  $(".pCard_add1").click(function () {
    $(".pCard_card1").toggleClass("pCard_on1");
    $(".pCard_add1 i").toggleClass("fa-minus");
  });
  $(".pCard_add2").click(function () {
    $(".pCard_card2").toggleClass("pCard_on2");
    $(".pCard_add2 i").toggleClass("fa-minus");
  });
});

