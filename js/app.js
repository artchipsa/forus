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

	$('.point').on('touchstart', function(){
		var id = $(this).data('id');
		moveDude(id);
		$('.career-text p').fadeOut(300);
		setTimeout(function(){
			$('.career-text p').eq(id+1).fadeIn(300);
		}, 1000)
	});

	$('.point').click(function(){
		var id = $(this).data('id');
		moveDude(id);
		$('.career-text p').fadeOut(300);
		setTimeout(function(){
			$('.career-text p').eq(id+1).fadeIn(300);
		}, 1000)
	});

	$('.point').each(function(){
		var y = $(this)[0].getBBox().y + 40;
		var x = $(this)[0].getBBox().x - (290/2);
		$('#svgWrapper .svg-container').append('<div class="career-text" style="left:'+x+'px; top:'+y+'px;">'+
			'<a href="#">Консультант</a>'+
			'<p>- активный и целеустремленный специалист, владеющий навыками коммуникации, который занимается привлечением клиентов через «холодные звонки» и выстраивает с ними долгосрочные партнерские отношения</p>'+
			'</div>');
	});

	if ($('.svg-container').length){
		var svgPan = $('.svg-container');
		svgPan.width($('.svg-container svg').width());
		var move;
		var stop = $('.svg-container svg').width() - $(window).width();
		$(window).resize(function(){
			var stop = $('.svg-container svg').width() - $(window).width();
		})
		var move_start;
		if (svgPan.width() > $(window).width()){
			svgPan.hammer().bind('panstart', function(e){
				var matrix = svgPan.css('transform');
				matrix = matrix.split('(')[1];
				matrix = matrix.split(')')[0];
				matrix = matrix.split(',');
				matrix = matrix[4];
				move_start = parseInt(matrix, 10);
				move_start = Math.abs(move_start);
				console.log("move_start", move_start);
			})
			svgPan.hammer().bind("pan", function(ev){
				var move_count = ev.gesture.deltaX * (-1);
				move = move_start + move_count;
				if (move >= stop){
					svgPan.css({transform: 'translateX(-'+stop+'px)'});	
				} else {
					svgPan.css({transform: 'translateX(-'+move+'px)'});
				}
			});
		}

	}


	if($('.svg-walk-path').length){


		$('.svg-walk-path .svg-cont:visible .point').each(function(){
			if ($(window).width() > 1020){
				var id = $(this).index()/2 - 1;
			} else {
				var id = $(this).index() - 2;
			}
			if ($(window).width() > 1025){
				var y = $(this)[0].getBBox().y - ($('.text-block').eq(id).height());
				$('.text-block').eq(id).css({'top': y});
			} else if($(window).width() > 992) {
				var y = $(this)[0].getBBox().y - ($('.text-block').eq(id).height());
				if (id==2){
					$('.text-block').eq(id).css({'top': y-250});
				} else {
					$('.text-block').eq(id).css({'top': y});
				}
			} else {
				var y = $(this)[0].getBBox().y - ($('.text-block').eq(id).height()/2);
				$('.text-block').eq(id).css({'top': y});
			}
		});


		var lastScrollTop = 0;
		var deg = 0;
		$(window).scroll(function(event){
			var st = $(this).scrollTop();
			if (st > lastScrollTop){
				if (st > $('.svg-walk-path').offset().top - 750){
					scrollDude();
					$('.svg-cont:visible .point').each(function(){
						if ($(window).width() > 992){
							if (st > $(this).offset().top - ($(window).height() - 150)*1.25){
								var id = $(this).index()/2 - 1;
								$('.text-block').eq(id).addClass('in');
							}
						} else{
							if (st > $(this).offset().top - ($(window).height())/1.5){
								var id = $(this).index() - 2;
								$('.text-block').eq(id).addClass('in');
							}
						}
					});

					$('.turn').each(function(){
						if ($(dude_sc).offset().top >= $(this).offset().top - 200 && $(this).hasClass('inOrder')){
							deg += 180;
							$(this).removeClass('inOrder');
							$('#dude image.img-start').attr('style', 'transform: rotate3d(0,1,0,'+deg+'deg);')
						}
					})
				}
			}
			lastScrollTop = st;
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


// svg line path code 
if ($('.svg-container').length){
	var counter = 0;
	var start = true;
	var svgContainer = document.getElementById('svgWrapper');
	var ns = "http://www.w3.org/2000/svg";
	var svg = svgContainer.getElementsByTagNameNS(ns, 'path');
	var dude = document.getElementById('dude');
	var myReq;
}

//svg scroll
if($('.svg-walk-path').length){
	if ($(window).width() > 1020){
		var counter_sc = 0;
		var start_sc = true;
		var svgContainer_sc = document.getElementById('svgScroll');
		var ns_sc = "http://www.w3.org/2000/svg";
		var svg_sc = svgContainer_sc.getElementsByTagNameNS(ns_sc, 'path');
		var dude_sc = document.getElementById('dude');
		var path = svg_sc[0].getTotalLength();
	} else {
		var counter_sc = 0;
		var start_sc = true;
		var svgContainer_sc = document.getElementById('mobileScroll');
		var ns_sc = "http://www.w3.org/2000/svg";
		var svg_sc = svgContainer_sc.getElementsByTagNameNS(ns_sc, 'path');
		var dude_sc = document.getElementById('dude_mobile');
		var path = svg_sc[0].getTotalLength();
	}
}

function moveDude(id){
	counter += 0.015;
	var straightLength = svg[id].getTotalLength();
	if (parseInt(counter,10) === 1) {
		start = false;
	} else if (parseInt(counter,10) < 0) {
		start = true;
	}

	if (start){
		dude.setAttribute("transform", "translate(" + 
		(svg[id].getPointAtLength(counter * straightLength).x - 50)  + "," +
		(svg[id].getPointAtLength(counter * straightLength).y - parseInt(dude.height.animVal.value)) + ")");
		myReq = requestAnimationFrame(function(){
			moveDude(id);
		});
	} else {
		cancelAnimationFrame(myReq);
		counter = 0;
		start = true;
	}
}

function scrollDude(){
	if ($(window).width() > 1020){
		counter_sc += 0.006;
	} else {
		counter_sc += 0.005;
	}
 	if (parseInt(counter_sc,10) === 1) {
		start_sc = false;
	} else if (parseInt(counter_sc,10) < 0) {
		start_sc = true;
	}

	if (start_sc){
		dude_sc.setAttribute("transform", "translate(" + 
		(svg_sc[0].getPointAtLength(counter_sc * path).x - 50)  + "," +
		(svg_sc[0].getPointAtLength(counter_sc * path).y - parseInt(dude_sc.attributes.height.value) -50) + ")");
	} else {
		$('.img-start').fadeOut(100, function(){
			$('.img-finish').fadeIn(100);
		});
	}
}