$(document).ready(function(){	
	var score = 0;
	$('#score_box').innerHTML = "점수 : " + score;
}



setInterval(moveBox, 1000);

$('div #field').addEventListener("click", Click);

function Click(event){
	if(event.target.id === "box"){
		score++;		
		moveBox();		
	}
	else { if(score > 0) score --; }	
	$('#score_box').innerHTML = "점수 : " + score;
}

function moveBox(){
	var width = $('#field').clientWidth;
	var height = $('#field').clientHeight;

	$('#box').style.left = (Math.random() * (width- $('box').css('width'))) + 'px';
	$('#box').style.top = (Math.random() * (height- $('box').css('height'))) + 'px';
}