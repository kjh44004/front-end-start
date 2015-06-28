(function($, app){


  var $memo = $('#memo');
  var $menu = $('.header .menu');
  var storage = app.util.storage;
  var $summernote = $('#summernote');

  var password = false;

  while(!password){
    var pass = window.prompt("비밀번호를 입력하세요", "");
    console.log(pass);
    if(pass === "1234") password = true;
    else if(pass === "null") return;
    else alert("비밀번호가 틀렸습니다.")
  }

  bindEvent();

  // app.htmlEditor.init();

  $summernote.summernote({
    height: 300,
    onInit: loadData,
    onKeyup: saveData
  });


  function saveData(event){

    var value = $summernote.code();
    // console.log(html);
    storage.save(event, value);
  }
  function bindEvent(){

    // $memo.on('keyup', function(event){
    //
    //   // console.log(event.keyCode)
    //   var value = $memo.val();
    //   // console.log(value)
    //   storage.save(event, value);
    //
    // });


$menu.on('click', 'a', function(event){

  var $btn = $(event.currentTarget);
  var action = $btn.data('action');

  app.ButtonAction[action]();

  return false;
});

$(app).on('newNote', function(){
  $memo.val('');
  
});

}


function loadData(){
  var html = storage.load();
  $summernote.code(html);
}


})(jQuery, NoteApp);
