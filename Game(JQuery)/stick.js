
var oneMoreTime = 0;

/*윷을 던진 후 이벤트*/
draw_yout = function(){

	$('#eventDiv').css({'background-image':'url("")'}).html("");

	var draw_num = 0;							 /*윷을 던진 결과 변수*/
	player_turn = (player_turn + 1 - oneMoreTime) % 2; /*플레이어차례를 가리는 변수*/
	oneMoreTime = 0;							 /*한번더 던지는 여부를 가리는 변수*/

	/*이벤트 박스 초기화*/
	$('#eventDiv').css({'background-image':'url("")'});

	/*윷 결과 출력*/
	for(var i = 0; i<4; i++) $('#eventDiv').append('<div id="stick' + i + '" class="stick"></div>'); 

	/*말 선택버튼 출력*/
	$('#eventDiv').append('<div id="pieceBtnBox" class="stick"></div>'); 	
	for(var i = 1; i<=4; i++) if((goalin[player_turn][i-1] === false) && together_link[player_turn][i-1] === -1) $('#pieceBtnBox').append('<button id="piece' + i + '">' + i + '번말</button>');	
	
	/*윷 굴리기 랜덤*/
	for(var i = 0; i < 4; i++){
		var tmp = random_make(); //0 아니면 1

		if(tmp === 1) $('#stick'+i).css({'background-image':'url("images/그림2.png")'});
		else		  $('#stick'+i).css({'background-image':'url("images/그림1.png")'});

		draw_num = draw_num + tmp;		
	}	

	switch(draw_num){
		case 0: log_output((player_turn+1)+"번 플레이어가 <모>가 나왔습니다.", (player_turn+1)); oneMoreTime = 1; draw_num = 5;  break; 
		case 1: log_output((player_turn+1)+"번 플레이어가 <도>가 나왔습니다.", (player_turn+1)); break;
		case 2: log_output((player_turn+1)+"번 플레이어가 <개>가 나왔습니다.", (player_turn+1)); break;
		case 3: log_output((player_turn+1)+"번 플레이어가 <걸>이 나왔습니다.", (player_turn+1)); break;
		case 4: log_output((player_turn+1)+"번 플레이어가 <윷>이 나왔습니다.", (player_turn+1)); oneMoreTime = 1; break;
	}
	
	non_click = false; //버튼을 계속 누르지 못하게 하기위한 스위치

	
	/*말 선택 버튼 이벤트*/
	$('#pieceBtnBox button').on('click', function(event){
		
		var pieceNum; //움직일 말을 선택하기위한 변수

		for(var i = 1; i <= 4; i++){			
			if($(event.currentTarget).html() === $('#piece'+i).html()) pieceNum = i-1; //누른 버튼에 맞춰서 변수에 값을 넣어줌
		}
		
		log_output((player_turn+1)+"번 플레이어가 "+(pieceNum+1)+"번말을 웁직입니다.", (player_turn+1));

		$('#game_board_out').html('');

		for(var i=0; i<2; i++){
			for(var j=0; j<4; j++){
				if(playerPiece[i][j] != 0){
					$('#game_board_out').append('<div id = "player'+i+'_'+j+'" class="player"></div>');						
					$('#player'+ i + '_'+j+'').css({'background-image':'url("images/player'+ i + '_'+j+'.png")', 'background-size': '100%'});
					$('#player'+i+'_'+j).animate({top : move_y[playerPiece[i][j]], left : move_x[playerPiece[i][j]]}, 0)
				} 
			}
		}

		/*게임판위에 말이 없을때 출발지점에 생성하는 이벤트*/
		if(playerPiece[player_turn][pieceNum] == 0){			
			$('#game_board_out').append('<div id = "player'+player_turn+'_'+pieceNum+'" class="player"></div>');
			$('#player'+ player_turn + '_'+pieceNum+'').css({'background-image':'url("images/player'+ player_turn + '_'+pieceNum+'.png")', 'background-size': '100%'});
			$('#goalinBox'+player_turn+'_'+pieceNum).css({'background-image':'url("")'});
			/*insertQueue(player_turn, pieceNum);*/
			/*$('#player'+ player_turn + '_'+pieceNum+'').css({'background-position': (7+pieceNum*3)+'px 10px' });*/
		}

		$('#eventDiv').html("");
		$('#eventDiv').removeClass('draw_yout');

		moving_trigger(player_turn, pieceNum, draw_num);		
	});	
}
