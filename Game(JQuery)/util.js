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