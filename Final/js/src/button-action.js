(function(app){


  var BtnAction = {

    newNote: function(event){

      // console.log('newNote')
      var storage = app.util.storage;

      storage.save(event, "");
      var $contents = $('.note-editable');
      $contents[0].innerHTML="";

      $(app).trigger("newNote");

    },

    fullScreen: function(){
      var docElm = document.documentElement;

      if (docElm.requestFullscreen) {
       docElm.requestFullscreen();
     }
     else if (docElm.mozRequestFullScreen) {
       docElm.mozRequestFullScreen();
     }
     else if (docElm.webkitRequestFullScreen) {
       docElm.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
     }
   },

   FileSaver: function(){
    naming = false;
    while(!naming){
      var filename = window.prompt("저장할 파일명을 입력하세요", "");
      console.log(filename)
      if(filename !== "") naming = true;      
      else alert("파일명을 제대로 입력해주세요")
    }
    if(filename !== null){ 
      var $contents = $('.note-editable');
      var blob = new Blob([$contents[0].innerHTML], {type: "text/plain;charset=utf-8"});
      saveAs(blob, filename + ".txt");
    }
  },

about: function(){

  var $about = $('#about');

   $about.html("Note 웹어플리케이션 ver.1.0");
   $about.addClass("about");

   setTimeout(function(event){
    $about.html("");
    $about.removeClass("about");
   },1000*3);
  
}

};

app.ButtonAction = BtnAction;

})(NoteApp);
