$(function(){
	var page_number = 1

	getRequest(page_number);

	$("#next").on("click", function () {
		page_number +=1
		getRequest(page_number);
		$("#pageCounter").text(page_number);
	});

	$("#prev").on("click", function () {
		if (page_number==1){
			return;
		}else {
			page_number -=1;
			getRequest(page_number);
			$("#pageCounter").text(page_number);
		}
	});

	$("#first").on("click", function () {
		page_number = 1
		getRequest(page_number);
		$("#pageCounter").text(page_number);
	});

	$("#last").on("click", function () {
		page_number = 27
		getRequest(page_number);
		$("#pageCounter").text(page_number);
	});

	function getRequest(page_number) {

		var params = {
			api_key: 'ebea8cfca72fdff8d2624ad7bbf78e4c',
			page: page_number
		};
		var url = 'http://api.themoviedb.org/3/movie/now_playing';
		$.getJSON(url, params).done(function(data) {
			showResults(data.results);
		});
	}

	function showResults(results) {
		var html = '';
		$.each(results, function(index,value) {
			console.log(value.title);
			var poster_path = value.poster_path;
			var poster_title = value.title;
			var id = value.id;
			if (poster_path == null) {
				return;
			} else {
				html += '<div class="poster" data-id="' + id + '"><img src="http://image.tmdb.org/t/p/w154' + poster_path  + '"  title="' + poster_title + '"/></div>';
				$('#posters').html(html);

			}
		});
		$(".poster").on("click", function () {
			console.log($(this).data('id'));
			var movie_id = $(this).data('id')
			console.log(movie_id)
			movieDetails(movie_id);
		});
	}

	function movieDetails(id) {

		var params = {
			api_key: 'ebea8cfca72fdff8d2624ad7bbf78e4c',
			external_source: "imdb_id"
		};
		var url = 'http://api.themoviedb.org/3/movie/' + id ;
		$.getJSON(url, params).done(function(data) {
			showModal(data.backdrop_path,data.poster_path,data.original_title,data.vote_average,data.release_date,data.overview );
		});
	}

	function showModal(backdrop_path,poster_path,original_title,vote_average,release_date,overview) {
		$('#myModal').modal('show'); 

		var html = '<div><img src="http://image.tmdb.org/t/p/w342/' + poster_path + '" /></div><div class="Modal-text"><div class="top-line"><span>' + original_title + '</span><span> Score: ' + vote_average + '</span><span> Release date: ' + release_date + '</span></div><br><p>' + overview + '</p></div>';
		$('.modal-body').html(html);

		var css  = 'linear-gradient(rgba(0, 0, 0, 0.65),rgba(0, 0, 0, 0.65)), url(http://image.tmdb.org/t/p/original/' + backdrop_path + ')';

		$('.modal-content').css('background-image',css);	
	}
});