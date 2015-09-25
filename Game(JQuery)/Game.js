
$('body').append('<div id="game_board"></div>');
$('#game_board').append('<div class = "game_menu"><div id="player0_board"></div><div id = "stick_board"></div></div>');
$('#player0_board').append('<div id="player0_name" class = "player_name">1번 플레이어</div>');
for(var i = 0 ; i < 4 ; i ++){
	$('#player0_board').append('<div id ="goalinBox0_'+i+'" class = "goalinBox"></div>');
	$('#goalinBox0_'+i).css({'background-image':'url("images/player off_'+i+'.png")', 'background-size': '100%', 'background-repeat':'no-repeat'});
}

$('#game_board').append('<div id="game_board_out"></div>'); /*var test = $('#game_board_out').html();*/
$('#game_board_out').append('<div id="eventDiv"></div>');

$('#game_board').append('<div class = "game_menu"><div id="player1_board"></div><div id = "log_window"></div>');
$('#player1_board').append('<div id="player1_name" class = "player_name">2번 플레이어</div>');
for(var i = 0 ; i < 4 ; i ++){
	$('#player1_board').append('<div id ="goalinBox1_'+i+'" class = "goalinBox"></div>');
	$('#goalinBox1_'+i).css({'background-image':'url("images/player off_'+i+'.png")', 'background-size': '100%', 'background-repeat':'no-repeat'});
}

$('#eventDiv').addClass('draw_yout');
$('#eventDiv').css({'background-image':'url("images/game_name.png")'});

$('#eventDiv').append('<input type="image" src="images/game_start.png" id="game_start_btn" class="menu_btn" ></div>');

var player_turn = -1;

popup_menu = function(turn){		

	$('#game_board_out').append('<div id="eventDiv"></div>');
	$('#eventDiv').slideUp(300, function(){		
		$('#eventDiv').html("").addClass('draw_yout').css({'background-image':'url("")', 'background-color': 'rgba( 255, 255, 255, 0.5 )', 'background-image':'url("images/player'+turn+'_turn.png")'});
	}).delay(800).slideDown(500, function(){		
		$('#eventDiv').append('<input type="image" src="images/draw_yout.png" id="draw_btn"></div>');
		$('#player'+(turn+1)%2+'_board').css({'background-image':'url("images/player_board_off.png")'});		
		$('#player'+turn+'_board').css({'background-image':'url("images/player_board_on.png")'});		
		log_output((turn + 1)+"번 플레이어의 턴", (turn + 1));

		$('#draw_btn').on('click', function(event){
			$('#eventDiv').css({'background-image':'url("")'}).html("").addClass('draw_yout').css({'background-image':'url("images/draw.gif")'});
			setTimeout(draw_yout,2500);
		});	
	});	
	return;
}

$('#game_start_btn').on('click', function(event){
	log_output("게임을 시작합니다.", 0);
	popup_menu(0);
});

game_over = function(turn){
	$('#eventDiv').slideUp(300, function(){		
		$('#eventDiv').html("").addClass('draw_yout').css({'background-image':'url("")', 'background-color': 'rgba( 255, 255, 255, 0.5 )'});
	}).delay(800).slideDown(500, function(){});		
}