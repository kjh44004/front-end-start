

var cards = [1,2,3,4,5,1,2,3,4,5];

var $board = $('#gameBoard');

//섞기
cards = shuffle(cards);
console.log(cards)

//깔기
var doms = [];
for(var i=0; i < cards.length; i++){
	doms.push('<div class="card'+i+'">' + cards[i] + '</div>');
}
$board.css("text-indent","-9999px"); /*글자를 숨김*/
$board.html(doms.join(''));

//시간제한
var $countdown = $('#countdown');
var time = 15;
$countdown.html("TIME : " + time);

var timeattack = setInterval(function(){

	time--;

	$countdown.html("TIME : " + time);
	/*console.log("TIME : " + time);*/

	//타임오버
	if(time === 0){
		clearInterval(timeattack);
		opencount = 2; /*더이상 열리지 않도록 한다.*/
		alert("fail");
		$board.addClass("fail");
		$board.css("text-indent","0px"); /*숨겼던 글자를 보여줌 = 정답공개*/
	}
}, 1000);

//클릭 이벤트
var finish = 0;
var opencount = -1;
var remember = [];
var card_remember = [];

$board.on('click', 'div', function(event){

	opencount++; console.log(opencount);

	if(opencount < 2){ /*두개이상은 열리지 않도록 한다.*/

		var $card = $(event.currentTarget);

		remember[opencount] = $card; /*console.log(remember[opencount]);*/

		card_remember[opencount] = $card.html(); /*console.log(card_remember[opencount]);*/

		$card.addClass("open");

		
		finish++;

		if(opencount === 1){
			if(card_remember[0] === card_remember[1]){
				/*alert("success!");*/				
				remember[0].addClass('success');
				remember[1].addClass('success');
				opencount = -1;				
			}
			else{
				/*alert("fail!");*/
				setTimeout(function(){
					remember[0].removeClass('open');
					remember[1].removeClass('open');			
					finish = finish - 2;
					opencount = -1;
				}, 500);				
			}
			if(finish === cards.length){
				clearInterval(timeattack);
				alert("clear!");
			}
		}
	}
});
