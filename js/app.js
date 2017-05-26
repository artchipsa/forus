var doc = $(document);
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
			// var to = $('.vacancy-city-content .section').eq(id).offset().top - 50;
			// $('html, body').animate({scrollTop: to}, 550, 'swing');
		})

	});


	var mainNews = $('.news-container');
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


	$('.vacancy-email .select2').select2({
		placeholder: 'Все вакансии',
		dropdownParent: $('.vacancy-email:visible')
	})


});