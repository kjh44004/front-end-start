$('body').append('<div id="game_board"></div>');
$('#game_board').append('<div class = "game_menu"><div id="player0_board"></div><div id = "stick_board"></div></div>');
$('#player0_board').html('1번 플레이어');
$('#game_board').append('<div id="game_board_out"></div>');
$('#game_board_out').append('<div id="game_board_in"></div>');
$('#game_board_out').append('<div id="eventDiv"></div>');
$('#game_board').append('<div class = "game_menu"><div id="player1_board"></div><div id = "log_window"></div></div>');
$('#player1_board').html('2번 플레이어');


$('#eventDiv').addClass('draw_yout');
$('#eventDiv').css({'background-image':'url("images/game_name.png")'});

$('#eventDiv').append('<input type="image" src="images/game_start.png" id="game_start_btn" class="menu_btn" ></div>');

var player_turn = -1;
var oneMoreTime = 0;

popup_menu = function(turn){	
	$('#eventDiv').slideUp(300, function(){		
		$('#eventDiv').html("");
		$('#eventDiv').addClass('draw_yout');
		$('#eventDiv').css({'background-image':'url("")'});
		$('#eventDiv').css({'background-color': 'rgba( 255, 255, 255, 0.5 )'});
		$('#eventDiv').css({'background-image':'url("images/player'+turn+'_turn.png")'});		

	}).delay(800).slideDown(500, function(){		
		$('#eventDiv').append('<input type="image" src="images/draw_yout.png" id="draw_btn"></div>');
		$('#player'+(turn+1)%2+'_board').css({'background-image':'url("images/player_board_off.png")'});		
		$('#player'+turn+'_board').css({'background-image':'url("images/player_board_on.png")'});		

		$('#draw_btn').on('click', function(event){
			$('#eventDiv').css({'background-image':'url("")'});
			$('#eventDiv').html("");

			$('#eventDiv').addClass('draw_yout');
			$('#eventDiv').css({'background-image':'url("images/draw.gif")'});
			setTimeout(draw_yout,2500);
		});
	
	});	
	return;
}

$('#game_start_btn').on('click', function(event){
	popup_menu(0);
});

