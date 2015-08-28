var make_board = function(){
	var $board = $('#game_board_out');
	
	for(var i = 0; i<20; i++){
		$board.append('<div id="box'+i+'" class = "board_outline"></div>');
		if(i > 6 && i < 15){			
			if(i%2 === 1){ $('#box'+i).css({'position':'relative', 'left':'400px', 'float':'left'}); }
			else{$('#box'+i).css({'clear':'both'})}
		}
	}

	var $inboard = $('#game_board_in');

	for(i=20; i<29; i++){
		$inboard.append('<div id="box'+i+'" class = "board_inline"></div>');
	}
	
	$('#box20').css({'left':'0px', 'float':'left'});
	$('#box21').css({'left':'240px', 'float':'left'});
	$('#box22').css({'left':'80px', 'clear':'both'});
	$('#box23').css({'left':'160px', 'float':'left'});
	$('#box24').css({'left':'160px', 'clear':'both'});
	$('#box25').css({'left':'80px', 'clear':'both'});
	$('#box26').css({'left':'160px', 'float':'left'});
	$('#box27').css({'left':'0px', 'clear':'both'});
	$('#box28').css({'left':'240px', 'float':'left'});

}
make_board();