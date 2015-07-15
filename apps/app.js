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
	$.each(results, function(index,value){
	  console.log(value.title);
	  poster_path = value.poster_path;
	  poster_title = value.title;
	  if (poster_path == null){
		return;
	  } else {
		html += '<div class="poster"><img src="http://image.tmdb.org/t/p/w154' + poster_path  + '"  title="' + poster_title +'"/></div>';
		$('#posters').html(html);
	  }
	});
  }



});



