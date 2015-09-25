var move_num=[	[6, 0, 1, 2, 3, 4, 8, 5, 10, 7, 12, 9, 14, 11, 15, 16, 17, 18, 19, 13, 22, 23, 24, 24, 25, 27, 28, 14, 19],
				[20, 0, 1, 2, 3, 21, 8, 5, 10, 7, 12, 9, 14, 11, 15, 16, 17, 18, 19, 13, 22, 23, 24, 24, 26, 27, 28, 14, 19],
				[20, 0, 1, 2, 3, 21, 8, 5, 10, 7, 12, 9, 14, 11, 15, 16, 17, 18, 19, 13, 22, 23, 24, 24, 25, 27, 28, 14, 19]]

var move_x = [10, 110, 210, 310, 410, 510, 10, 510, 10, 510, 10, 510, 10, 510, 10, 110, 210, 310, 410, 510, 100, 420, 180, 340, 260, 180, 340, 100, 420]		  
var move_y = [10, 10, 10, 10, 10, 10, 110, 110, 210, 210, 310, 310, 410, 410, 510, 510, 510, 510, 510, 510, 100, 100, 180, 180, 260, 340, 340, 420, 420]

var locat = [[19, 19, 19, 19], [19, 19, 19, 19]]
var move_change = [[0, 0, 0, 0], [0, 0, 0, 0]]									//사용
var playerPiece = [[0, 0, 0, 0], [0, 0, 0, 0]] 									//사용
var goalin = [[false, false, false, false, 0], [false, false, false, false, 0]]	//사용
var together_link = [[-1, -1, -1, -1], [-1, -1, -1, -1]]						//사용

var moving = function (turn, piece, num){

	/*몇번움직였는지 체크하는 변수*/
	var moving_count = 0;

	for(var i = 0; i < num; i++){
		locat[turn][piece] = move_num[move_change[turn][piece]][locat[turn][piece]]; /*말을 다음 위치로 변경*/
		moving_count ++;
		
		/*말 이동 애니메이션*/
		$('#player'+turn+'_'+piece).animate({top : move_y[locat[turn][piece]], left : move_x[locat[turn][piece]]}, 400)

		/*말들의 이동도중 도착지점에 도착할시에 이벤트처리*/		
		if(locat[turn][piece] === 19){									

			/*도착지점에 도착하면 다음의 변수들을 초기화시켜준다*/
			move_change[turn][piece] = 0;		//교차로에서 이동방향을 정하는 배열
			playerPiece[turn][piece] = 0;		//플레이어의 말이 게임판에 나와잇는 여부를 판별하는 배열		
			goalin[turn][piece] = true;			//플레이어의 말 중 도착지점에 도착한 말들을 체크하는 배열
			goalin[turn][4]++;
			/*deleteQueue[turn][piece];*/
			break;								//더이상의 이동이 없도록 for문 종료
		}		
	}


	playerPiece[turn][piece] = locat[turn][piece];

	/*말들이 도착지점에 도착햇을때의 이벤트처리 - 이미지*/
	if(locat[turn][piece] === 19){	
		setTimeout(function(){
			console.log("도착");
			console.log(turn);
			console.log(piece);
			$('#player'+turn+'_'+piece).css({'background-image':'url("")'}); //게임말들의 이미지를 제거
			$('#goalinBox'+turn+'_'+piece).css({'background-image':'url("images/player'+ turn + '_'+piece+'.png")', 'background-size': '100%', 'background-repeat':'no-repeat'});
			log_output((turn+1)+"번 플레이어가 목적지에 도착했습니다.", (turn+1));
		}, 400 * moving_count);
	}	

	/*방향전환지점을 밟았을때의 이벤트처리*/
	switch(locat[turn][piece]){
		case 0: move_change[turn][piece] = 1; break;
		case 5: move_change[turn][piece] = 2; break;
		case 24: move_change[turn][piece] = 1; break;
	}
	
	/*업힌말이 잇을때의 이벤트처리*/
	for(var i = 0 ; i < 4 ; i++){ if(together_link[turn][i] == piece) moving(turn, i, num); }
			
}

var moving_event = function(turn, piece, num){

	if(goalin[turn][piece] === false){
	
		/*도착지점에 상대의 말이 있는지 체크 및 이벤트*/
		for(var i = 0; i < 4; i++){		
			if((move_y[locat[turn][piece]] === move_y[locat[(turn+1)%2][i]]) && (move_x[locat[turn][piece]] === move_x[locat[(turn+1)%2][i]])){			
				if(playerPiece[(turn+1)%2][i] != 0){
					locat[(turn+1)%2][i] = 19;
					
					log_output((turn+1)+"번 플레이어의 "+(piece+1) + "번 말이<br>" + ((turn+1)%2+1)+"번 플레이어의 " + i + "번 말을 잡았습니다.", 0) ;
					
					$('#player'+ (turn+1)%2 + '_'+i+'').animate({top : move_y[19], left : move_x[19]}, 1).css({'background-image':'url("")'});
					$('#goalinBox'+ (turn+1)%2 +'_'+ i).css({'background-image':'url("images/player off_'+i+'.png")', 'background-size': '100%', 'background-repeat':'no-repeat'});		
					
					together_link[(turn+1)%2][i] = -1;
					move_change[(turn+1)%2][i] = 0;
					playerPiece[(turn+1)%2][i] = 0;
					/*deleteQueue[(turn+1)%2][i];*/
					oneMoreTime = 1;
				}
			}		
		}

		/*도착지점에 아군의 말이 있는지 체크 및 이벤트*/
		for(var i = 0; i < 4; i++){
			if(piece !== i){
				if((move_y[locat[turn][piece]] === move_y[locat[turn][i]]) && (move_x[locat[turn][piece]] === move_x[locat[turn][i]])){									
					together_link[turn][i] = piece;
					log_output((turn+1)+"번 플레이어의 "+(piece+1) + "번 말이" + "아군의 " + (i+1) + "번말과 함께합니다." , (turn+1));
				}
			}
		}
	}
}

var moving_trigger = function(turn, piece, num){

	moving(turn, piece, num);

	setTimeout(function(){
		moving_event(turn, piece, num);
		popup_menu((turn+1-oneMoreTime)%2);
	}, 400 * num);
}
		
