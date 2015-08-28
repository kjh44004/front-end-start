$('#stick_board').append('<button id="draw_btn">굴리기</button>');

var player_turn = -1;
var non_click = false;


$('#draw_btn').on('click', function(event){	
	if(non_click === false){
		non_click = true;
		$('#eventDiv').addClass('draw_yout');
		$('#eventDiv').css({'background-image':'url("images/draw.gif")'});

		setTimeout(draw_yout,2500);
	}
});

var oneMoreTime = 0;

/*윷을 던진 후 이벤트*/
draw_yout = function(){

	var draw_num = 0;							 /*윷을 던진 결과 변수*/
	player_turn = player_turn + 1 - oneMoreTime; /*플레이어차례를 가리는 변수*/
	oneMoreTime = 0;							 /*한번더 던지는 여부를 가리는 변수*/

	/*이벤트 박스 초기화*/
	$('#eventDiv').css({'background-image':'url("")'});

	/*윷 결과 출력*/
	for(var i = 0; i<4; i++) $('#eventDiv').append('<div id="stick' + i + '" class="stick"></div>'); 

	/*말 선택버튼 출력*/
	$('#eventDiv').append('<div id="pieceBtnBox" class="stick"></div>'); 	
	for(var i = 1; i<=4; i++) if((goalin[player_turn % 2][i-1] === false) && together[player_turn % 2][i-1] === false) $('#pieceBtnBox').append('<button id="piece' + i + '">' + i + '번말</button>');	
	
	/*윷 굴리기 랜덤*/
	for(var i = 0; i < 4; i++){
		var tmp = random_make(); //0 아니면 1

		if(tmp === 1) $('#stick'+i).css({'background-image':'url("images/그림2.png")'});
		else		  $('#stick'+i).css({'background-image':'url("images/그림1.png")'});

		draw_num = draw_num + tmp;
	}

	switch(draw_num){
		case 0: console.log("Player" + player_turn % 2 + " : 모"); draw_num = 5;  break;
		case 1: console.log("Player" + player_turn % 2 + " : 도"); player_turn-1; break;
		case 2: console.log("Player" + player_turn % 2 + " : 개"); break;
		case 3: console.log("Player" + player_turn % 2 + " : 걸"); break;
		case 4: console.log("Player" + player_turn % 2 + " : 윷"); break;
	}
	
	non_click = false; //버튼을 계속 누르지 못하게 하기위한 스위치

	
	/*말 선택 버튼 이벤트*/
	$('#pieceBtnBox button').on('click', function(event){
		
		var pieceNum; //움직일 말을 선택하기위한 변수

		for(var i = 1; i <= 4; i++){			
			if($(event.currentTarget).html() === $('#piece'+i).html()) pieceNum = i-1; //누른 버튼에 맞춰서 변수에 값을 넣어줌
		}

		/*게임판위에 말이 없을때 출발지점에 생성하는 이벤트*/
		if(playerPiece[player_turn % 2][pieceNum] === false){
			playerPiece[player_turn % 2][pieceNum] = true;			
			$('#game_board_out').append('<div id = "player'+player_turn % 2+'_'+pieceNum+'" class="player"></div>');			
			$('#player'+ player_turn%2 + '_'+pieceNum+'').css({'background-image':'url("images/player'+ player_turn%2 + '_'+pieceNum+'.png")'});
			$('#player'+ player_turn%2 + '_'+pieceNum+'').css({'background-position': (7+pieceNum*3)+'px 10px' });
		}

		$('#eventDiv').html("");
		$('#eventDiv').removeClass('draw_yout');

		moving_event(player_turn % 2, pieceNum, draw_num);

		if(draw_num === 4 || draw_num === 5) oneMoreTime = 1;
	});	
}
