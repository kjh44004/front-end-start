var score_box = document.getElementById('score_box');
var field = document.getElementById('field');
var box = document.getElementById('box');

var score = 0;

score_box.innerHTML = "점수 : " + score;

setInterval(moveBox, 1000);

field.addEventListener("click", Click);

function Click(event){
	if(event.target.id === "box"){
		score++;		
		moveBox();		
	}
	else { if(score > 0) score --; }	
	score_box.innerHTML = "점수 : " + score;
}

function moveBox(){
	var width = field.clientWidth;
	var height = field.clientHeight;

	box.style.left = (Math.random() * (width-30)) + 'px';
	box.style.top = (Math.random() * (height-30)) + 'px';
}