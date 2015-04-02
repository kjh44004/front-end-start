var board = document.getElementById("board");

var swch = -1;

function Make_Board(){
  var tmp = 0;
  for(var i=0; i<4; i++){
    for(var j=0; j<4; j++){
      if     (swch === -1){ board.innerHTML += '<span id="board' + tmp +'" class="black"></span>'; }
      else if(swch === 1) { board.innerHTML += '<span id="board' + tmp +'" class="white"></span>'; }
      tmp++;
      swch = -swch;
    }
    board.innerHTML += "<br>";
    swch = -swch;
  }
}
var rem_id=null;
var rem_colar=null;

function Click_Board(event){
  if(rem_id !== null) { document.getElementById(rem_id).className = rem_colar; }
  rem_id = event.target.id;
  rem_colar = event.target.className;
  event.target.className = "red"
}

Make_Board();

board.addEventListener('click', Click_Board);