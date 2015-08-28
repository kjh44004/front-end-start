var move_num=[	[6, 0, 1, 2, 3, 4, 8, 5, 10, 7, 12, 9, 14, 11, 15, 16, 17, 18, 19, 13, 22, 23, 24, 24, 25, 27, 28, 14, 19],
				[20, 0, 1, 2, 3, 21, 8, 5, 10, 7, 12, 9, 14, 11, 15, 16, 17, 18, 19, 13, 22, 23, 24, 24, 26, 27, 28, 14, 19],
				[20, 0, 1, 2, 3, 21, 8, 5, 10, 7, 12, 9, 14, 11, 15, 16, 17, 18, 19, 13, 22, 23, 24, 24, 25, 27, 28, 14, 19]]

var move_x = [10, 110, 210, 310, 410, 510, 10, 510, 10, 510, 10, 510, 10, 510, 10, 110, 210, 310, 410, 510, 100, 420, 180, 340, 260, 180, 340, 100, 420]		  
var move_y = [10, 10, 10, 10, 10, 10, 110, 110, 210, 210, 310, 310, 410, 410, 510, 510, 510, 510, 510, 510, 100, 100, 180, 180, 260, 340, 340, 420, 420]

var locat = [[19, 19, 19, 19], [19, 19, 19, 19]]
var move_change = [[0, 0, 0, 0], [0, 0, 0, 0]]
var playerPiece = [[false, false, false, false], [false, false, false, false]]
var goalin = [[false, false, false, false], [false, false, false, false]]
var together_link = [[-1, -1, -1, -1], [-1, -1, -1, -1]]
var together = [[false, false, false, false], [false, false, false, false]]
var event_check = [[false, false, false, false], [false, false, false, false]]

var moving = function (turn, piece, num){

	var moving_count = 0;

	for(var i = 0; i < num; i++){
		locat[turn][piece] = move_num[move_change[turn][piece]][locat[turn][piece]]; /*말을 다음 위치로 변경*/
		console.log(locat[turn][piece]);
		$('#player'+turn+'_'+piece).animate({top : move_y[locat[turn][piece]], left : move_x[locat[turn][piece]]}, 400, function(){

			console.log(locat[turn][piece]);

			moving_count++;

			if(moving_count === num){ console.log("턴종료"); }

			if(event_check[turn][piece] !== false){
				$('#player'+ (turn+1)%2 + '_'+event_check[turn][piece]+'').css({'background-image':'url("")'});
				$('#player'+ (turn+1)%2 + '_'+event_check[turn][piece]+'').animate({top : move_y[19], left : move_x[19]}, 1);			
			}

			if(goalin[turn][piece] === true){ $('#player'+turn+'_'+piece).css({'background-image':'url("")'}); }

		}); /*말들의 이동 애니메이션*/		


		/*말들의 이동도중 출발지점에 도착할시에 이벤트처리*/		
		if(locat[turn][piece] === 19){ 
			move_change[turn][piece] = 0;							
			playerPiece[turn][piece] = false;
			goalin[turn][piece] = true;			
			console.log("도착");
		}		
	}

	/*방향전환지점을 밟았을때의 이벤트처리*/
	switch(locat[turn][piece]){
		case 0: move_change[turn][piece] = 1; break;
		case 5: move_change[turn][piece] = 2; break;
		case 24: move_change[turn][piece] = 1; break;
	}
	
	/*업힌말이 잇을때의 이벤트처리*/
	if(together_link[turn][piece] !== -1){
		moving(turn, together_link[turn][piece], num);
	}		
}

var moving_event = function(turn, piece, num){

	moving(turn, piece, num);

	if(goalin[turn][piece] === false){
	
		/*도착지점에 상대의 말이 있는지 체크 및 이벤트*/
		for(var i = 0; i < 4; i++){
		
			if((move_y[locat[turn][piece]] === move_y[locat[(turn+1)%2][i]]) && (move_x[locat[turn][piece]] === move_x[locat[(turn+1)%2][i]])){			
				if(playerPiece[(turn+1)%2][i] == true){
					locat[(turn+1)%2][i] = 19;

					/*$('#player'+ (turn+1)%2 + '_'+i+'').css({'background-image':'url("")'});*/				

					together[(turn+1)%2][i] = false;
					together_link[(turn+1)%2][i] = -1;
					move_change[(turn+1)%2][i] = 0;
					playerPiece[(turn+1)%2][i] = false;

					event_check[turn][piece] = i;

					if(oneMoreTime !== 1) oneMoreTime = 1;
				}
			}
		
		}

		for(var i = 0; i < 4; i++){
			if(piece !== i){
				if((move_y[locat[turn][piece]] === move_y[locat[turn][i]]) && (move_x[locat[turn][piece]] === move_x[locat[turn][i]])){				
					together[turn][i] = true;
					together_link[turn][piece] = i;									
				}
			}
		}
	}
		
}