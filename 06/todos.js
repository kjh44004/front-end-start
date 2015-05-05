//start...

//개발자도구에서 메세지확인
console.log('todos.js');

$(document).ready(function(){

	// id가 todoString 인 element 가져오기
	var $todoStringField = $('#todoString');
	var $todoTemplateHtml = $('#todoTemplate').html();
	var $listDom = $('#todoList');

	$todoStringField.on('keyup', addTodo);
	$listDom.on('click', checkDelete);
});



$listDom.html(loadData());


function addTodo(event) {
	if (event.keyCode === 13 && $todoStringField.val() !== "") {

		var newTodo = $todoStringField.val();
		$todoStringField.val("");  

		var tmp = $listDom.html();
		tmp += tmpl($todoTemplateHtml, {todo: newTodo});
		$listDom.html(tmp);

		saveData();
	}

}

function checkDelete(event) {
	if(event.target.className === 'delete') {
		event.target.parentElement.remove();  
		saveData();
	}
}

function loadData() {
	console.log('loadData()');
	return localStorage.getItem('todoHtml');
}

function saveData() {
	console.log('saveData()');
	localStorage.setItem('todoHtml', $listDom.html());
}