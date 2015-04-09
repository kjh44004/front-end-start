var Btn_Search = document.getElementById('Btn_Search');
var Btn_More = document.getElementById('Btn_More');
var wrap = document.getElementById('wrap');
var text = document.getElementById('text');
var listTemplate = document.getElementById('listTemplate')
var pageno = 1;

Btn_Search.addEventListener('click', Search);
Btn_More.addEventListener('click',addPage);

function addPage(event){
  pageno++;
  Search(event);
  };

function Search(event){
  var searchword = text.value;
  var list = listTemplate.innerHTML;
  var address = "https://apis.daum.net/search/web?apikey=d89846fc3b0a4b338321610e85737eb5&q=" + searchword + "&output=json&pageno=" + pageno;

  getJSON(address , function(data){ wrap.innerHTML += tmpl(list, {list: data.channel.item}); });
};