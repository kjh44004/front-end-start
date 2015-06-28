var $stkboard = $('#stick_board');

for(var i = 0; i<4; i++) $stkboard.append('<div id="stick' + i + '">막대' + i + '</div>');

$stkboard.append('<button id="draw_btn">굴리기</button>');



$('#draw_btn').click(function(){

	var draw_num = 0;

	for(var i = 0; i < 4; i++){
		var tmp = random_make();

		if(tmp === 1) $('#stick'+i).css({'background-image':'url("images/그림2.png")'});
		else		  $('#stick'+i).css({'background-image':'url("images/그림1.png")'});	 		

		draw_num = draw_num + tmp;		
	}

	switch(draw_num){
		case 0: console.log("모"); draw_num = 5; break;
		case 1: console.log("도"); break;
		case 2: console.log("개"); break;
		case 3: console.log("걸"); break;
		case 4: console.log("윷"); break;
	}
	for(var i = 0; i < draw_num; i++){
		moving();	
		delay(1000);
	}
});
