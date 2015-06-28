var move=[[6, 0, 1, 2, 3, 4, 8, 5, 10, 7, 12, 9, 14, 11, 15, 16, 17, 18, 19, 13, 22, 23, 24, 24, 26, 27, 28, 14, 19],
		  [20, 0, 1, 2, 3, 21, 8, 5, 10, 7, 12, 9, 14, 11, 15, 16, 17, 18, 19, 13, 22, 23, 24, 24, 25, 27, 28, 14, 19]]

var locat = 19;

var remember_locat = locat;

tmp = 0;

var moving = function(){			
	$('#box'+remember_locat).css({'background-image':'url("")'});			
	$('#box'+locat).css({'background-image':'url("images/베론쥬 시저.png")', 'background-size': '100%'});	
	remember_locat = locat;
	locat = move[0][locat];
	console.log(locat);	
}

