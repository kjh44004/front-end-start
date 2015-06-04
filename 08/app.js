

var cards = [1,2,3,4,5,1,2,3,4,5];

var $board = $('#gameBoard');

//섞기
cards = shuffle(cards);
console.log(cards)

//깔기
var doms = [];
for(var i=0; i < cards.length; i++){

  doms.push('<div class="card'+i+'">' + cards[i]+ '</div>');
}

$board.html(doms.join(''));

var finish = 0;
var opencount = 0;
var remember = [];
var card_remember = [];

$board.on('click', 'div', function(event){

	var $card = $(event.currentTarget);

	remember[opencount] = $card; /*console.log(remember[opencount]);*/

	card_remember[opencount] = $card.html(); console.log(card_remember[opencount]);

	$card.addClass("open");

	opencount++;

	if(opencount === 2){
		if(card_remember[0] === card_remember[1]){
			alert("success!");			
		}
		else{
			alert("fail!");
			remember[0].removeClass('open');
			remember[1].removeClass('open');			
		}
		opencount = 0;

		if(finish === cards.length){
			alert("clear!");
		}
	}
});

