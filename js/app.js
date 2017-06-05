var doc = $(document);
var map;
var faded = [];
$(document).ready(function(){


	// main-hover-elems

	$('.way-blocks-wrapper .item').mouseenter(function(){
		$(this).width('45%');
	}).mouseleave(function(){
		$(this).width('33.33%');
	})

	$('header .menu a').click(function(){
		$(this).find('P').text(function(i, text){
			return text === 'Меню' ? 'Закрыть' : 'Меню';
		})
		$(this).toggleClass('active');
		$('.menu-modal.modal-window').toggleClass('open');

		if ($('.menu-modal').hasClass('open')){
			$('header .logo').css('opacity', 0);
		} else {
			$('header .logo').css('opacity', 1);
		}
	});


	// Vacancy custom tabs 

	doc.on('click', '.vacancy-items:visible .item', function(e){
		e.preventDefault();
		// var content = $(this).parents('.tab-pane')
		var id = $(this).parent().index();
		var active_id = $('.vacancy-items .item.active').parent().index();
		if (!$(this).hasClass('active')){
			$('.vacancy-items:visible .item').addClass('open').removeClass('active');
			$(this).addClass('active');
		}

		$('.vacancy-city-content:visible .section').eq(active_id).fadeOut('300', function(){
			$('.vacancy-city-content:visible .section').eq(id).fadeIn('300');

			if ($(window).width() < 1025){
				setTimeout(function(){
					var to = $('.vacancy-city-content .section').eq(id).offset().top - 35;
					$('html, body').animate({scrollTop: to}, 550, 'swing');	
				}, 250)
			}

			
		})

	});


	var mainNews = $('.news-container.owl-carousel');
	mainNews.owlCarousel({
		loop: true,
		margin: 30,
		items: 1
	});

	$('.news-header .arrow-container .prev').click(function(e) {
		e.preventDefault();
	    mainNews.trigger('prev.owl.carousel');
	})

	$('.news-header .arrow-container .next').click(function(e) {
		e.preventDefault();
	    mainNews.trigger('next.owl.carousel');
	})

	var mainMoments = $('.moments-container');
	mainMoments.owlCarousel({
		loop: true,
		margin: 30,
		items: 1
	});

	$('.moments-header .arrow-container .prev').click(function(e) {
		e.preventDefault();
	    mainMoments.trigger('prev.owl.carousel');
	})

	$('.moments-header .arrow-container .next').click(function(e) {
		e.preventDefault();
	    mainMoments.trigger('next.owl.carousel');
	})

	var photos = $('.photo-container');
	photos.owlCarousel({
		loop: true,
		margin: 30,
		items: 1
	});

	$('.photo-header .arrow-container .prev').click(function(e) {
		e.preventDefault();
	    photos.trigger('prev.owl.carousel');
	})

	$('.photo-header .arrow-container .next').click(function(e) {
		e.preventDefault();
	    photos.trigger('next.owl.carousel');
	})

	$('.vacancy-email .select2').select2({
		placeholder: 'Все вакансии',
		dropdownParent: $('.vacancy-email:visible')
	})

	if ($('#map').length){
		initMap();
	}

	//about 

	if ($('.about-container').length){
		var about = $('.about-slider');
		about.owlCarousel({
			margin: 0,
			items: 1,
			dots: true,
			rewindNav: false,
			dotsContainer: '.about-dots-container'
		});

		$('.about-ui .prev').click(function(e) {
			e.preventDefault();
		    about.trigger('prev.owl.carousel');
		});

		$('.about-ui .next').click(function(e) {
			e.preventDefault();
		    about.trigger('next.owl.carousel');
		});

		fill();

	 	var allowTransitionLeft = false;
	    var allowTransitionRight = true;
	    about.on('mousewheel', '.owl-stage', function (e) {
	        e.preventDefault();
	        if (e.deltaY < 0) {
	            if( allowTransitionRight ) {
	                allowTransitionRight = false;
	                about.trigger('next.owl');
	            };
	        } else {
	            if (allowTransitionLeft) {
	                allowTransitionLeft = false;
	                about.trigger('prev.owl');
	            };
	        }
	    }).on('translated.owl.carousel', function (e) {
	        allowTransitionRight = (e.item.count > e.item.index );
	        allowTransitionLeft = (e.item.index > 0);
	        if (e.item.index == 3){
        		// for 
        		if($('.hidder:visible').length){
        			forus();
        		}
	        }
	    });
	}

});


function fill(){
	var w = 129;
	var h = 129;
	for ( var i = 0; i < 8; i++){
		for (var j = 0; j < 15; j++){
			$('.forus').append('<div class="hidder" style="top: '+i*h+'px; left: '+j*w+'px;"></div>');
		}
	}
}

function forus(){
	var i = 0;
	var interval = setInterval(function(){
		if(i == 120){
			clearInterval(interval);
			$('.forus .forus-title').addClass('in');
		}
		fade();
		i++;	
	}, 5);
}

function fade(){
	var random = randomInteger(0, 120);
	if (faded.indexOf(random) < 0){
		$('.hidder').eq(random).fadeOut(250);
		faded.push(random);
	} else {
		fade();
	}
}

function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}

function initMap() {
	var center = {lat:52.279335, lng: 104.30725200000006};
    map = new google.maps.Map(document.getElementById('map'), {
      	zoom: 18,
	    center: center,
	    disableDefaultUI: true,
	    scrollwheel: false,
    });
    var marker = new google.maps.Marker({
          position: center,
          map: map,
          title: 'Hello World!'
        });
  }
