$(function(){
	var page_number = 1
	var url = ''
	$("#next").on("click", function () {
		page_number +=1
//		console.log(page_number);
		console.log(url);
	});
	
	$("#prev").on("click", function () {
		if (page_number==1){
			return;
		}else{
			page_number -=1
//			console.log(page_number);
			console.log(url);
		}
		
	}); 
	 
	url = 'http://api.themoviedb.org/3/movie/now_playing?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&page=2';
	
	$.getJSON(url, function(data){
		myData = data.results;
		var html = "";
	
		$.each(myData, function(index, value){
			console.log(value.title);
			poster_path = value.poster_path;
			poster_title = value.title;
			if (poster_path==null){
				return;
			}
			else {
			html += '<div class="single_poster"><img src="http://image.tmdb.org/t/p/w154' + poster_path  + '"  title="' + poster_title +'"/></div>';
			$('#movie_posters').html(html);
			
			}
			
		});


		//    showResults(myData);
	});
});

//function showResults(results){
//  var html = "";
//    $.each(results, function(index,value){
//      html += '<p>' + value.Title + '</p>';
//      console.log(value.Title);
//    });
//    $('#titles').html(html);
//}


