var address = 'http://m.movie.daum.net/data/movie/movie_info/box_office.json?country=KR&startDate=20150101&endDate=20150401&pageSize=10&pageNo=';
var wrap = document.getElementById('wrap');
var listTemplate = document.getElementById('listTemplate').innerHTML;

getJSON(address , function(boxOfficeList){  
	
	var html = tmpl(listTemplate, {list: boxOfficeList.data});

	wrap.innerHTML = html;

});