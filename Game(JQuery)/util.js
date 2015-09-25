function delay(gap) { /* gap is in millisecs */
    var then,now;
    then = new Date().getTime();
    now = then;
    while((now - then) < gap) {
        now = new Date().getTime();
    }
}

var random_make = function(){
	var ran = Math.floor(Math.random() * 10) + 1;
	return ran%2;
}

var log_output = function(text, font_color){	
	switch(font_color){
		case 0: font_color = "black"; 	 break;	
		case 1: font_color = "red";	 break;
		case 2: font_color = "purple";  break;
	}

	$('#log_window').append('<font color = "'+font_color+'">'+text+ '</font><br><br>');
	$('#log_window').scrollTop($('#log_window')[0].scrollHeight);
}

var playerQueue = [[0, -1, -1, -1, -1, -1, -1, -1, -1, -1], [0, -1, -1, -1, -1, -1, -1, -1, -1, -1]];

var insertQueue = function(turn, piece){
	playerQueue[0][0]++;

	for(var i = playerQueue[0][0] ; i > 1; i--){
		playerQueue[0][i] = playerQueue[0][i-1];
		playerQueue[1][i] = playerQueue[1][i-1];
	}

	playerQueue[0][1] =  turn;
	playerQueue[1][1] = piece;
}

var deleteQueue = function(turn, piece){
	for(var i = 1; i < 9; i++){
		if(playerQueue[1][i] == piece && playerQueue[0][i] == turn){
			for(var j = i; j < 9; j++){
				playerQueue[0][j] = playerQueue[0][j+1];
				playerQueue[1][j] = playerQueue[1][j+1];			
			}
			break;
		}
	}		
}